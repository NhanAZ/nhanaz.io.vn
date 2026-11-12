import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const portIndex = process.argv.indexOf("--port");
const port = portIndex < 0 ? 4174 : Number(process.argv[portIndex + 1]);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Invalid port");
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".ico": "image/x-icon", ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf", ".txt": "text/plain; charset=utf-8", ".md": "text/plain; charset=utf-8", ".xml": "application/xml; charset=utf-8" };

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
    const headers = { "Content-Type": types[path.extname(filename)] || "application/octet-stream", "Cache-Control": "no-cache", "Content-Length": info.size };
    response.writeHead(200, headers);
    if (request.method === "HEAD" || !info.size) response.end();
    else {
      const stream = createReadStream(filename);
      stream.on("error", () => response.destroy());
      response.on("close", () => stream.destroy());
      stream.pipe(response);
    }
  } catch { response.writeHead(404).end(); }
}).listen(port, "127.0.0.1", () => console.log(`Local preview · http://127.0.0.1:${port}`));
