import { Redis } from "@upstash/redis";

const MAX_PATH_LENGTH = 200;
const COUNTER_URL = process.env.VIEW_COUNTER_KV_REST_API_URL;
const COUNTER_TOKEN = process.env.VIEW_COUNTER_KV_REST_API_TOKEN;

const sendJson = (response, status, payload, headers = {}) => {
  response.status(status);
  Object.entries(headers).forEach(([name, value]) => response.setHeader(name, value));
  response.json(payload);
};

const normalizePath = (value) => {
  if (typeof value !== "string" || value.length === 0 || value.length > MAX_PATH_LENGTH) {
    return null;
  }

  const candidate = value.startsWith("/") ? value : `/${value}`;

  try {
    const pathname = new URL(candidate, "https://nhanaz.io.vn").pathname.replace(/\/{2,}/g, "/");
    return pathname || "/";
  } catch {
    return null;
  }
};

export default async function handler(request, response) {
  const commonHeaders = {
    "Cache-Control": "no-store, max-age=0",
    "X-Robots-Tag": "noindex, nofollow",
  };

  if (request.method !== "GET") {
    sendJson(response, 405, { error: "Only GET is supported" }, { ...commonHeaders, Allow: "GET" });
    return;
  }

  const pagePath = normalizePath(request.query?.path);
  if (!pagePath) {
    sendJson(response, 400, { error: "A valid public path is required" }, commonHeaders);
    return;
  }

  if (!COUNTER_URL || !COUNTER_TOKEN) {
    sendJson(response, 503, { error: "Counter storage is unavailable" }, commonHeaders);
    return;
  }

  try {
    const redis = new Redis({ url: COUNTER_URL, token: COUNTER_TOKEN });
    const views = await redis.incr(`pageviews:v1:${pagePath}`);
    sendJson(response, 200, { path: pagePath, views: Number(views) }, commonHeaders);
  } catch {
    sendJson(response, 503, { error: "Counter storage is unavailable" }, commonHeaders);
  }
}
