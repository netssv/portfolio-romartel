import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * ARCHITECTURAL NOTICE (Serverless Lifecycle & In-Memory Cache):
 * In serverless environments (e.g., Vercel Lambda / Edge), module-scoped memory
 * (`memoryCache`) is ephemeral and isolated to the active container instance.
 * It is NOT persistent across cold starts or across distinct serverless regions.
 *
 * If this specific instance has served a recent 200 response, it retains `lastTimestamp`
 * for best-effort fallback display. However, on a fresh cold container encountering an
 * upstream failure, `last_real_data_timestamp` will be null.
 * Callers and client components must never assume persistence exists.
 */
interface TelemetryMemoryCache {
  lastData: unknown | null;
  lastTimestamp: string | null;
}

const memoryCache: TelemetryMemoryCache = {
  lastData: null,
  lastTimestamp: null,
};

export async function GET() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    const res = await fetch(
      `https://hodl-watcher-api.onrender.com/api/telemetry/logs?_t=${Date.now()}`,
      {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache, no-store, must-revalidate" },
        signal: controller.signal,
      }
    );
    clearTimeout(timeoutId);

    if (res.status === 502 || res.status === 503 || res.status === 504) {
      return NextResponse.json(
        {
          status: "waking_up",
          service: "HODL Watcher Cloud Pipeline",
          server_time: new Date().toISOString(),
          last_real_data_timestamp: memoryCache.lastTimestamp,
          count: memoryCache.lastData ? (memoryCache.lastData as { count?: number }).count ?? 0 : 0,
          events: memoryCache.lastData ? (memoryCache.lastData as { events?: unknown[] }).events ?? [] : [],
          message: "Upstream service unavailable, possibly initializing.",
        },
        { status: 200 }
      );
    }

    if (!res.ok) {
      throw new Error(`Upstream HTTP status ${res.status}`);
    }

    const data = await res.json();
    memoryCache.lastData = data;
    memoryCache.lastTimestamp = new Date().toISOString();

    return NextResponse.json(
      {
        ...data,
        status: "live",
        last_real_data_timestamp: memoryCache.lastTimestamp,
      },
      {
        headers: { "Cache-Control": "no-store, max-age=0" },
      }
    );
  } catch (error) {
    const isAbort = error instanceof Error && (error.name === "AbortError" || error.name === "TimeoutError");
    const honestStatus = isAbort ? "waking_up" : "offline";

    return NextResponse.json(
      {
        status: honestStatus,
        service: "HODL Watcher Cloud Pipeline",
        server_time: new Date().toISOString(),
        last_real_data_timestamp: memoryCache.lastTimestamp,
        count: memoryCache.lastData ? (memoryCache.lastData as { count?: number }).count ?? 0 : 0,
        events: memoryCache.lastData ? (memoryCache.lastData as { events?: unknown[] }).events ?? [] : [],
        message:
          honestStatus === "waking_up"
            ? "Upstream service unavailable, possibly initializing."
            : "Upstream service unreachable.",
      },
      { status: 200 }
    );
  }
}
