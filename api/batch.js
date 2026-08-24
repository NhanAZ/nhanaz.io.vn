import { publicUrl } from "../lib/agent-data.js";

function bodyFrom(request) {
  if (request.body && typeof request.body === "object") return request.body;
  if (typeof request.body === "string") {
    try { return JSON.parse(request.body); } catch { return null; }
  }
  return null;
}

function send(response, status, payload) {
  response.setHeader("Content-Type", status >= 400 ? "application/problem+json; charset=utf-8" : "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("X-Robots-Tag", "noindex, nofollow");
  response.status(status).json(payload);
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    send(response, 405, { type: "https://nhanaz.io.vn/problems/method_not_allowed", title: "Only POST is supported", status: 405, code: "method_not_allowed", detail: "Submit a JSON object with a paths array.", resolution: "Use POST /api/batch with up to 8 allowlisted public resource paths." });
    return;
  }
  const body = bodyFrom(request);
  if (!Array.isArray(body?.paths) || body.paths.length < 1 || body.paths.length > 8) {
    send(response, 400, { type: "https://nhanaz.io.vn/problems/invalid_batch", title: "paths must contain 1-8 resources", status: 400, code: "invalid_batch", detail: "Only allowlisted public machine-readable resources may be fetched.", resolution: "Pass a paths array with 1-8 URLs or paths from the developer resources." });
    return;
  }
  const urls = body.paths.map((item) => publicUrl(item)).filter(Boolean);
  if (urls.length !== body.paths.length) {
    send(response, 400, { type: "https://nhanaz.io.vn/problems/path_not_allowlisted", title: "A batch path is not allowlisted", status: 400, code: "path_not_allowlisted", detail: "The batch endpoint never fetches arbitrary hosts or pages.", resolution: "Use resources listed by /mcp resources/list or /developers.md." });
    return;
  }
  const results = [];
  for (const url of urls) {
    const fetched = await fetch(url, { headers: { Accept: "text/markdown, application/json, text/plain, application/xml" } });
    results.push({ url: url.toString(), status: fetched.status, contentType: fetched.headers.get("content-type")?.split(";")[0] || "text/plain", content: fetched.ok ? await fetched.text() : null });
  }
  send(response, 200, { readOnly: true, count: results.length, results });
}
