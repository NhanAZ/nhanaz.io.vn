import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const local = path.join(root, "outputs", "audio-venv", process.platform === "win32" ? "Scripts/python.exe" : "bin/python");
const python = process.env.ARTICLE_AUDIO_PYTHON || (existsSync(local) ? local : process.platform === "win32" ? "python" : "python3");
const result = spawnSync(python, ["scripts/build-article-audio.py", ...process.argv.slice(2)], {
  cwd: root, stdio: "inherit", env: { ...process.env, PYTHONIOENCODING: "utf-8" }
});
if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);
