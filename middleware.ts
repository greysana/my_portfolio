import { NextResponse, type NextRequest } from "next/server";
import { clientIp, rateLimit } from "@/lib/rate-limit";

type Rule = { name: string; limit: number; windowMs: number };

/** First match wins. Tune these numbers to taste. */
const RULES: { test: (p: string) => boolean; rule: Rule }[] = [
  { test: (p) => p === "/api/resume", rule: { name: "resume", limit: 5, windowMs: 60_000 } },
  { test: (p) => p.startsWith("/api/"), rule: { name: "api", limit: 30, windowMs: 60_000 } },
  { test: () => true, rule: { name: "pages", limit: 120, windowMs: 60_000 } },
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // This site only reads data. Reject everything except safe methods.
  if (!["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    return new NextResponse("Method Not Allowed", { status: 405, headers: { Allow: "GET, HEAD, OPTIONS" } });
  }

  const { rule } = RULES.find((r) => r.test(pathname))!;
  const result = await rateLimit(`${rule.name}:${clientIp(req.headers)}`, rule.limit, rule.windowMs);

  const rl = {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(result.resetSeconds),
  };

  if (!result.ok) {
    return new NextResponse("Too many requests. Please slow down and try again shortly.", {
      status: 429,
      headers: { ...rl, "Retry-After": String(result.resetSeconds), "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  }

  const res = NextResponse.next();
  for (const [k, v] of Object.entries(rl)) res.headers.set(k, v);
  return res;
}

export const config = {
  // Skip static assets so images/fonts don't burn the page budget.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/|fonts/).*)"],
};
