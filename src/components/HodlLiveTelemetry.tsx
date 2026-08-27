"use client";

import React, { useState, useEffect } from "react";
import { Activity, Terminal, ChevronDown, ChevronUp, RefreshCw, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TelemetryEvent {
  id: number;
  timestamp: string;
  source: string;
  task: string;
  status: string;
  details?: string;
}

interface TelemetryData {
  status: string;
  service: string;
  server_time: string;
  count: number;
  events: TelemetryEvent[];
}

export const HodlLiveTelemetry: React.FC = () => {
  const [data, setData] = useState<TelemetryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const fetchTelemetry = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://hodl-watcher-api.onrender.com/api/telemetry/logs?_t=${Date.now()}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch {
      // Graceful offline fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 30000);
    return () => clearInterval(interval);
  }, []);

  const isOnline = data?.status === "online";
  const events = data?.events || [];
  const latestEvent = events[0];

  const formatTime = (iso: string) => {
    const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
    if (diff < 60) return `just now`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <div className="mt-3 mb-4 rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-3 backdrop-blur-sm transition-all duration-300">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            {isOnline && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            )}
            <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${isOnline ? "bg-emerald-500" : "bg-amber-500"}`} />
          </span>
          <div className="flex flex-col">
            <span className="text-[11px] font-mono font-bold tracking-tight text-emerald-400">
              {isOnline ? "LIVE PIPELINE ACTIVE" : "CONNECTING TO RENDER..."}
            </span>
            <span className="text-[10px] font-mono text-zinc-400">
              {latestEvent ? `${latestEvent.source} · ${latestEvent.task} (${formatTime(latestEvent.timestamp)})` : "Cloud Keep-Alive Active"}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] font-mono font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-colors"
        >
          <Terminal size={11} />
          <span>{isOpen ? "Hide Feed" : "Live Logs"}</span>
          {isOpen ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2.5 pt-2.5 border-t border-emerald-500/15"
          >
            <div className="flex items-center justify-between mb-1.5 text-[10px] font-mono text-zinc-400">
              <span className="flex items-center gap-1 text-emerald-400/90 font-semibold">
                <Cpu size={10} /> Automation Telemetry Buffer
              </span>
              <button
                type="button"
                onClick={fetchTelemetry}
                className="hover:text-emerald-300 transition-colors"
                title="Refresh logs"
              >
                <RefreshCw size={10} className={loading ? "animate-spin" : ""} />
              </button>
            </div>

            <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 font-mono text-[10px]">
              {events.length === 0 ? (
                <div className="text-zinc-500 py-1">No execution logs recorded yet.</div>
              ) : (
                events.map((evt) => (
                  <div
                    key={evt.id}
                    className="flex items-start justify-between rounded bg-zinc-950/60 px-2 py-1 border border-zinc-800/60"
                  >
                    <div>
                      <span className="text-purple-400 font-semibold">[{evt.source}]</span>{" "}
                      <span className="text-zinc-200">{evt.task}</span>
                      {evt.details && <div className="text-zinc-400 text-[9px]">{evt.details}</div>}
                    </div>
                    <span className="text-zinc-500 whitespace-nowrap ml-2">{formatTime(evt.timestamp)}</span>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
