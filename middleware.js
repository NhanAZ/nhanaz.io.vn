import { next, rewrite } from "@vercel/functions";

export const config = {
  matcher: "/",
};

export default function middleware(request) {
  const url = new URL(request.url);

  if (url.searchParams.get("mode") === "agent") {
    return rewrite(new URL("/agent-mode.md", request.url));
  }

  return next();
}
