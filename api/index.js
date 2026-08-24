export default function handler(request, response) {
  response.setHeader("Content-Type", "application/problem+json; charset=utf-8");
  response.status(404).json({
    error: { code: "not_found", message: "No API resource exists at this path" },
    type: "https://nhanaz.io.vn/problems/not_found",
    title: "No API resource exists at this path",
    status: 404,
    detail: "No API resource exists at this path",
    documentation: "https://nhanaz.io.vn/openapi.json",
  });
}
