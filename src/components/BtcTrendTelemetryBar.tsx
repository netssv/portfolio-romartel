"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ArrowUpRight, ChevronDown, ChevronUp, BookOpen, Activity } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { TelemetryLogDrawer, TelemetryEvent } from "@/src/components/TelemetryLogDrawer";
import { BtcPriceCard, TelemetryStatus } from "@/src/components/BtcPriceCard";
import { useLanguage } from "@/src/context/LanguageContext";
import { formatTimeAgo, formatEventTime } from "@/src/lib/telemetryFormat";
import { TelemetryStatusBadge } from "@/src/components/telemetry/TelemetryStatusBadge";

interface TelemetryResponse {
  status: "live" | "waking_up" | "offline";
  service: string;
  server_time: string;
  count: number;
  events: TelemetryEvent[];
  last_real_data_timestamp?: string | null;
}

export const BtcTrendTelemetryBar: React.FC = () => {
  const { isSpanish } = useLanguage();
  const [telemetry, setTelemetry] = useState<TelemetryResponse | null>(null);
  const [telemetryStatus, setTelemetryStatus] = useState<TelemetryStatus>("loading");
  const [sentiment, setSentiment] = useState<{ fearGreed: number; classification: string } | null>(null);
  const [btcTicker, setBtcTicker] = useState({ price: 0, priceChangePercent: 0, highPrice: 0, lowPrice: 0 });
  const [btcStatus, setBtcStatus] = useState<TelemetryStatus>("loading");
  const [lastBtcUpdate, setLastBtcUpdate] = useState<string | null>(null);
  const [priceFlash, setPriceFlash] = useState<"up" | "down" | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showLogs, setShowLogs] = useState<boolean>(false);

  const fetchInsights = useCallback(async () => {
    try {
      const res = await fetch("/api/hodl-insights");
      if (res.ok) {
        const data = await res.json();
        if (data.sentiment) setSentiment(data.sentiment);
      }
    } catch (err) {
      console.warn("HODL insights fetch failed:", err);
    }
  }, []);

  const fetchBtcPrice = useCallback(async () => {
    try {
      const res = await fetch("https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT");
      if (!res.ok) {
        setBtcStatus("offline");
        return;
      }
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
      setBtcStatus("live");
      setLastBtcUpdate(new Date().toISOString());
    } catch (err) {
      console.warn("Binance price ticker fetch failed:", err);
      setBtcStatus("offline");
    }
  }, []);

  const fetchTelemetry = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/telemetry?_t=${Date.now()}`);
      if (res.ok) {
        const data: TelemetryResponse = await res.json();
        setTelemetry(data);
        setTelemetryStatus(data.status);
      } else {
        setTelemetryStatus("offline");
      }
    } catch (err) {
      console.warn("Telemetry API fetch failed:", err);
      setTelemetryStatus("offline");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initTimer = setTimeout(() => {
      void fetchBtcPrice();
      void fetchTelemetry();
      void fetchInsights();
    }, 1200);

    const btcInt = setInterval(() => void fetchBtcPrice(), 20000);
    const telInt = setInterval(() => void fetchTelemetry(), 35000);
    const insInt = setInterval(() => void fetchInsights(), 60000);

    return () => {
      clearTimeout(initTimer);
      clearInterval(btcInt);
      clearInterval(telInt);
      clearInterval(insInt);
    };
  }, [fetchBtcPrice, fetchTelemetry, fetchInsights]);

  const events = telemetry?.events || [];

  return (
    <section className="relative mt-8 sm:mt-12 mb-16 z-20">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <div className="relative overflow-hidden rounded-2xl border border-border-subtle bg-bg-surface p-4 sm:px-6 sm:py-4 shadow-sm transition-all duration-200 hover:border-border-base">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
              <TelemetryStatusBadge
                status={telemetryStatus}
                isSpanish={isSpanish}
                latestEvent={events[0]}
                lastRealDataTimestamp={telemetry?.last_real_data_timestamp}
              />

              {/* Center + Right Group */}
              <div className="flex flex-wrap items-center justify-between xl:justify-end gap-3 pt-3 xl:pt-0 border-t xl:border-t-0 border-border-subtle pr-0 xl:pr-8">
                <BtcPriceCard
                  price={btcTicker.price}
                  changePct={btcTicker.priceChangePercent}
                  highPrice={btcTicker.highPrice}
                  lowPrice={btcTicker.lowPrice}
                  flash={priceFlash}
                  status={btcStatus}
                  lastUpdatedLabel={lastBtcUpdate ? formatTimeAgo(lastBtcUpdate, isSpanish) : null}
                  sentiment={sentiment}
                />

                <div className="flex items-center gap-2">
                  <a
                    href="https://hodl-watcher-api.onrender.com/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-xl border border-border-subtle bg-bg-surface px-3 py-2 text-xs font-body font-medium text-text-secondary hover:border-accent hover:text-text-primary transition-all shadow-xs"
                  >
                    <BookOpen size={12} className="text-accent" />
                    <span>API Docs</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setShowLogs(!showLogs)}
                    className="flex items-center gap-1.5 rounded-xl border border-border-subtle bg-bg-raised px-3 py-2 text-xs font-body font-medium text-text-secondary hover:border-border-base hover:text-text-primary transition-all cursor-pointer shadow-xs"
                  >
                    <Activity size={13} className="text-accent" />
                    <span>{showLogs ? (isSpanish ? "Ocultar Registros" : "Hide Logs") : (isSpanish ? "Registros" : "Logs")}</span>
                    {showLogs ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  </button>
                  <a
                    href="https://hodl-watcher.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-xl bg-accent px-3.5 py-2 text-xs font-body font-semibold text-white hover:bg-accent-hover transition-all shadow-xs"
                  >
                    <span>{isSpanish ? "Mesa de Señales" : "Signal Desk"}</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {showLogs && (
                <TelemetryLogDrawer
                  events={events}
                  loading={loading}
                  onRefresh={() => {
                    fetchTelemetry();
                    fetchBtcPrice();
                    fetchInsights();
                  }}
                  formatTime={(iso) => formatEventTime(iso, isSpanish)}
                />
              )}
            </AnimatePresence>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
