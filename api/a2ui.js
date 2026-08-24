const CATALOG_ID = "https://a2ui.org/specification/v1_0/catalogs/basic/catalog.json";

const surfaceMessage = {
  version: "v1.0",
  createSurface: {
    surfaceId: "nhanaz_archive",
    catalogId: CATALOG_ID,
    components: [
      { id: "root", component: "Column", children: ["title", "summary", "links"] },
      { id: "title", component: "Text", text: "nhanaz.io.vn" },
      { id: "summary", component: "Text", text: "Kho lưu trữ cá nhân, dự án và tài liệu máy đọc của Nguyễn Thành Nhân - NhanAZ." },
      { id: "links", component: "Text", text: "https://nhanaz.io.vn/llms.txt" },
    ],
  },
};

function send(response, status, payload, streaming = false) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, Idempotency-Key");
  response.setHeader("X-Robots-Tag", "noindex, nofollow");
  if (streaming) {
    response.setHeader("Content-Type", "text/event-stream; charset=utf-8");
    response.setHeader("Cache-Control", "no-cache, no-transform");
    response.status(status).send(`event: a2ui\ndata: ${JSON.stringify(payload)}\n\n`);
    return;
  }
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  response.status(status).json(payload);
}

export default function handler(request, response) {
  if (request.headers?.["idempotency-key"]) response.setHeader("Idempotency-Key", request.headers["idempotency-key"]);
  if (request.method === "OPTIONS") {
    send(response, 204, null);
    return;
  }
  if (!["GET", "POST"].includes(request.method)) {
    send(response, 405, { error: { code: "method_not_allowed", message: "Use GET or POST." } });
    return;
  }
  send(response, 200, surfaceMessage, request.headers?.accept?.includes("text/event-stream"));
}
