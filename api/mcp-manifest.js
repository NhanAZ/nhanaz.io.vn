import handleMcp from "./mcp.js";

const manifest = {
  $schema: "https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json",
  name: "nhanaz.io.vn read-only MCP",
  title: "NhanAZ archive",
  description: "Public read-only MCP surface for discovering and reading the NhanAZ personal archive.",
  version: "1.0.0",
  serverUrl: "https://nhanaz.io.vn/mcp",
  endpoint: "https://nhanaz.io.vn/mcp",
  url: "https://nhanaz.io.vn/mcp",
  mcpEndpoint: "https://nhanaz.io.vn/mcp",
  websiteUrl: "https://nhanaz.io.vn/",
  serverCard: "https://nhanaz.io.vn/.well-known/mcp/server-card.json",
  remotes: [{ type: "streamable-http", url: "https://nhanaz.io.vn/mcp" }],
  documentation: "https://nhanaz.io.vn/developers/",
  transport: "streamable-http",
  protocolVersion: "2025-11-25",
  capabilities: { tools: {}, resources: {} },
  authentication: "none",
  relatedServers: [{ role: "product", url: "https://nhanaz.io.vn/mcp/product", readOnly: true }],
};

export default async function handler(request, response) {
  if (request.method === "GET") {
    // A client may use the well-known URL itself as the Streamable HTTP
    // endpoint after discovery. Keep JSON manifest negotiation for ordinary
    // requests, but expose the MCP endpoint event for SSE-capable clients.
    if (request.headers?.accept?.includes("text/event-stream")) return handleMcp(request, response);
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.setHeader("Cache-Control", "public, max-age=300");
    response.status(200).json(manifest);
    return;
  }
  return handleMcp(request, response);
}
