export default function handler(request, response) {
  response.status(404).json({
    error: "No versioned API resource exists at this path",
    documentation: "https://nhanaz.io.vn/openapi.json",
  });
}
