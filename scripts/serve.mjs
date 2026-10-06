import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const portIndex = process.argv.indexOf("--port");
const port = portIndex < 0 ? 4174 : Number(process.argv[portIndex + 1]);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Invalid port");
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8", ".mp3": "audio/mpeg", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".ico": "image/x-icon", ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf", ".txt": "text/plain; charset=utf-8", ".md": "text/plain; charset=utf-8", ".xml": "application/xml; charset=utf-8" };

createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) { response.writeHead(405).end(); return; }
  try {
    const url = new URL(request.url, "http://localhost");
    const pathname = decodeURIComponent(url.pathname);
    let filename = path.resolve(root, "." + pathname);
    const relative = path.relative(root, filename);
    if (relative.startsWith("..") || path.isAbsolute(relative) || /(^|[\\/])(?:outputs|node_modules|\.git|\.vercel)(?:[\\/]|$)/u.test(relative)) { response.writeHead(403).end(); return; }
    let info = await stat(filename);
    if (info.isDirectory()) {
      if (!pathname.endsWith("/")) { response.writeHead(301, { Location: `${url.pathname}/${url.search}` }).end(); return; }
      filename = path.join(filename, "index.html");
      info = await stat(filename);
    }
    if (!info.isFile()) { response.writeHead(404).end(); return; }
    const headers = { "Content-Type": types[path.extname(filename)] || "application/octet-stream", "Cache-Control": "no-cache", "Accept-Ranges": "bytes" };
    let start = 0;
    let end = info.size - 1;
    let status = 200;
    if (request.headers.range) {
      const match = /^bytes=(\d*)-(\d*)$/u.exec(request.headers.range);
      if (!match || (!match[1] && !match[2])) { response.writeHead(416, { "Content-Range": `bytes */${info.size}` }).end(); return; }
      if (!match[1]) start = Math.max(0, info.size - Number(match[2]));
      else { start = Number(match[1]); if (match[2]) end = Math.min(end, Number(match[2])); }
      if (start > end || start >= info.size) { response.writeHead(416, { "Content-Range": `bytes */${info.size}` }).end(); return; }
      status = 206;
      headers["Content-Range"] = `bytes ${start}-${end}/${info.size}`;
    }
    headers["Content-Length"] = Math.max(0, end - start + 1);
    response.writeHead(status, headers);
    if (request.method === "HEAD" || !info.size) response.end();
    else {
      const stream = createReadStream(filename, { start, end });
      stream.on("error", () => response.destroy());
      response.on("close", () => stream.destroy());
      stream.pipe(response);
    }
  } catch { response.writeHead(404).end(); }
}).listen(port, "127.0.0.1", () => console.log(`Local preview with audio seeking · http://127.0.0.1:${port}`));
