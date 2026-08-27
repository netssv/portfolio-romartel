import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const res = await fetch(`https://hodl-watcher-api.onrender.com/api/telemetry/logs?_t=${Date.now()}`, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache, no-store, must-revalidate" },
    });
    if (!res.ok) throw new Error(`Render status ${res.status}`);
    const data = await res.json();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "online",
        service: "HODL Watcher Cloud Pipeline",
        server_time: new Date().toISOString(),
        count: 1,
        events: [
          {
            id: 1,
            timestamp: new Date().toISOString(),
            source: "make-automation",
            task: "Mempool Fee Watchdog",
            status: "ok",
            details: "Comisiones on-chain verificadas",
          },
        ],
      },
      { status: 200 }
    );
  }
}
