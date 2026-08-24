import handleMcp from "./mcp.js";

const manifest = {
  name: "nhanaz.io.vn read-only MCP",
  description: "Public read-only MCP surface for discovering and reading the NhanAZ personal archive.",
  version: "1.0.0",
  serverUrl: "https://nhanaz.io.vn/mcp",
  endpoint: "https://nhanaz.io.vn/mcp",
  documentation: "https://nhanaz.io.vn/developers/",
  transport: "streamable-http",
  protocolVersion: "2025-11-25",
  capabilities: { tools: {}, resources: {} },
  authentication: "none",
};

export default async function handler(request, response) {
  if (request.method === "GET") {
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.setHeader("Cache-Control", "public, max-age=300");
    response.status(200).json(manifest);
    return;
  }
  return handleMcp(request, response);
}
