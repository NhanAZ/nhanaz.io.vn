import { searchArchive } from "../lib/agent-data.js";

const cardUrl = "https://nhanaz.io.vn/.well-known/agent-card.json";
const rpc = (id, result) => ({ jsonrpc: "2.0", id, result });
const error = (id, code, message) => ({ jsonrpc: "2.0", id: id ?? null, error: { code, message } });

function textFromMessage(message) {
  return (message?.parts || []).map((part) => part?.text || part?.content || "").filter(Boolean).join(" ").trim();
}

export default async function handler(request, response) {
  if (request.headers?.["idempotency-key"]) response.setHeader("Idempotency-Key", request.headers["idempotency-key"]);
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, A2A-Version, Idempotency-Key");
  response.setHeader("Cache-Control", "no-store");
  if (request.method === "OPTIONS") { response.status(204).end(); return; }
  if (request.method === "GET") { response.setHeader("Content-Type", "application/a2a+json; charset=utf-8"); response.status(200).json({ card: cardUrl, readOnly: true }); return; }
  if (request.method !== "POST") { response.status(405).json(error(null, -32600, "Use GET or POST.")); return; }
  let body = request.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = null; } }
  if (!body || typeof body.method !== "string") { response.status(400).json(error(null, -32600, "A JSON-RPC method is required.")); return; }
  if (["tasks/cancel", "notifications/initialized"].includes(body.method)) { response.status(202).end(); return; }
  if (body.method === "agent/card" || body.method === "card/get") { response.setHeader("Content-Type", "application/json; charset=utf-8"); response.status(200).json(rpc(body.id, { card: cardUrl })); return; }
  if (body.method === "message/send" || body.method === "tasks/send") {
    const query = textFromMessage(body.params?.message) || body.params?.query || "";
    if (!query) { response.status(200).json(error(body.id, -32602, "A text message is required.")); return; }
    const results = searchArchive(query, 5);
    const text = results.length
      ? `Nguồn phù hợp trong kho nhanaz.io.vn:\n${results.map((item) => `- ${item.name}: ${item.url}`).join("\n")}`
      : "Chưa tìm thấy nguồn phù hợp trong chỉ mục công khai. Hãy thử một chủ đề hoặc tên bài cụ thể.";
    const message = { kind: "message", messageId: `msg-${Date.now().toString(36)}`, role: "agent", parts: [{ kind: "text", text }], metadata: { readOnly: true, source: "nhanaz.io.vn" } };
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.status(200).json(rpc(body.id, message));
    return;
  }
  response.status(200).json(error(body.id, -32601, `Unsupported A2A method: ${body.method}`));
}
