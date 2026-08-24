function bodyFrom(request) {
  if (request.body && typeof request.body === "object") return request.body;
  if (typeof request.body === "string") {
    try { return JSON.parse(request.body); } catch { return {}; }
  }
  return {};
}

function problem(status, code, detail) {
  return {
    error: { code, message: detail },
    type: `https://nhanaz.io.vn/problems/${code}`,
    title: detail,
    status,
    detail,
    code,
    resolution: "Use a public path beginning with / and retry the sandbox request.",
    documentation: "https://nhanaz.io.vn/developers/",
  };
}

export default function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("X-Robots-Tag", "noindex, nofollow");
  if (!["GET", "POST"].includes(request.method)) {
    response.setHeader("Content-Type", "application/problem+json; charset=utf-8");
    response.status(405).json(problem(405, "method_not_allowed", "The sandbox accepts GET and POST only."));
    return;
  }
  const body = request.method === "POST" ? bodyFrom(request) : {};
  const query = new URL(request.url, "https://nhanaz.io.vn").searchParams;
  const path = body.path || query.get("path") || "/sandbox/";
  if (typeof path !== "string" || !path.startsWith("/") || path.length > 200) {
    response.setHeader("Content-Type", "application/problem+json; charset=utf-8");
    response.status(400).json(problem(400, "invalid_path", "path must be a public path beginning with /."));
    return;
  }
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.status(200).json({
    sandbox: true,
    readOnly: true,
    sideEffects: false,
    path,
    views: 0,
    note: "This deterministic fixture never connects to counter storage and never changes production data.",
  });
}
