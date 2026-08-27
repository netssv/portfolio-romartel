"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Terminal, ArrowUpRight, ChevronDown, ChevronUp, BookOpen, Send } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { TelemetryLogDrawer, TelemetryEvent } from "@/src/components/TelemetryLogDrawer";
import { BtcPriceCard } from "@/src/components/BtcPriceCard";

interface TelemetryData {
  status: string;
  service: string;
  server_time: string;
  count: number;
  events: TelemetryEvent[];
}

export const BtcTrendTelemetryBar: React.FC = () => {
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);
  const [btcTicker, setBtcTicker] = useState({ price: 0, priceChangePercent: 0, highPrice: 0, lowPrice: 0 });
  const [priceFlash, setPriceFlash] = useState<"up" | "down" | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [triggering, setTriggering] = useState<boolean>(false);
  const [showLogs, setShowLogs] = useState<boolean>(false);

  const fetchBtcPrice = useCallback(async () => {
    try {
      const res = await fetch("https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT");
      if (!res.ok) return;
      const json = await res.json();
      const newPrice = parseFloat(json.lastPrice);
      setBtcTicker((prev) => {
        if (prev.price > 0 && newPrice !== prev.price) {
          setPriceFlash(newPrice > prev.price ? "up" : "down");
          setTimeout(() => setPriceFlash(null), 1200);
        }
        return {
          price: newPrice,
          priceChangePercent: parseFloat(json.priceChangePercent),
          highPrice: parseFloat(json.highPrice),
          lowPrice: parseFloat(json.lowPrice),
        };
      });
    } catch {}
  }, []);

  const fetchTelemetry = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/telemetry?_t=${Date.now()}`);
      if (res.ok) setTelemetry(await res.json());
    } catch {} finally {
      setLoading(false);
    }
  }, []);

  const handleTriggerPing = async () => {
    try {
      setTriggering(true);
      await fetch("/api/telemetry/ping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "visitor-test",
          task: "Interactive Health Check",
          status: "ok",
          details: "Manual ping from portfolio visitor",
        }),
      });
      await fetchTelemetry();
      setShowLogs(true);
    } catch {} finally {
      setTriggering(false);
    }
  };

  useEffect(() => {
    fetchBtcPrice();
    fetchTelemetry();
    const btcInt = setInterval(fetchBtcPrice, 8000);
    const telInt = setInterval(fetchTelemetry, 25000);
    return () => { clearInterval(btcInt); clearInterval(telInt); };
  }, [fetchBtcPrice, fetchTelemetry]);

  const events = telemetry?.events || [];
  const latest = events[0];

  const formatTime = (iso?: string) => {
    if (!iso) return "Active";
    const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <section className="relative -mt-4 sm:-mt-6 mb-12 z-20">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <div className="relative overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-950/90 p-4 sm:px-6 sm:py-4 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-zinc-700/80">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

            {/* Main Aligned 1-Row Grid */}
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
              {/* Left Column: Live Status */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
                      LIVE CLOUD PIPELINE
                    </span>
                    <span className="rounded-md bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.2 text-[10px] font-mono font-medium text-emerald-300">
                      Render + Make.com
                    </span>
                  </div>
                  <p className="font-mono text-[11px] text-zinc-400 mt-0.5 truncate">
                    {latest ? (
                      <>Last: <span className="text-zinc-200 font-semibold">{latest.task}</span> · <span className="text-purple-400">[{latest.source}]</span> ({formatTime(latest.timestamp)})</>
                    ) : "Autonomous keep-alive maintaining 24/7 API uptime"}
                  </p>
                </div>
              </div>

              {/* Center + Right Group */}
              <div className="flex flex-wrap items-center justify-between xl:justify-end gap-3 pt-3 xl:pt-0 border-t xl:border-t-0 border-zinc-800/80">
                {/* Center Ticker */}
                <BtcPriceCard price={btcTicker.price} changePct={btcTicker.priceChangePercent} highPrice={btcTicker.highPrice} lowPrice={btcTicker.lowPrice} flash={priceFlash} />

                {/* Right Action Buttons */}
                <div className="flex items-center gap-2">
                  <button type="button" onClick={handleTriggerPing} disabled={triggering} title="Send a test ping to the backend" className="flex items-center gap-1 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs font-mono font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-all cursor-pointer">
                    <Send size={11} className={triggering ? "animate-bounce" : ""} />
                    <span>{triggering ? "Testing..." : "Test API"}</span>
                  </button>
                  <a href="https://hodl-watcher-api.onrender.com/docs" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 rounded-xl border border-zinc-700/80 bg-zinc-900 px-3 py-2 text-xs font-mono font-medium text-zinc-300 hover:bg-zinc-800 transition-all">
                    <BookOpen size={12} />
                    <span>Docs</span>
                  </a>
                  <button type="button" onClick={() => setShowLogs(!showLogs)} className="flex items-center gap-1.5 rounded-xl border border-zinc-700/80 bg-zinc-900 px-3 py-2 text-xs font-mono font-semibold text-zinc-200 hover:bg-zinc-800 transition-all cursor-pointer">
                    <Terminal size={13} className="text-emerald-400" />
                    <span>{showLogs ? "Hide" : "Logs"}</span>
                    {showLogs ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  </button>
                  <a href="https://hodl-watcher.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-xl bg-accent px-3.5 py-2 text-xs font-body font-bold text-black shadow-md hover:bg-amber-400 transition-all">
                    <span>Signal Desk</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {showLogs && (
                <TelemetryLogDrawer events={events} loading={loading} onRefresh={() => { fetchTelemetry(); fetchBtcPrice(); }} formatTime={formatTime} />
              )}
            </AnimatePresence>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
