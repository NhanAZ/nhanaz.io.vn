import { Redis } from "@upstash/redis";

const COUNTER_URL = process.env.VIEW_COUNTER_KV_REST_API_URL;
const COUNTER_TOKEN = process.env.VIEW_COUNTER_KV_REST_API_TOKEN;
const SERVER = { name: "nhanaz.io.vn product MCP", version: "1.0.0" };
const schema = (properties, required = []) => ({ type: "object", $schema: "https://json-schema.org/draft/2020-12/schema", properties, required, additionalProperties: false });
const annotations = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false };
const tools = [
  {
    name: "read_page_counter",
    title: "Read page-view counter",
    description: "Read the aggregate page-view total for one normalized public path without incrementing it. This product surface is public and read-only.",
    inputSchema: schema({ path: { type: "string", pattern: "^/", maxLength: 200, description: "Normalized public path, for example /." } }, ["path"]),
    annotations,
  },
  {
    name: "describe_page_counter",
    title: "Describe page-view counter",
    description: "Read the public page-view counter's normalization, retry, and read-only rules. This does not access or change a counter.",
    inputSchema: schema({}),
    annotations,
  },
  {
    name: "read_counter_endpoint_info",
    title: "Read counter endpoint info",
    description: "Read canonical links and capability metadata for the public page-view counter and its product MCP surface.",
    inputSchema: schema({}),
    annotations,
  },
];

const result = (id, value) => ({ jsonrpc: "2.0", id, result: value });
const error = (id, code, message) => ({ jsonrpc: "2.0", id: id ?? null, error: { code, message } });

function send(request, response, payload, status = 200) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, Idempotency-Key, MCP-Protocol-Version, Mcp-Session-Id");
  response.setHeader("Access-Control-Expose-Headers", "Mcp-Session-Id, MCP-Protocol-Version");
  const sessionId = request.headers?.["mcp-session-id"];
  if (sessionId) response.setHeader("Mcp-Session-Id", sessionId);
  if (request.headers?.accept?.includes("text/event-stream")) {
    response.setHeader("Content-Type", "text/event-stream");
    response.setHeader("Cache-Control", "no-cache, no-transform");
    response.setHeader("X-Accel-Buffering", "no");
    response.status(status);
    response.write(`event: message\ndata: ${JSON.stringify(payload)}\n\n`);
    response.end();
    return;
  }
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.status(status).json(payload);
}

function normalizePath(value) {
  if (typeof value !== "string" || value.length === 0 || value.length > 200 || !value.startsWith("/")) return null;
  try { return new URL(value, "https://nhanaz.io.vn").pathname.replace(/\/{2,}/g, "/") || "/"; } catch { return null; }
}

export default async function handler(request, response) {
  if (request.headers?.["idempotency-key"]) response.setHeader("Idempotency-Key", request.headers["idempotency-key"]);
  if (request.method === "OPTIONS") { response.status(204).end(); return; }
  if (request.method === "GET") {
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.status(200).json({ ...SERVER, protocolVersion: "2025-11-25", endpoint: "https://nhanaz.io.vn/mcp/product", serverCard: "https://nhanaz.io.vn/.well-known/mcp/product/server-card.json", authentication: "none", readOnly: true });
    return;
  }
  if (request.method !== "POST") { send(request, response, error(null, -32600, "Only GET, POST, and OPTIONS are supported"), 405); return; }
  const body = typeof request.body === "string" ? JSON.parse(request.body || "{}") : request.body;
  if (!body || typeof body.method !== "string") { send(request, response, error(null, -32600, "A JSON-RPC method is required"), 400); return; }
  const id = body.id;
  if (body.method.startsWith("notifications/") || !Object.hasOwn(body, "id")) { response.status(202).end(); return; }
  try {
    if (body.method === "initialize") {
      send(request, response, result(id, { protocolVersion: "2025-11-25", capabilities: { tools: { listChanged: true } }, serverInfo: SERVER, instructions: "This is a public read-only product surface for aggregate page-view totals. Use its tools to read counter metadata or a normalized path without incrementing it." }));
      return;
    }
    if (body.method === "ping") { send(request, response, result(id, {})); return; }
    if (body.method === "tools/list" || body.method === "list_tools") { send(request, response, result(id, { tools })); return; }
    if (body.method !== "tools/call" && body.method !== "call_tool") { send(request, response, error(id, -32601, `Unsupported MCP method: ${body.method}`)); return; }
    if (!["read_page_counter", "describe_page_counter", "read_counter_endpoint_info"].includes(body.params?.name)) { send(request, response, error(id, -32601, "Unknown product MCP tool")); return; }
    if (body.params.name === "describe_page_counter") {
      send(request, response, result(id, { content: [{ type: "text", text: "The counter accepts normalized public paths beginning with /. GET /api/v1/views increments once, readOnly=1 reads without incrementing, and Idempotency-Key makes retries safe for 24 hours." }], structuredContent: { readOnly: true, pathPattern: "^/", readOnlyQuery: "readOnly=1", idempotencyTtlSeconds: 86400 } }));
      return;
    }
    if (body.params.name === "read_counter_endpoint_info") {
      send(request, response, result(id, { content: [{ type: "text", text: "Canonical counter API: https://nhanaz.io.vn/api/v1/views. Compatibility alias: https://nhanaz.io.vn/api/views. Product MCP: https://nhanaz.io.vn/mcp/product." }], structuredContent: { readOnly: true, api: "https://nhanaz.io.vn/api/v1/views", compatibilityAlias: "https://nhanaz.io.vn/api/views", mcp: "https://nhanaz.io.vn/mcp/product" } }));
      return;
    }
    const path = normalizePath(body.params?.arguments?.path);
    if (!path) { send(request, response, error(id, -32602, "path must be a normalized public path")); return; }
    if (!COUNTER_URL || !COUNTER_TOKEN) { send(request, response, error(id, -32000, "Counter storage is unavailable"), 503); return; }
    const redis = new Redis({ url: COUNTER_URL, token: COUNTER_TOKEN });
    const value = await redis.get(`pageviews:v1:${path}`);
    const payload = { path, views: Number(value) || 0, readOnly: true };
    send(request, response, result(id, { content: [{ type: "text", text: JSON.stringify(payload) }], structuredContent: payload, _meta: { readOnly: true } }));
  } catch (caught) {
    send(request, response, error(id, -32603, caught?.message || "Product MCP request failed"), 500);
  }
}
