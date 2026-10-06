from __future__ import annotations

import argparse
from concurrent.futures import ProcessPoolExecutor, as_completed
import hashlib
import importlib.metadata
import json
import os
from pathlib import Path
import re
import subprocess
import sys
import unicodedata
from urllib.parse import urlsplit
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
CONFIG_PATH = ROOT / "scripts/article-audio.json"
MANIFEST_PATH = ROOT / "assets/audio/index.json"
CACHE = ROOT / "outputs/audio-cache"
BLOCK_TAGS = {"p", "h2", "h3", "h4", "li", "pre", "table", "figcaption", "blockquote"}
EXCLUDE = "script, style, button, svg, .article-heading-permalink, .code-copy-button, [aria-hidden='true']"


def compact(value):
    return json.dumps(value, ensure_ascii=False, separators=(",", ":"))


def digest(value):
    data = value if isinstance(value, bytes) else value.encode("utf-8")
    return hashlib.sha256(data).hexdigest()


def clean(text):
    return re.sub(r"\s+", " ", unicodedata.normalize("NFC", text)).strip()


def extract_article(path):
    from bs4 import BeautifulSoup

    soup = BeautifulSoup(path.read_text(encoding="utf-8"), "html.parser")
    prose = soup.select_one(".article-layout .prose")
    title = soup.select_one(".article-title h1")
    canonical = soup.select_one('link[rel="canonical"]')
    if not prose or not title or not canonical:
        return None
    for item in soup.select(EXCLUDE):
        item.decompose()
    intro = soup.select_one(".article-title > p")
    blocks = [{"tag": "h1", "text": clean(title.get_text())}]
    if intro:
        blocks.append({"tag": "p", "text": clean(intro.get_text())})
    spoken = [dict(block) for block in blocks]
    for node in prose.find_all(BLOCK_TAGS):
        if any(parent.name in BLOCK_TAGS for parent in node.parents if parent is not prose):
            continue
        text = clean(node.get_text())
        if not text:
            continue
        blocks.append({"tag": node.name, "text": text})
        if node.name == "pre":
            text = "Đoạn mã minh họa nằm trong bài viết." if soup.html.get("lang") == "vi" else "The code example is available in the article."
        elif node.name == "table":
            text = "\n".join(". ".join(clean(cell.get_text()) for cell in row.find_all(["th", "td"])) + "." for row in node.find_all("tr"))
        spoken.append({"tag": node.name, "text": text})
    parsed = urlsplit(canonical["href"])
    if parsed.scheme != "https" or parsed.netloc != "nhanaz.io.vn" or parsed.query or parsed.fragment or not re.fullmatch(r"/(?:en/)?posts/[a-z0-9-]+/", parsed.path):
        raise RuntimeError(f"Canonical bài viết không hợp lệ · {path.relative_to(ROOT) if path.is_relative_to(ROOT) else path.name}")
    url = parsed.path
    return {"path": path, "url": url, "language": soup.html.get("lang", "vi"),
            "title": blocks[0]["text"], "sourceHash": digest(compact(blocks)), "blocks": spoken}


def articles(config):
    found = []
    for folder in (ROOT / "en/posts", ROOT / "posts"):
        for path in sorted(folder.glob("*/index.html")):
            article = extract_article(path)
            if article and article["language"] in config["languages"]:
                found.append(article)
    return sorted(found, key=lambda article: (config["languages"].index(article["language"]), sum(len(block["text"]) for block in article["blocks"])))


def load_manifest():
    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8")) if MANIFEST_PATH.exists() else {"schemaVersion": 1, "articles": {}}
    if manifest.get("schemaVersion") != 1 or not isinstance(manifest.get("articles"), dict):
        raise RuntimeError("Manifest audio không đúng cấu trúc.")
    return manifest


def file_valid(segment):
    url = segment.get("src", "")
    if not re.fullmatch(r"/assets/audio/[a-z0-9-]+/[a-z0-9-]+\.mp3", url):
        return False
    checksum = segment.get("sha256", "")
    if not isinstance(checksum, str) or not re.fullmatch(r"[a-f0-9]{64}", checksum) or not Path(url).name.startswith(checksum[:16] + "-"):
        return False
    path = ROOT / url.lstrip("/")
    return path.is_file() and path.stat().st_size == segment.get("bytes") and digest(path.read_bytes()) == checksum and segment.get("duration", 0) > 0


