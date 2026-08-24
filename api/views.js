import { Redis } from "@upstash/redis";
import { createHash } from "node:crypto";

const MAX_PATH_LENGTH = 200;
const COUNTER_URL = process.env.VIEW_COUNTER_KV_REST_API_URL;
const COUNTER_TOKEN = process.env.VIEW_COUNTER_KV_REST_API_TOKEN;
const RATE_LIMIT = 60;
const RATE_WINDOW_SECONDS = 60;
const IDEMPOTENCY_TTL_SECONDS = 86400;

const sendJson = (response, status, payload, headers = {}) => {
  response.status(status);
  Object.entries(headers).forEach(([name, value]) => response.setHeader(name, value));
  response.json(payload);
};

const problem = (code, message, status, extra = {}) => ({
  error: { code, message },
  type: `https://nhanaz.io.vn/problems/${code}`,
  title: message,
  status,
  detail: message,
  code,
  instance: "https://nhanaz.io.vn/api/views",
  resolution: "Read the public OpenAPI document for the request shape and recovery guidance.",
  documentation: "https://nhanaz.io.vn/openapi.json",
  ...extra,
});

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

const headerValue = (headers, name) => headers?.[name] ?? headers?.[name.toLowerCase()] ?? headers?.[name.toUpperCase()];
const digest = (value) => createHash("sha256").update(String(value)).digest("hex");

