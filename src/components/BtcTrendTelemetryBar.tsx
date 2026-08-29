"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ArrowUpRight, ChevronDown, ChevronUp, BookOpen, Activity } from "lucide-react";
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

import { useLanguage } from "@/src/context/LanguageContext";

export const BtcTrendTelemetryBar: React.FC = () => {
  const { isSpanish } = useLanguage();
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);
  const [sentiment, setSentiment] = useState<{ fearGreed: number; classification: string } | null>(null);
  const [btcTicker, setBtcTicker] = useState({ price: 0, priceChangePercent: 0, highPrice: 0, lowPrice: 0 });
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
    } catch {}
  }, []);

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

  useEffect(() => {
    const initTimer = setTimeout(() => {
      void fetchBtcPrice();
      void fetchTelemetry();
      void fetchInsights();
    }, 0);

    const btcInt = setInterval(() => void fetchBtcPrice(), 8000);
    const telInt = setInterval(() => void fetchTelemetry(), 25000);
    const insInt = setInterval(() => void fetchInsights(), 60000);

    return () => {
      clearTimeout(initTimer);
      clearInterval(btcInt);
      clearInterval(telInt);
      clearInterval(insInt);
    };
  }, [fetchBtcPrice, fetchTelemetry, fetchInsights]);

  const events = telemetry?.events || [];
  const latest = events[0];

  const formatTime = (iso?: string) => {
    if (!iso) return isSpanish ? "Activo" : "Active";
    const ts = new Date(iso).getTime();
    if (isNaN(ts)) return isSpanish ? "Activo" : "Active";
    return isSpanish ? "Reciente" : "Recently";
  };

  return (
    <section className="relative -mt-4 sm:-mt-6 mb-12 z-20">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <div className="relative overflow-hidden rounded-2xl border border-border-subtle bg-bg-surface p-4 sm:px-6 sm:py-4 shadow-sm transition-all duration-200 hover:border-border-base">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
              {/* Left Column: Live Status */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative flex h-3 w-3 shrink-0 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-signal opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-signal" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-body text-xs font-bold uppercase tracking-wider text-accent-signal">
                      {isSpanish ? "Telemetría en Vivo" : "Live Telemetry"}
                    </span>
                    <span className="rounded-md bg-bg-raised px-2 py-0.5 text-[11px] font-body text-text-secondary font-medium border border-border-subtle">
                      {isSpanish ? "Watchdog Python y Cron $0/mes" : "$0/mo Python & Cron Watchdog"}
                    </span>
                  </div>
                  <p className="text-xs font-body text-text-secondary mt-0.5 truncate">
                    {latest ? (
                      <>{isSpanish ? "Tarea: " : "Task: "}<strong className="text-text-primary font-semibold">{latest.task}</strong> · <span className="font-mono text-[11px] text-text-primary font-medium">[{latest.source}]</span> ({formatTime(latest.timestamp)})</>
                    ) : (
                      isSpanish
                        ? "Pipeline serverless autónomo con monitoreo de disponibilidad 24/7"
                        : "Autonomous serverless pipeline with 24/7 uptime monitoring"
                    )}
                  </p>
                </div>
              </div>

              {/* Center + Right Group */}
              <div className="flex flex-wrap items-center justify-between xl:justify-end gap-3 pt-3 xl:pt-0 border-t xl:border-t-0 border-border-subtle">
                <BtcPriceCard
                  price={btcTicker.price}
                  changePct={btcTicker.priceChangePercent}
                  highPrice={btcTicker.highPrice}
                  lowPrice={btcTicker.lowPrice}
                  flash={priceFlash}
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
                  formatTime={formatTime}
                />
              )}
            </AnimatePresence>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