def current(article, entry, config_hash):
    if not entry or entry.get("sourceHash") != article["sourceHash"] or entry.get("configHash") != config_hash or not entry.get("segments"):
        return False
    total = sum(segment.get("duration", 0) for segment in entry["segments"])
    chapters = entry.get("chapters", [])
    return bool(abs(total - entry.get("duration", -1)) <= 0.005 and chapters and all(isinstance(chapter.get("title"), str) and 0 <= chapter.get("start", -1) < total for chapter in chapters) and all(a["start"] <= b["start"] for a, b in zip(chapters, chapters[1:])) and all(file_valid(segment) for segment in entry["segments"]))


def split_text(text, limit):
    sentences = re.split(r"(?<=[.!?…])\s+|\n+", text)
    chunks, pending = [], ""
    for sentence in sentences:
        words = sentence.split()
        for word in words:
            candidate = f"{pending} {word}".strip()
            if pending and len(candidate) > limit:
                chunks.append(pending)
                pending = word
            else:
                pending = candidate
        if len(pending) >= limit * 0.6:
            chunks.append(pending)
            pending = ""
    if pending:
        chunks.append(pending)
    return chunks


def pronunciation(text, language, config):
    for written, spoken in config.get("pronunciation", {}).get(language, {}).items():
        text = re.sub(r"(?<!\w)" + re.escape(written) + r"(?!\w)", lambda _: spoken, text)
    return text