const rateLimit = async (redis, request) => {
  const identity = headerValue(request.headers, "x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
  const bucket = Math.floor(Date.now() / (RATE_WINDOW_SECONDS * 1000));
  const key = `ratelimit:v1:${digest(identity)}:${bucket}`;
  const pipeline = redis.pipeline();
  pipeline.incr(key);
  pipeline.expire(key, RATE_WINDOW_SECONDS);
  const [count] = await pipeline.exec();
  const current = Number(count) || 1;
  const reset = (bucket + 1) * RATE_WINDOW_SECONDS;
  const headers = {
    "RateLimit-Policy": `${RATE_LIMIT};w=${RATE_WINDOW_SECONDS}`,
    RateLimit: `limit=${RATE_LIMIT}, remaining=${Math.max(0, RATE_LIMIT - current)}, reset=${Math.max(0, reset - Math.ceil(Date.now() / 1000))}`,
    "RateLimit-Limit": `${RATE_LIMIT};w=${RATE_WINDOW_SECONDS}`,
    "RateLimit-Remaining": String(Math.max(0, RATE_LIMIT - current)),
    "RateLimit-Reset": String(reset),
  };
  return { current, headers };
};

export default async function handler(request, response) {
  const commonHeaders = {
    "Cache-Control": "no-store, max-age=0",
    "X-Robots-Tag": "noindex, nofollow",
    "RateLimit-Policy": `${RATE_LIMIT};w=${RATE_WINDOW_SECONDS}`,
    RateLimit: `limit=${RATE_LIMIT}, remaining=${RATE_LIMIT}, reset=${RATE_WINDOW_SECONDS}`,
    "RateLimit-Limit": `${RATE_LIMIT};w=${RATE_WINDOW_SECONDS}`,
    "RateLimit-Remaining": String(RATE_LIMIT),
    "RateLimit-Reset": String(Math.ceil(Date.now() / 1000) + RATE_WINDOW_SECONDS),
  };

  if (request.method !== "GET") {
    sendJson(response, 405, problem("method_not_allowed", "Only GET is supported", 405), { ...commonHeaders, Allow: "GET", "Content-Type": "application/problem+json; charset=utf-8" });
    return;
  }

  const pagePath = normalizePath(request.query?.path);
  if (!pagePath) {
    sendJson(response, 400, problem("invalid_path", "A valid public path is required", 400), { ...commonHeaders, "Content-Type": "application/problem+json; charset=utf-8" });
    return;
  }

  if (!COUNTER_URL || !COUNTER_TOKEN) {
    sendJson(response, 503, problem("storage_unavailable", "Counter storage is unavailable", 503), { ...commonHeaders, "Content-Type": "application/problem+json; charset=utf-8" });
    return;
  }

  const redis = new Redis({ url: COUNTER_URL, token: COUNTER_TOKEN });
  let rate;
  try {
    rate = await rateLimit(redis, request);
    Object.assign(commonHeaders, rate.headers);
    if (rate.current > RATE_LIMIT) {
      sendJson(response, 429, problem("rate_limited", "Rate limit exceeded", 429, { retryAfterSeconds: RATE_WINDOW_SECONDS }), { ...commonHeaders, "Retry-After": String(RATE_WINDOW_SECONDS), "Content-Type": "application/problem+json; charset=utf-8" });
      return;
    }
  } catch {
    // Counter availability is still the primary failure mode. If the optional
    // limiter cannot be reached, the request can proceed and remains bounded
    // by the storage endpoint's own safeguards.
  }

  const readOnly = ["1", "true", "yes"].includes(String(request.query?.readOnly || request.query?.readonly || "").toLowerCase());
  if (readOnly) {
    try {
      const views = await redis.get(`pageviews:v1:${pagePath}`);
      sendJson(response, 200, { path: pagePath, views: Number(views) || 0, readOnly: true }, commonHeaders);
    } catch {
      sendJson(response, 503, problem("storage_unavailable", "Counter storage is unavailable", 503), { ...commonHeaders, "Content-Type": "application/problem+json; charset=utf-8" });
    }
    return;
  }

  const idempotencyKey = headerValue(request.headers, "idempotency-key");
  if (idempotencyKey !== undefined && (typeof idempotencyKey !== "string" || idempotencyKey.length === 0 || idempotencyKey.length > 200)) {
    sendJson(response, 400, problem("invalid_idempotency_key", "Idempotency-Key must be 1-200 characters when supplied", 400), { ...commonHeaders, "Content-Type": "application/problem+json; charset=utf-8" });
    return;
  }

  const idempotencyRedisKey = idempotencyKey ? `pageviews:idempotency:v1:${digest(`${pagePath}:${idempotencyKey}`)}` : null;
  if (idempotencyRedisKey) {
    const previous = await redis.get(idempotencyRedisKey);
    if (previous && previous !== "pending") {
      try {
        const payload = typeof previous === "string" ? JSON.parse(previous) : previous;
        sendJson(response, 200, payload, { ...commonHeaders, "Idempotent-Replayed": "true" });
        return;
      } catch {
        await redis.del(idempotencyRedisKey);
      }
    }
    if (previous === "pending") {
      sendJson(response, 409, problem("idempotency_in_progress", "The idempotency key is already being processed", 409), { ...commonHeaders, "Content-Type": "application/problem+json; charset=utf-8" });
      return;
    }
    const reserved = await redis.set(idempotencyRedisKey, "pending", { nx: true, ex: IDEMPOTENCY_TTL_SECONDS });
    if (reserved === null) {
      sendJson(response, 409, problem("idempotency_in_progress", "The idempotency key is already being processed", 409), { ...commonHeaders, "Content-Type": "application/problem+json; charset=utf-8" });
      return;
    }
  }

  try {
    const views = await redis.incr(`pageviews:v1:${pagePath}`);
    const payload = { path: pagePath, views: Number(views) };
    if (idempotencyRedisKey) await redis.set(idempotencyRedisKey, JSON.stringify(payload), { ex: IDEMPOTENCY_TTL_SECONDS });
    sendJson(response, 200, payload, commonHeaders);
  } catch (error) {
    if (idempotencyRedisKey) await redis.del(idempotencyRedisKey);
    sendJson(response, 503, problem("storage_unavailable", "Counter storage is unavailable", 503), { ...commonHeaders, "Content-Type": "application/problem+json; charset=utf-8" });
  }
}
