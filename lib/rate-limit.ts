/**
 * Fixed-window rate limiter that runs on the Edge runtime (middleware).
 *  - With UPSTASH_REDIS_REST_URL/TOKEN set, counts are shared across all instances.
 *  - Otherwise (or if Redis is unreachable) it falls back to per-instance memory.
 */
export type RateResult = { ok: boolean; limit: number; remaining: number; resetSeconds: number };

const memory = new Map<string, { count: number; expires: number }>();

function memoryLimit(key: string, limit: number, windowMs: number, now: number): RateResult {
  if (memory.size > 5000) for (const [k, v] of memory) if (v.expires <= now) memory.delete(k);
  let entry = memory.get(key);
  if (!entry || entry.expires <= now) {
    entry = { count: 0, expires: now + windowMs };
    memory.set(key, entry);
  }
  entry.count += 1;
  return {
    ok: entry.count <= limit,
    limit,
    remaining: Math.max(0, limit - entry.count),
    resetSeconds: Math.ceil((entry.expires - now) / 1000),
  };
}

async function redisLimit(key: string, limit: number, windowMs: number, now: number): Promise<RateResult> {
  const url = process.env.UPSTASH_REDIS_REST_URL!;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN!;
  const bucket = Math.floor(now / windowMs);
  const k = `rl:${key}:${bucket}`;
  const res = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify([["INCR", k], ["PEXPIRE", k, windowMs, "NX"]]),
    signal: AbortSignal.timeout(800),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`redis ${res.status}`);
  const [{ result }] = (await res.json()) as { result: number }[];
  return {
    ok: result <= limit,
    limit,
    remaining: Math.max(0, limit - result),
    resetSeconds: Math.ceil(((bucket + 1) * windowMs - now) / 1000),
  };
}

export async function rateLimit(key: string, limit: number, windowMs: number): Promise<RateResult> {
  const now = Date.now();
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      return await redisLimit(key, limit, windowMs, now);
    } catch {
      /* fall through to memory so a Redis outage never takes the site down */
    }
  }
  return memoryLimit(key, limit, windowMs, now);
}

/**
 * Best-effort client IP. Platform headers are trusted first. The generic
 * X-Forwarded-For is only used when TRUST_PROXY=true, and we take the LAST
 * entry (added by your own proxy) because the first can be forged by the client.
 */
export function clientIp(headers: Headers): string {
  const direct = headers.get("cf-connecting-ip") || headers.get("x-real-ip");
  if (direct) return direct.trim();
  if (process.env.TRUST_PROXY === "true") {
    const xff = headers.get("x-forwarded-for");
    if (xff) return xff.split(",").pop()!.trim();
  }
  return "unknown";
}