def save_json(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    temp = path.with_suffix(".tmp")
    temp.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8", newline="\n")
    temp.replace(path)


def language_config(config, language):
    settings = {key: value for key, value in config.items() if key not in {"languages", "english"}}
    settings["pronunciation"] = {language: config.get("pronunciation", {}).get(language, {})}
    if language == "en":
        for key in ("modelRepo", "modelRevision", "codecRepo", "codecRevision", "precision"):
            settings.pop(key, None)
        settings.update(config["english"])
    return settings


def download_checked(url, path, expected_hash):
    path.parent.mkdir(parents=True, exist_ok=True)
    if not path.exists() or digest(path.read_bytes()) != expected_hash:
        temp = path.with_suffix(".download")
        urllib.request.urlretrieve(url, temp)
        if digest(temp.read_bytes()) != expected_hash:
            temp.unlink()
            raise RuntimeError("Checksum mô hình không khớp. Không dùng file vừa tải.")
        temp.replace(path)
    return str(path)


class EnglishEngine:
    sample_rate = 24000

    def __init__(self, config, threads):
        import onnxruntime as ort
        from kokoro_onnx import Kokoro

        if importlib.metadata.version("kokoro-onnx") != config["sdkVersion"]:
            raise RuntimeError("Cài đúng kokoro-onnx trong scripts/audio-requirements.txt.")
        model = download_checked(config["modelUrl"], CACHE / "kokoro/kokoro-v1.0.onnx", config["modelSha256"])
        voices = download_checked(config["voicesUrl"], CACHE / "kokoro/voices-v1.0.bin", config["voicesSha256"])
        options = ort.SessionOptions()
        options.intra_op_num_threads = threads or min(os.cpu_count() or 2, 4)
        options.inter_op_num_threads = 1
        options.add_session_config_entry("session.intra_op.allow_spinning", "0")
        session = ort.InferenceSession(model, sess_options=options, providers=["CPUExecutionProvider"])
        self.model = Kokoro.from_session(session, voices)
        self.config = config

    def infer(self, text, **kwargs):
        audio, rate = self.model.create(text, voice=self.config["voiceId"], speed=self.config["speed"], lang="en-us")
        if rate != self.sample_rate:
            raise RuntimeError("Sample rate của Kokoro không khớp.")
        return audio


def create_engine(config, threads):
    if config["engine"].startswith("Kokoro"):
        return EnglishEngine(config, threads)
    os.environ["HF_HOME"] = str(CACHE / "models")
    os.environ["HF_HUB_DISABLE_TELEMETRY"] = "1"
    os.environ["HF_HUB_DISABLE_PROGRESS_BARS"] = "1"
    os.environ["HF_HUB_DISABLE_SYMLINKS_WARNING"] = "1"
    os.environ["GRADIO_ANALYTICS_ENABLED"] = "False"
    from huggingface_hub import constants, snapshot_download
    from vieneu import Vieneu

    if importlib.metadata.version("vieneu") != config["sdkVersion"]:
        raise RuntimeError("Cài đúng phiên bản trong scripts/audio-requirements.txt trước khi tạo audio.")
    def snapshot(repo, revision, patterns, required):
        try:
            path = snapshot_download(repo, revision=revision, allow_patterns=patterns, local_files_only=True)
            if all((Path(path) / name).is_file() for name in required):
                return path
        except Exception:
            pass
        return snapshot_download(repo, revision=revision, allow_patterns=patterns)

    model_files = ["onnx_update/" + name for name in ["vieneu_prefill.onnx", "vieneu_decode_step.onnx", "vieneu_acoustic_cached.onnx", "vieneu_backbone_shared.data", "vieneu_v3_heads.npz", "config.json", "tokenizer.json"]]
    model = snapshot(config["modelRepo"], config["modelRevision"], model_files + ["voices_v3_turbo.json", "LICENSE", "README.md"], model_files)
    codec_files = ["moss_audio_tokenizer_decode_full.onnx", "moss_audio_tokenizer_decode_shared.data", "moss_audio_tokenizer_decode_step.onnx", "codec_browser_onnx_meta.json", "moss_audio_tokenizer_encode.onnx", "moss_audio_tokenizer_encode.data"]
    codec = snapshot(config["codecRepo"], config["codecRevision"], codec_files, codec_files)
    # The SDK only exposes main for its codec. Pin that alias in this project's
    # private cache, then load from cache without allowing a network refresh.
    ref = Path(codec).parents[1] / "refs/main"
    ref.parent.mkdir(parents=True, exist_ok=True)
    if not ref.exists() or ref.read_text(encoding="utf-8") != config["codecRevision"]:
        temp_ref = ref.with_name(f"main.{os.getpid()}.tmp")
        temp_ref.write_text(config["codecRevision"], encoding="utf-8")
        temp_ref.replace(ref)
    previous_offline = constants.HF_HUB_OFFLINE
    constants.HF_HUB_OFFLINE = True
    try:
        engine = Vieneu(backbone_repo=model, onnx_dir=str(Path(model) / "onnx_update"), backend="onnx", device="cpu", precision=config["precision"], threads=threads)
    finally:
        constants.HF_HUB_OFFLINE = previous_offline
    engine.get_preset_voice(config["voice"])
    return engine


def cached_duration(path, sample_rate):
    import numpy as np
    import soundfile as sf

    if path.exists():
        try:
            data, rate = sf.read(path, dtype="float32")
            if rate == sample_rate and data.ndim == 1 and len(data) / rate >= 0.2 and np.isfinite(data).all() and float(np.sqrt(np.mean(data**2))) >= 0.0001:
                return len(data) / rate
        except (OSError, RuntimeError, ValueError):
            pass
    return None


def chunk_path(text, config_hash):
    return CACHE / "chunks" / f"{digest(config_hash + '\n' + text)}.wav"


def make_chunk(engine, text, config, config_hash):
    import numpy as np
    import soundfile as sf

    path = chunk_path(text, config_hash)
    key = path.stem
    path.parent.mkdir(parents=True, exist_ok=True)
    seconds = cached_duration(path, engine.sample_rate)
    if seconds is not None:
        return path, seconds
    path.unlink(missing_ok=True)
    np.random.seed((config["seed"] + int(key[:8], 16)) % (2**32))
    data = engine.infer(text, voice=config["voice"], max_chars=256, max_new_frames=1000)
    seconds = len(data) / engine.sample_rate
    if data.ndim != 1 or not np.isfinite(data).all() or seconds < 0.2 or float(np.sqrt(np.mean(data**2))) < 0.0001:
        raise RuntimeError(f"Audio rỗng hoặc hỏng cho đoạn {key[:12]}.")
    temp = path.with_suffix(".tmp.wav")
    sf.write(temp, data, engine.sample_rate, subtype="PCM_16")
    temp.replace(path)
    return path, seconds


def chunk_texts(article, config):
    return list(dict.fromkeys(text for block in article["blocks"] for text in split_text(pronunciation(block["text"], article["language"], config), config["chunkCharacters"])))


def init_worker(config, config_hash, threads):
    global worker_engine, worker_config, worker_config_hash
    worker_engine = create_engine(config, threads)
    worker_config, worker_config_hash = config, config_hash


def generate_cached_chunk(text):
    return make_chunk(worker_engine, text, worker_config, worker_config_hash)[1]


def precache_article(article, engine, config, config_hash, workers, threads):
    if workers <= 1:
        return
    texts = [text for text in chunk_texts(article, config) if cached_duration(chunk_path(text, config_hash), engine.sample_rate) is None]
    if len(texts) < 2:
        return
    print(f"Tạo song song · {len(texts)} đoạn · {min(workers, len(texts))} worker · {article['url']}", flush=True)
    with ProcessPoolExecutor(max_workers=min(workers, len(texts)), initializer=init_worker, initargs=(config, config_hash, threads)) as pool:
        futures = [pool.submit(generate_cached_chunk, text) for text in texts]
        try:
            for count, future in enumerate(as_completed(futures), 1):
                future.result()
                print(f"  Cache {count}/{len(texts)} · {article['url']}", flush=True)
        except BaseException:
            for future in futures:
                future.cancel()
            raise


def generate_article(article, engine, config, config_hash):
    import imageio_ffmpeg
    import numpy as np
    import soundfile as sf

    slug = article["url"].strip("/").replace("/", "-")
    target = ROOT / "assets/audio" / slug
    target.mkdir(parents=True, exist_ok=True)
    work = CACHE / "assembly" / slug
    work.mkdir(parents=True, exist_ok=True)
    parts, chapters = [], []
    elapsed, part_duration, writer = 0.0, 0.0, None
    wav_path = work / "part.wav"

    def finish_part():
        nonlocal writer, part_duration
        if writer is None:
            return
        writer.close()
        writer = None
        number = len(parts) + 1
        temp = work / "encode.mp3"
        subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(), "-hide_banner", "-loglevel", "error", "-y", "-i", str(wav_path), "-codec:a", "libmp3lame", "-b:a", config["bitrate"], "-ar", "48000", "-ac", "1", str(temp)], check=True)
        data = temp.read_bytes()
        if not data or len(data) >= 95_000_000:
            raise RuntimeError("Phần audio hỏng hoặc vượt kích thước cho phép. Giảm partSeconds.")
        content_hash = digest(data)
        final = target / f"{content_hash[:16]}-{number:03}.mp3"
        temp.replace(final)
        parts.append({"src": "/" + final.relative_to(ROOT).as_posix(), "duration": round(part_duration, 3), "bytes": len(data), "sha256": content_hash})
        part_duration = 0.0

    try:
        count = len(article["blocks"])
        for index, block in enumerate(article["blocks"]):
            heading = block["tag"] in {"h1", "h2", "h3", "h4"}
            if heading:
                chapters.append({"title": block["text"], "start": round(elapsed, 3)})
            texts = split_text(pronunciation(block["text"], article["language"], config), config["chunkCharacters"])
            for text in texts:
                path, seconds = make_chunk(engine, text, config, config_hash)
                if writer and part_duration + seconds > config["partSeconds"]:
                    finish_part()
                if writer is None:
                    writer = sf.SoundFile(wav_path, mode="w", samplerate=engine.sample_rate, channels=1, subtype="PCM_16")
                with sf.SoundFile(path) as chunk:
                    for samples in chunk.blocks(blocksize=65536, dtype="float32"):
                        writer.write(samples)
                pause = config["headingPause"] if heading else config["paragraphPause"]
                writer.write(np.zeros(round(pause * engine.sample_rate), dtype="float32"))
                elapsed += seconds + pause
                part_duration += seconds + pause
            print(f"  {index + 1}/{count} · {round(elapsed)}s · {article['url']}", flush=True)
        finish_part()
    finally:
        if writer is not None:
            writer.close()
    provenance = {key: config[key] for key in ("modelRevision", "codecRevision", "modelSha256", "voicesSha256") if key in config}
    return {"title": article["title"], "language": article["language"], "sourceHash": article["sourceHash"], "configHash": config_hash, "voice": config["voice"], "engine": config["engine"], **provenance, "duration": round(sum(part["duration"] for part in parts), 3), "segments": parts, "chapters": chapters}


