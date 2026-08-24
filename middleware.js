import { next, rewrite } from "@vercel/functions";

export const config = {
  matcher: "/",
};

export default function middleware(request) {
  const url = new URL(request.url);

  if (url.searchParams.get("mode") === "agent") {
    return rewrite(new URL("/agent-mode.md", request.url));
  }

  const accept = request.headers.get("accept") || "";
  const userAgent = request.headers.get("user-agent") || "";
  const isAgent = /GPTBot|ClaudeBot|ChatGPT-User|PerplexityBot|Google-Extended|Applebot-Extended|ora-agent|DeepSeekBot/i.test(userAgent);

  if (url.pathname === "/" && (accept.includes("text/markdown") || isAgent)) {
    const response = rewrite(new URL("/index.md", request.url));
    response.headers.set("Vary", "Accept, User-Agent");
    return response;
  }

  return next();
}
