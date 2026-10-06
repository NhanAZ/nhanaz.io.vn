import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location("article_audio", Path(__file__).with_name("build-article-audio.py"))
audio = importlib.util.module_from_spec(spec)
spec.loader.exec_module(audio)


class ArticleAudioTests(unittest.TestCase):
    def test_extraction_ignores_enhancers_and_does_not_duplicate_nested_text(self):
        document = '<html lang="vi"><link rel="canonical" href="https://nhanaz.io.vn/posts/test/"><div class="article-title"><h1>Đọc chậm</h1><p>Một chút.</p></div><div class="article-layout"><div class="prose"><h2>Ý đầu<a class="article-heading-permalink">#</a></h2><blockquote><p>Câu được trích.</p></blockquote><ul><li>Ý một</li><li>Ý hai</li></ul><pre><code>x = 1</code><button>Sao chép</button></pre><p>Câu cuối.</p></div></div></html>'
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "index.html"
            path.write_text(document, encoding="utf-8")
            article = audio.extract_article(path)
            texts = [block["text"] for block in article["blocks"]]
            self.assertEqual(texts.count("Câu được trích."), 1)
            self.assertIn("Ý đầu", texts)
            self.assertEqual(texts[-1], "Câu cuối.")
            self.assertIn("Đoạn mã minh họa nằm trong bài viết.", texts)
            first_hash = article["sourceHash"]
            path.write_text(document.replace('<a class="article-heading-permalink">#</a>', '').replace('<button>Sao chép</button>', ''), encoding="utf-8")
            self.assertEqual(audio.extract_article(path)["sourceHash"], first_hash)

    def test_long_article_preserves_every_word_including_the_end(self):
        text = " ".join(f"từ{number}" for number in range(10000)) + " Kết thúc."
        chunks = audio.split_text(text, 500)
        self.assertGreater(len(chunks), 100)
        self.assertEqual(" ".join(chunks), text)
        self.assertTrue(chunks[-1].endswith("Kết thúc."))

    def test_an_invalid_canonical_cannot_create_audio_outside_the_article_folder(self):
        document = '<html lang="vi"><link rel="canonical" href="https://nhanaz.io.vn/posts/../outside/"><div class="article-title"><h1>Bài viết</h1></div><div class="article-layout"><div class="prose"><p>Nội dung.</p></div></div></html>'
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "index.html"
            path.write_text(document, encoding="utf-8")
            with self.assertRaises(RuntimeError):
                audio.extract_article(path)

    def test_name_pronunciation_does_not_replace_substrings_in_other_words(self):
        config = {"pronunciation": {"vi": {"API": "ây pi ai"}}}
        self.assertEqual(audio.pronunciation("API, APIs và CAPITAL", "vi", config), "ây pi ai, APIs và CAPITAL")

    def test_parallel_jobs_deduplicate_cache_paths_without_removing_article_blocks(self):
        article = {"language": "vi", "blocks": [{"tag": "p", "text": text} for text in ["API hoạt động.", "Câu cuối.", "API hoạt động."]]}
        config = {"chunkCharacters": 500, "pronunciation": {"vi": {"API": "ây pi ai"}}}
        self.assertEqual(audio.chunk_texts(article, config), ["ây pi ai hoạt động.", "Câu cuối."])
        self.assertEqual(len(article["blocks"]), 3)

    def test_changing_english_voice_does_not_invalidate_vietnamese_recordings(self):
        config = json.loads(audio.CONFIG_PATH.read_text(encoding="utf-8"))
        before = audio.digest(audio.compact(audio.language_config(config, "vi")))
        config["english"]["voice"] = "Another voice"
        after = audio.digest(audio.compact(audio.language_config(config, "vi")))
        self.assertEqual(before, after)
        self.assertNotEqual(audio.language_config(config, "en")["voice"], audio.language_config(config, "vi")["voice"])

    def test_a_changed_article_or_corrupt_file_is_not_current(self):
        with tempfile.TemporaryDirectory() as directory, patch.object(audio, "ROOT", Path(directory)):
            fixture = b"valid fixture"
            path = Path(directory) / f"assets/audio/test/{audio.digest(fixture)[:16]}-001.mp3"
            path.parent.mkdir(parents=True)
            path.write_bytes(fixture)
            part = {"src": "/" + path.relative_to(audio.ROOT).as_posix(), "bytes": path.stat().st_size, "sha256": audio.digest(path.read_bytes()), "duration": 2}
            article = {"sourceHash": "current"}
            entry = {"sourceHash": "current", "configHash": "voice", "duration": 2, "chapters": [{"title": "Start", "start": 0}], "segments": [part]}
            self.assertTrue(audio.current(article, entry, "voice"))
            self.assertFalse(audio.current({"sourceHash": "edited"}, entry, "voice"))
            self.assertFalse(audio.current(article, entry, "new voice"))
            wrong_name = path.with_name("0000000000000000-001.mp3")
            wrong_name.write_bytes(fixture)
            self.assertFalse(audio.file_valid({**part, "src": "/" + wrong_name.relative_to(audio.ROOT).as_posix()}))
            path.write_bytes(b"broken audio!!")
            self.assertFalse(audio.current(article, entry, "voice"))
            self.assertFalse(audio.file_valid({**part, "src": "/assets/audio/../outside.mp3"}))


if __name__ == "__main__":
    unittest.main()
