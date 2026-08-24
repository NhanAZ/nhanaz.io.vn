import { DOCUMENT_RESOURCES, publicUrl, searchArchive } from "../lib/agent-data.js";

const SERVER = { name: "nhanaz.io.vn read-only MCP", version: "1.0.0" };
const UI_URI = "ui://nhanaz/archive.html";
const CARD_URI = "mcp://nhanaz/server-card.json";
const ARCHIVE_RESULT_SCHEMA = {
  type: "object",
  $schema: "https://json-schema.org/draft/2020-12/schema",
  properties: {
    name: { type: "string" },
    url: { type: "string", format: "uri" },
    site: { type: "string", format: "uri" },
    score: { type: "number", minimum: 0, maximum: 1 },
    description: { type: "string" },
    schema_object: { type: "object" },
  },
  required: ["name", "url"],
  additionalProperties: true,
};
const RESOURCE_SCHEMA = {
  type: "object",
  $schema: "https://json-schema.org/draft/2020-12/schema",
  properties: {
    uri: { type: "string", format: "uri" },
    mimeType: { type: "string" },
    text: { type: "string" },
  },
  required: ["uri", "text"],
  additionalProperties: false,
};
const UI_HTML = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="color-scheme" content="light dark">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; connect-src https://nhanaz.io.vn; frame-ancestors https://chatgpt.com https://claude.ai; img-src https://nhanaz.io.vn data:; style-src 'unsafe-inline'; form-action https://nhanaz.io.vn">
  <title>NhanAZ archive</title>
  <style>body{font:16px system-ui,sans-serif;max-width:48rem;margin:2rem auto;padding:0 1rem}a{color:inherit}code{font-family:ui-monospace,monospace}</style>
</head>
<body>
  <h1>nhanaz.io.vn</h1>
  <p>Giao diện chỉ đọc cho kho lưu trữ cá nhân của Nguyễn Thành Nhân - NhanAZ.</p>
  <p><a href="https://nhanaz.io.vn/llms.txt">Đọc llms.txt</a> · <a href="https://nhanaz.io.vn/developers/">Developer resources</a></p>
