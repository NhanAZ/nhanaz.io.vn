const BLOCK_TAGS = new Set(["p", "h2", "h3", "h4", "li", "pre", "table", "figcaption", "blockquote"]);
const EXCLUDE = "script, style, button, svg, .article-heading-permalink, .code-copy-button, [aria-hidden='true']";
const clean = (text) => text.normalize("NFC").replace(/\s+/gu, " ").trim();

export function locateSegment(segments, time) {
  let offset = 0;
  for (let index = 0; index < segments.length; index += 1) {
    const duration = segments[index].duration;
    if (time < offset + duration || index === segments.length - 1) {
      return { index, offset, time: Math.max(0, Math.min(duration, time - offset)) };
    }
    offset += duration;
  }
  return { index: 0, offset: 0, time: 0 };
}

export function formatTime(seconds) {
  const whole = Math.max(0, Math.floor(seconds || 0));
  const hours = Math.floor(whole / 3600);
  const minutes = Math.floor(whole / 60) % 60;
  const rest = String(whole % 60).padStart(2, "0");
  return hours ? `${hours}:${String(minutes).padStart(2, "0")}:${rest}` : `${minutes}:${rest}`;
}

async function sourceHash() {
  const prose = document.querySelector(".article-layout .prose").cloneNode(true);
  const title = document.querySelector(".article-title h1");
  const intro = document.querySelector(".article-title > p");
  prose.querySelectorAll(EXCLUDE).forEach((node) => node.remove());
  const blocks = [{ tag: "h1", text: clean(title.textContent) }];
  if (intro) blocks.push({ tag: "p", text: clean(intro.textContent) });
  prose.querySelectorAll([...BLOCK_TAGS].join(",")).forEach((node) => {
    for (let parent = node.parentElement; parent && parent !== prose; parent = parent.parentElement) {
      if (BLOCK_TAGS.has(parent.localName)) return;
    }
    const text = clean(node.textContent);
    if (text) blocks.push({ tag: node.localName, text });
  });
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(JSON.stringify(blocks)));
  return [...new Uint8Array(hash)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function initArticleAudio() {
  const header = document.querySelector("main > article > .article-header");
  if (!header || !document.querySelector(".article-layout .prose")) return;
  const english = document.documentElement.lang === "en";
  const words = english ? {
    title: "Listen to this article", play: "Listen", pause: "Pause", resume: "Continue listening",
    back: "Back 15 seconds", forward: "Forward 15 seconds", speed: "Playback speed", seek: "Listening position",
    chapter: "Jump to a section", loading: "Getting the recording…", updating: "The recording is being updated. Please come back in a little while.",
    error: "The recording could not be loaded. Please try again.", retry: "Try again", voice: "Synthetic voice", minute: "min of listening"
  } : {
    title: "Nghe bài viết", play: "Nghe bài viết", pause: "Tạm dừng", resume: "Tiếp tục nghe",
    back: "Lùi 15 giây", forward: "Tới 15 giây", speed: "Tốc độ đọc", seek: "Vị trí nghe",
    chapter: "Nghe từ đề mục", loading: "Đang lấy bản nghe…", updating: "Bản nghe đang được cập nhật. Bạn quay lại sau một chút nha.",
    error: "Chưa tải được bản nghe. Bạn thử lại nha.", retry: "Thử lại", voice: "Giọng tổng hợp", minute: "phút nghe"
  };
  const panel = document.createElement("section");
  panel.className = "article-audio";
  panel.setAttribute("aria-label", words.title);
  panel.innerHTML = `<div class="article-audio-heading"><h2></h2><p class="article-audio-description" role="status"></p></div><div class="article-audio-controls" hidden></div>`;
  panel.querySelector("h2").textContent = words.title;
  header.after(panel);
  const description = panel.querySelector(".article-audio-description");
  const controls = panel.querySelector(".article-audio-controls");
  description.textContent = words.loading;
  let entry;
  try {
    const [response, hash] = await Promise.all([fetch("/assets/audio/index.json", { cache: "no-cache" }), sourceHash()]);
    if (!response.ok) throw new Error("Audio manifest unavailable");
    const manifest = await response.json();
    const path = new URL(document.querySelector('link[rel="canonical"]').href).pathname;
    entry = manifest.articles?.[path];
    if (!entry || entry.sourceHash !== hash || !entry.segments?.length) {
      description.textContent = words.updating;
      return;
    }
    if (!entry.segments.every((part) => /^\/assets\/audio\/[a-z0-9-]+\/[a-z0-9-]+\.mp3$/u.test(part.src) && Number.isFinite(part.duration) && part.duration > 0)) throw new Error("Invalid audio segments");
  } catch {
    description.textContent = words.error;
    const retry = document.createElement("button");
    retry.type = "button";
    retry.className = "article-audio-retry";
    retry.textContent = words.retry;
    retry.addEventListener("click", () => { panel.remove(); initArticleAudio(); });
    panel.append(retry);
    return;
  }
  const duration = entry.segments.reduce((sum, part) => sum + part.duration, 0);
  description.textContent = `${words.voice} · ${entry.voice} · ${Math.ceil(duration / 60)} ${words.minute}`;
  controls.innerHTML = `<div class="article-audio-buttons"><button class="article-audio-play" type="button"></button><button class="article-audio-back" type="button">−15</button><button class="article-audio-forward" type="button">+15</button><label class="article-audio-speed"><span></span><select><button type="button"><selectedcontent></selectedcontent></button><option value="0.8">0.8×</option><option value="1" selected>1×</option><option value="1.15">1.15×</option><option value="1.25">1.25×</option><option value="1.5">1.5×</option><option value="2">2×</option></select></label></div><div class="article-audio-timeline"><input type="range" min="0" step="0.1" value="0"><span class="article-audio-time"></span></div><label class="article-audio-chapter"><span></span><select><button type="button"><selectedcontent></selectedcontent></button></select></label><p class="article-audio-error" role="status" hidden></p>`;
  const audio = document.createElement("audio");
  audio.preload = "none";
  audio.setAttribute("aria-hidden", "true");
  panel.append(audio);
  const play = controls.querySelector(".article-audio-play");
  const back = controls.querySelector(".article-audio-back");
  const forward = controls.querySelector(".article-audio-forward");
  const speed = controls.querySelector(".article-audio-speed select");
  const seek = controls.querySelector('input[type="range"]');
  const clock = controls.querySelector(".article-audio-time");
  const chapters = controls.querySelector(".article-audio-chapter select");
  const error = controls.querySelector(".article-audio-error");
  controls.querySelector(".article-audio-speed span").textContent = words.speed;
  controls.querySelector(".article-audio-chapter span").textContent = words.chapter;
  play.textContent = words.play;
  play.setAttribute("aria-pressed", "false");
  back.setAttribute("aria-label", words.back);
  forward.setAttribute("aria-label", words.forward);
  seek.setAttribute("aria-label", words.seek);
  seek.max = String(duration);
  (entry.chapters || []).forEach((chapter) => {
    const option = document.createElement("option");
    option.value = String(chapter.start);
    option.textContent = chapter.title;
    chapters.append(option);
  });
  if (!chapters.options.length) controls.querySelector(".article-audio-chapter").hidden = true;
  let partIndex = 0;
  let offset = 0;
  let pendingTime = null;
  let started = false;
  let intentToPlay = false;
  let changingPart = false;
  let dragging = false;
  let position = 0;
  let playRequest = 0;

  function updateMedia() {
    if (!("mediaSession" in navigator)) return;
    navigator.mediaSession.playbackState = intentToPlay ? "playing" : "paused";
    if (navigator.mediaSession.setPositionState && duration > 0) {
      try { navigator.mediaSession.setPositionState({ duration, playbackRate: Number(speed.value), position: Math.min(duration, Math.max(0, position)) }); } catch {}
    }
  }
  function update() {
    if (!changingPart) position = Math.min(duration, offset + audio.currentTime);
    if (!dragging) seek.value = String(position);
    seek.setAttribute("aria-valuetext", `${formatTime(position)} - ${formatTime(duration)}`);
    clock.textContent = `${formatTime(position)} - ${formatTime(duration)}`;
    const chapter = [...chapters.options].reverse().find((option) => Number(option.value) <= position + 0.1);
    if (chapter) chapters.value = chapter.value;
    play.textContent = intentToPlay ? words.pause : audio.error ? words.retry : started ? words.resume : words.play;
    play.setAttribute("aria-pressed", String(intentToPlay));
    updateMedia();
  }
  async function playAudio() {
    const request = ++playRequest;
    error.hidden = true;
    intentToPlay = true;
    started = true;
    update();
    try { await audio.play(); } catch {
      if (request !== playRequest) return;
      intentToPlay = false;
      error.textContent = words.error;
      error.hidden = false;
      update();
    }
  }
  function resumeAudio() {
    if (!audio.getAttribute("src") || position >= duration - 0.1) jump(0, true);
    else if (audio.error) jump(position, true);
    else playAudio();
  }
  function jump(time, continuePlaying = intentToPlay) {
    playRequest += 1;
    position = Math.max(0, Math.min(duration, time));
    const target = locateSegment(entry.segments, position);
    const switching = partIndex !== target.index || !audio.getAttribute("src") || Boolean(audio.error);
    partIndex = target.index;
    offset = target.offset;
    if (switching) {
      changingPart = true;
      pendingTime = target.time;
      audio.src = entry.segments[partIndex].src;
      audio.load();
    } else if (audio.readyState >= 1) {
      audio.currentTime = Math.min(target.time, audio.duration || target.time);
    } else {
      pendingTime = target.time;
    }
    intentToPlay = continuePlaying;
    update();
    if (continuePlaying) playAudio();
  }
  play.addEventListener("click", () => {
    if (intentToPlay) { playRequest += 1; intentToPlay = false; audio.pause(); update(); }
    else resumeAudio();
  });
  back.addEventListener("click", () => jump(position - 15));
  forward.addEventListener("click", () => jump(position + 15));
  speed.addEventListener("change", () => { audio.playbackRate = Number(speed.value); updateMedia(); });
  seek.addEventListener("input", () => { dragging = true; clock.textContent = `${formatTime(Number(seek.value))} - ${formatTime(duration)}`; });
  seek.addEventListener("change", () => { dragging = false; jump(Number(seek.value)); });
  chapters.addEventListener("change", () => jump(Number(chapters.value)));
  audio.addEventListener("loadedmetadata", () => {
    if (pendingTime !== null) audio.currentTime = Math.min(pendingTime, audio.duration);
    pendingTime = null;
    changingPart = false;
    audio.playbackRate = Number(speed.value);
    update();
  });
  audio.addEventListener("timeupdate", update);
  audio.addEventListener("play", () => { intentToPlay = true; started = true; update(); });
  audio.addEventListener("pause", () => { if (!changingPart && !audio.ended) { intentToPlay = false; update(); } });
  audio.addEventListener("ended", () => {
    if (partIndex < entry.segments.length - 1) jump(offset + entry.segments[partIndex].duration, true);
    else { position = duration; intentToPlay = false; seek.value = String(duration); clock.textContent = `${formatTime(duration)} - ${formatTime(duration)}`; play.textContent = words.play; play.setAttribute("aria-pressed", "false"); updateMedia(); }
  });
  audio.addEventListener("error", () => {
    intentToPlay = false;
    error.textContent = words.error;
    error.hidden = false;
    update();
    changingPart = false;
  });
  if ("mediaSession" in navigator) {
    if (typeof MediaMetadata === "function") navigator.mediaSession.metadata = new MediaMetadata({ title: entry.title, artist: "NhanAZ", album: words.title });
    const handlers = { play: resumeAudio, pause: () => { playRequest += 1; intentToPlay = false; audio.pause(); update(); }, seekbackward: (event) => jump(position - (event.seekOffset || 15)), seekforward: (event) => jump(position + (event.seekOffset || 15)), seekto: (event) => jump(event.seekTime) };
    Object.entries(handlers).forEach(([action, handler]) => { try { navigator.mediaSession.setActionHandler(action, handler); } catch {} });
  }
  window.addEventListener("pagehide", () => audio.pause());
  controls.hidden = false;
  panel.dataset.audioReady = "true";
  update();
}

if (typeof document !== "undefined") initArticleAudio();
