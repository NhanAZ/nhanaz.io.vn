export default function handler(request, response) {
  response.status(404).json({
    error: "No API resource exists at this path",
    documentation: "https://nhanaz.io.vn/openapi.json",
  });
}
