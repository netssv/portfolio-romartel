import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export async function GET() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2500);

  try {
    const [contextRes, indicatorsRes] = await Promise.allSettled([
      fetch("https://hodl-watcher-api.onrender.com/api/practice/context", {
        signal: controller.signal,
        headers: { "Cache-Control": "no-cache" },
        next: { revalidate: 60 },
      }),
      fetch("https://hodl-watcher-api.onrender.com/api/indicators?symbol=BTCUSDT&interval=1h&limit=1", {
        signal: controller.signal,
        headers: { "Cache-Control": "no-cache" },
        next: { revalidate: 60 },
      }),
    ]);

    clearTimeout(timeoutId);

    let contextData: Record<string, unknown> | null = null;
    let indicatorData: Record<string, unknown> | null = null;

    if (contextRes.status === "fulfilled" && contextRes.value.ok) {
      contextData = (await contextRes.value.json()) as Record<string, unknown>;
    }

    if (indicatorsRes.status === "fulfilled" && indicatorsRes.value.ok) {
      indicatorData = (await indicatorsRes.value.json()) as Record<string, unknown>;
    }

    const contextList = contextData?.data as Array<Record<string, unknown>> | undefined;
    const indicatorList = indicatorData?.data as Array<Record<string, unknown>> | undefined;
    const latestContext = contextList && contextList.length > 0 ? contextList[contextList.length - 1] : null;
    const latestIndicator = indicatorList && indicatorList.length > 0 ? indicatorList[0] : null;

    return NextResponse.json(
      {
        status: "online",
        timestamp: new Date().toISOString(),
        sentiment: {
          fearGreed: latestContext?.fear_greed ?? 68,
          classification: latestContext?.fear_greed_classification ?? "Greed",
          dxy: latestContext?.dxy ?? 104.2,
        },
        marketFlow: {
          vwap24: latestIndicator?.vwap_24 ?? null,
          cvd24: latestIndicator?.cvd_24 ?? null,
          realizedVol24: latestIndicator?.realized_vol_24 ?? null,
          futuresBasis: latestIndicator?.futures_basis ?? null,
        },
      },
      {
        headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" },
      }
    );
  } catch {
    clearTimeout(timeoutId);
    return NextResponse.json(
      {
        status: "cached",
        timestamp: new Date().toISOString(),
        sentiment: {
          fearGreed: 68,
          classification: "Greed",
          dxy: 104.2,
        },
        marketFlow: {
          vwap24: null,
          cvd24: null,
          realizedVol24: null,
          futuresBasis: null,
        },
      },
      { status: 200 }
    );
  }
}