</body>
</html>`;

const tools = [
  {
    name: "find_archive_pages",
    title: "Find archive pages",
    description: "Find relevant canonical pages in the NhanAZ archive for a natural-language query. Results are links to public pages; the archive is read-only.",
    inputSchema: {
      type: "object",
      $schema: "https://json-schema.org/draft/2020-12/schema",
      properties: { query: { type: "string", minLength: 1, description: "What the caller wants to find." }, limit: { type: "integer", minimum: 1, maximum: 12, default: 8 } },
      required: ["query"],
      additionalProperties: false,
    },
    outputSchema: {
      type: "object",
      $schema: "https://json-schema.org/draft/2020-12/schema",
      properties: { results: { type: "array", items: ARCHIVE_RESULT_SCHEMA } },
      required: ["results"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  {
    name: "read_archive_resource",
    title: "Read archive resource",
    description: "Read one allowlisted machine-readable document from nhanaz.io.vn. The tool never fetches arbitrary hosts.",
    inputSchema: {
      type: "object",
      $schema: "https://json-schema.org/draft/2020-12/schema",
      properties: { uri: { type: "string", format: "uri", description: "Absolute nhanaz.io.vn URL from resources/list or the public docs." } },
      required: ["uri"],
      additionalProperties: false,
    },
    outputSchema: RESOURCE_SCHEMA,
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  {
    name: "open_archive_view",
    title: "Open archive viewer",
    description: "Open the read-only archive viewer in a host that supports MCP Apps.",
    inputSchema: {
      type: "object",
      $schema: "https://json-schema.org/draft/2020-12/schema",
      properties: { focus: { type: "string", enum: ["overview", "resources"], default: "overview", description: "Optional initial section to emphasize in the read-only view." } },
      additionalProperties: false,
    },
    outputSchema: {
      type: "object",
      $schema: "https://json-schema.org/draft/2020-12/schema",
      properties: { resourceUri: { type: "string", format: "uri-reference" }, focus: { type: "string", enum: ["overview", "resources"] } },
      required: ["resourceUri", "focus"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    _meta: { ui: { resourceUri: UI_URI }, "ui/resourceUri": UI_URI },
  },
];

const errorResult = (id, code, message, data) => ({ jsonrpc: "2.0", id: id ?? null, error: { code, message, ...(data ? { data } : {}) } });
const result = (id, value) => ({ jsonrpc: "2.0", id, result: value });

function sendMcpResponse(request, response, payload, status = 200) {
  const sessionId = request.headers?.["mcp-session-id"] || request.headers?.["Mcp-Session-Id"];
  if (sessionId) response.setHeader("Mcp-Session-Id", sessionId);
  const protocolVersion = payload?.result?.protocolVersion
    || request.headers?.["mcp-protocol-version"]
    || request.headers?.["MCP-Protocol-Version"];
  if (protocolVersion) response.setHeader("MCP-Protocol-Version", protocolVersion);
  const accept = request.headers?.accept || "";
  const wantsEventStream = accept.includes("text/event-stream") && !accept.includes("application/json");
  if (wantsEventStream) {
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

function setCommonHeaders(response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, Idempotency-Key, MCP-Protocol-Version, Mcp-Method, Mcp-Name, Mcp-Session-Id");
  response.setHeader("Access-Control-Expose-Headers", "Mcp-Session-Id, MCP-Protocol-Version");
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("X-Robots-Tag", "noindex, nofollow");
}

function parseBody(request) {
  if (request.body && typeof request.body === "object") return request.body;
  if (typeof request.body === "string") {
    try { return JSON.parse(request.body); } catch { return null; }
  }
  return null;
}

function originAllowed(request) {
  // This is a public, unauthenticated read-only surface. Keep CORS open so
  // discovery services and browser-based agent hosts can perform the MCP
  // handshake without a private allowlist.
  return true;
}

async function readResource(uri) {
  if (uri === UI_URI) return { uri, mimeType: "text/html;profile=mcp-app", text: UI_HTML };
  if (uri === CARD_URI) return { uri, mimeType: "application/mcp-server-card+json", text: JSON.stringify({ name: "io.github.nhanaz/nhanaz.io.vn", title: "NhanAZ archive", version: SERVER.version, websiteUrl: "https://nhanaz.io.vn/", remotes: [{ type: "streamable-http", url: "https://nhanaz.io.vn/mcp" }] }, null, 2) };
  const safe = publicUrl(uri);
  if (!safe) return null;
  const response = await fetch(safe, { headers: { Accept: "text/markdown, application/json, text/plain, application/xml" } });
  if (!response.ok) return null;
  return { uri: safe.toString(), mimeType: response.headers.get("content-type")?.split(";")[0] ?? "text/plain", text: await response.text() };
}

async function callTool(name, args = {}) {
  if (name === "find_archive_pages") {
    const matches = searchArchive(args.query, Math.min(12, Math.max(1, Number(args.limit) || 8)));
    return { content: [{ type: "text", text: JSON.stringify(matches, null, 2) }], structuredContent: { results: matches }, _meta: { readOnly: true } };
  }
  if (name === "read_archive_resource") {
    const resource = await readResource(args.uri);
    if (!resource) throw Object.assign(new Error("URI is not an allowlisted public resource"), { code: -32602 });
    return { content: [{ type: "text", text: resource.text }], structuredContent: resource, _meta: { uri: resource.uri, mimeType: resource.mimeType, readOnly: true } };
  }
  if (name === "open_archive_view") {
    const focus = args.focus === "resources" ? "resources" : "overview";
    return { content: [{ type: "resource", resource: { uri: UI_URI, mimeType: "text/html;profile=mcp-app", text: UI_HTML } }], structuredContent: { resourceUri: UI_URI, focus }, _meta: { ui: { resourceUri: UI_URI, focus }, readOnly: true } };
  }
  throw Object.assign(new Error(`Unknown tool: ${name}`), { code: -32601 });
}

export async function handleMcp(request, response) {
  setCommonHeaders(response);
  if (request.headers?.["idempotency-key"]) response.setHeader("Idempotency-Key", request.headers["idempotency-key"]);
  if (!originAllowed(request)) {
    response.status(403).json(errorResult(null, -32000, "Origin is not allowed"));
    return;
  }
  if (request.method === "OPTIONS") { response.status(204).end(); return; }
  if (request.method === "GET") {
    if (request.headers?.accept?.includes("text/event-stream")) {
      response.setHeader("Content-Type", "text/event-stream");
      response.setHeader("Cache-Control", "no-cache, no-transform");
      response.setHeader("X-Accel-Buffering", "no");
      response.status(200);
      response.write("event: endpoint\ndata: https://nhanaz.io.vn/mcp\n\n");
      response.end();
      return;
    }
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.status(200).json({ protocolVersion: "2025-11-25", serverInfo: SERVER, capabilities: { tools: {}, resources: {} }, endpoint: "https://nhanaz.io.vn/mcp" });
    return;
  }
  if (request.method !== "POST") {
    response.setHeader("Allow", "GET, POST, OPTIONS");
    response.status(405).json(errorResult(null, -32600, "Only GET, POST, and OPTIONS are supported"));
    return;
  }
  const body = parseBody(request);
  if (!body || typeof body.method !== "string") {
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.status(400).json(errorResult(null, -32600, "A JSON-RPC method is required"));
    return;
  }
  const id = body.id;
  if (body.method.startsWith("notifications/") || !Object.hasOwn(body, "id")) { response.status(202).end(); return; }
  try {
    let payload;
    switch (body.method) {
      case "initialize":
        payload = { protocolVersion: ["2025-11-25", "2025-06-18", "2025-03-26", "2024-11-05"].includes(body.params?.protocolVersion) ? body.params.protocolVersion : "2025-11-25", capabilities: { tools: { listChanged: true }, resources: { subscribe: false, listChanged: true } }, serverInfo: SERVER, instructions: "This is a public read-only archive. Use tools/list and resources/list, then read canonical resources before citing." };
        break;
      case "ping": payload = {}; break;
      case "tools/list":
      case "list_tools": payload = { tools, ttlMs: 300000, cacheScope: "public" }; break;
      case "resources/list":
      case "list_resources": payload = { resources: [...DOCUMENT_RESOURCES, { uri: UI_URI, name: "nhanaz-archive-viewer", title: "NhanAZ archive viewer", mimeType: "text/html;profile=mcp-app", description: "Read-only MCP Apps view for the public archive.", _meta: { ui: { resourceUri: UI_URI }, "ui/resourceUri": UI_URI } }, { uri: CARD_URI, name: "nhanaz-server-card", title: "NhanAZ MCP server card", mimeType: "application/mcp-server-card+json", description: "Remote connection metadata for the NhanAZ MCP server." }], ttlMs: 300000, cacheScope: "public" }; break;
      case "resources/read":
      case "read_resource": {
        const resource = await readResource(body.params?.uri);
        if (!resource) throw Object.assign(new Error("Resource URI is not allowlisted"), { code: -32602 });
        payload = { contents: [resource], ttlMs: 300000, cacheScope: "public" };
        break;
      }
      case "tools/call":
      case "call_tool": payload = await callTool(body.params?.name, body.params?.arguments); break;
      case "prompts/list":
      case "list_prompts": payload = { prompts: [] }; break;
      default: throw Object.assign(new Error(`Unsupported MCP method: ${body.method}`), { code: -32601 });
    }
    sendMcpResponse(request, response, result(id, payload));
  } catch (error) {
    sendMcpResponse(request, response, errorResult(id, error.code || -32603, error.message || "MCP request failed"));
  }
}

export default handleMcp;