def main():
    parser = argparse.ArgumentParser(description="Tạo audio bài Việt và Anh bằng mô hình chạy local, chỉ dựng lại nội dung đã đổi.")
    parser.add_argument("--check", action="store_true")
    parser.add_argument("--article", help="Slug hoặc đường dẫn canonical của một bài")
    parser.add_argument("--threads", type=int, default=0)
    parser.add_argument("--workers", type=int, default=2, help="Số worker tạo các đoạn độc lập. Dùng 1 nếu máy ít RAM.")
    parser.add_argument("--language", choices=["vi", "en"])
    args = parser.parse_args()
    if args.workers < 1 or args.threads < 0:
        parser.error("workers phải lớn hơn 0 và threads không được âm")
    threads = args.threads or (max(1, min(2, (os.cpu_count() or 2) // args.workers)) if args.workers > 1 else 0)
    config = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    manifest = load_manifest()
    all_articles = articles(config)
    selected = [article for article in all_articles if (not args.article or args.article == article["url"] or args.article == article["path"].parent.name) and (not args.language or args.language == article["language"])]
    if not selected:
        raise RuntimeError("Không tìm thấy bài viết tương ứng.")
    pending = [article for article in selected if not current(article, manifest["articles"].get(article["url"]), digest(compact(language_config(config, article["language"]))))]
    orphaned = set(manifest["articles"]) - {article["url"] for article in all_articles} if not args.article and not args.language else set()
    if args.check:
        for article in pending:
            print(f"Thiếu hoặc cũ · {article['url']}")
        for url in sorted(orphaned):
            print(f"Bản ghi không còn bài tương ứng · {url}")
        if pending or orphaned:
            return 1
        print(f"Audio khớp nội dung và checksum · {len(selected)} bài")
        return 0
    for url in sorted(orphaned):
        entry = manifest["articles"].pop(url)
        for segment in entry.get("segments", []):
            if re.fullmatch(r"/assets/audio/[a-z0-9-]+/[a-z0-9-]+\.mp3", segment.get("src", "")):
                (ROOT / segment["src"].lstrip("/")).unlink(missing_ok=True)
        save_json(MANIFEST_PATH, manifest)
    if not pending:
        print("Audio đã khớp nội dung, không cần tạo lại.")
        return 0
    engine, active_language = None, None
    for article in pending:
        settings = language_config(config, article["language"])
        config_hash = digest(compact(settings))
        if active_language != article["language"]:
            engine = None
            import gc
            gc.collect()
            engine = create_engine(settings, threads)
            active_language = article["language"]
        print(f"Tạo audio · {article['url']}", flush=True)
        precache_article(article, engine, settings, config_hash, args.workers, threads)
        entry = generate_article(article, engine, settings, config_hash)
        manifest = load_manifest()
        manifest["articles"][article["url"]] = entry
        manifest["articles"] = dict(sorted(manifest["articles"].items()))
        save_json(MANIFEST_PATH, manifest)
        keep = {Path(segment["src"]).name for segment in entry["segments"]}
        folder = ROOT / entry["segments"][0]["src"].lstrip("/")
        for old in folder.parent.glob("*.mp3"):
            if old.name not in keep:
                old.unlink()
        print(f"Xong · {round(entry['duration'] / 60, 1)} phút · {article['url']}", flush=True)
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as error:
        print(f"Không tạo được audio · {error}", file=sys.stderr)
        sys.exit(1)
