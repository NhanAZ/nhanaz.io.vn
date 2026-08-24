import { searchArchive } from "../lib/agent-data.js";

const VERSION = "0.55";

function sendJson(response, status, payload) {
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("X-Robots-Tag", "noindex, nofollow");
  response.status(status).json(payload);
}

function parseBody(request) {
  if (request.body && typeof request.body === "object") return request.body;
  if (typeof request.body === "string") {
    try { return JSON.parse(request.body); } catch { return null; }
  }
  return {};
}

function queryFrom(request, body) {
  const query = body?.query;
  if (typeof query === "object" && query) return query.text || query.query || "";
  if (typeof query === "string") return query;
  return new URL(request.url, "https://nhanaz.io.vn").searchParams.get("query") || "";
}

function streamingFrom(request, body) {
  const url = new URL(request.url, "https://nhanaz.io.vn");
  if (url.searchParams.has("streaming")) return !["0", "false", "no"].includes(url.searchParams.get("streaming"));
  if (body?.prefer && Object.hasOwn(body.prefer, "streaming")) return Boolean(body.prefer.streaming);
  if (Object.hasOwn(body, "streaming")) return Boolean(body.streaming);
  return request.headers?.accept?.includes("text/event-stream") ?? false;
}

function responseFor(query, body, streaming) {
  const requestedLimit = Math.min(12, Math.max(1, Number(body?.limit) || 8));
  const offset = Math.max(0, Number.parseInt(body?.cursor || "0", 10) || 0);
  const allResults = searchArchive(query, 12);
  const results = allResults.slice(offset, offset + requestedLimit);
  const nextCursor = offset + requestedLimit < allResults.length ? String(offset + requestedLimit) : null;
  const mode = body?.mode || "list";
  const meta = { response_type: "answer", response_format: "conversational_search", version: VERSION, streaming, read_only: true };
  const summary = results.length
    ? `Tìm thấy ${results.length} nguồn công khai phù hợp trong kho nhanaz.io.vn.`
    : "Chưa tìm thấy trang phù hợp trong chỉ mục công khai. Hãy thử tên bài, chủ đề hoặc tên project cụ thể.";
  return { _meta: meta, query_id: body?.query_id || `nhanaz-${Date.now().toString(36)}`, mode, summary, results, pagination: { limit: requestedLimit, nextCursor, hasMore: nextCursor !== null } };
}

export default async function handler(request, response) {
  if (!["GET", "POST", "OPTIONS"].includes(request.method)) {
    sendJson(response, 405, { _meta: { response_type: "failure", version: VERSION }, error: { code: "method_not_allowed", message: "Use GET or POST." } });
    return;
  }
  if (request.method === "OPTIONS") {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
    response.status(204).end();
    return;
  }
  const body = request.method === "POST" ? parseBody(request) : Object.fromEntries(new URL(request.url, "https://nhanaz.io.vn").searchParams.entries());
  const query = queryFrom(request, body).trim();
  if (!query || query.length > 500) {
    sendJson(response, 400, { _meta: { response_type: "failure", version: VERSION, streaming: false }, error: { code: "invalid_query", message: "query is required and must be at most 500 characters." } });
    return;
  }
  const streaming = streamingFrom(request, body);
  const payload = responseFor(query, body, streaming);
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("X-Robots-Tag", "noindex, nofollow");
  if (streaming) {
    response.setHeader("Content-Type", "text/event-stream; charset=utf-8");
    response.setHeader("Cache-Control", "no-cache, no-transform");
    response.setHeader("Connection", "keep-alive");
    const start = { _meta: { ...payload._meta, response_type: "answer", streaming: true } };
    const results = payload.results.map((item, index) => ({ index, item }));
    const events = [`event: start\ndata: ${JSON.stringify(start)}\n\n`, ...results.map((item) => `event: result\ndata: ${JSON.stringify(item)}\n\n`), `event: complete\ndata: ${JSON.stringify({ _meta: { ...payload._meta, streaming: true }, query_id: payload.query_id })}\n\n`];
    response.status(200).send(events.join(""));
    return;
  }
  sendJson(response, 200, payload);
}
