export default function handler(request, response) {
  response.setHeader("Content-Type", "application/problem+json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  response.status(404).json({
    error: { code: "not_found", message: "No versioned API resource exists at this path" },
    type: "https://nhanaz.io.vn/problems/not_found",
    title: "No versioned API resource exists at this path",
    status: 404,
    detail: "No versioned API resource exists at this path",
    code: "api_route_not_found",
    instance: request.url,
    resolution: "Open the documented versioned OpenAPI routes before retrying.",
    documentation: "https://nhanaz.io.vn/openapi.json",
  });
}
