"use client";

import React from "react";
import { Terminal, RefreshCw, Cpu, Sparkles, CheckCircle2, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

export interface TelemetryEvent {
  id: number;
  timestamp: string;
  source: string;
  task: string;
  status: string;
  details?: string;
}

interface TelemetryLogDrawerProps {
  events: TelemetryEvent[];
  loading: boolean;
  onRefresh: () => void;
  formatTime: (iso?: string) => string;
}

const getSourceBadge = (source: string) => {
  const s = source.toLowerCase();
  if (s.includes("ai") || s.includes("synthesizer")) {
    return {
      bg: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
      icon: <Sparkles size={11} className="text-cyan-400" />,
    };
  }
  if (s.includes("recruiter") || s.includes("interactive")) {
    return {
      bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
      icon: <UserCheck size={11} className="text-emerald-400" />,
    };
  }
  if (s.includes("make")) {
    return {
      bg: "bg-purple-500/10 border-purple-500/30 text-purple-300",
      icon: <Cpu size={11} className="text-purple-400" />,
    };
  }
  return {
    bg: "bg-zinc-800 border-zinc-700 text-zinc-300",
    icon: <CheckCircle2 size={11} className="text-zinc-400" />,
  };
};

export const TelemetryLogDrawer: React.FC<TelemetryLogDrawerProps> = ({
  events,
  loading,
  onRefresh,
  formatTime,
}) => {
  const latestAiEvent = events.find((e) =>
    e.source.toLowerCase().includes("ai") || (e.details && e.details.toLowerCase().includes("ai"))
  );

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="mt-4 pt-4 border-t border-zinc-800/80"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Terminal size={13} className="text-emerald-400" />
          <span className="font-mono text-xs font-semibold text-zinc-200">
            Cloud Execution Log Buffer
          </span>
          <span className="font-mono text-[10px] text-zinc-500">
            ({events.length} events recorded)
          </span>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-emerald-400 transition-colors p-1"
          title="Refresh telemetry"
        >
          <RefreshCw size={11} className={loading ? "animate-spin" : ""} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Featured AI Insight Pill if present */}
      {latestAiEvent && latestAiEvent.details && (
        <div className="mb-3 flex items-start gap-2 rounded-xl bg-cyan-950/30 border border-cyan-500/25 p-2.5 font-mono text-[11px] text-cyan-200">
          <Sparkles size={13} className="text-cyan-400 mt-0.5 shrink-0" />
          <div>
            <span className="font-bold text-cyan-300">Latest AI Synthesis:</span>{" "}
            <span>{latestAiEvent.details}</span>
          </div>
        </div>
      )}

      {/* Logs Scroll List */}
      <div className="max-h-48 overflow-y-auto space-y-2 pr-1.5 font-mono text-[11px] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-zinc-950 [&::-webkit-scrollbar-thumb]:bg-zinc-800 [&::-webkit-scrollbar-thumb]:rounded-full">
        {events.length === 0 ? (
          <div className="rounded-lg bg-zinc-900/60 p-3 text-zinc-400 border border-zinc-800/60">
            Awaiting incoming telemetry dispatches...
          </div>
        ) : (
          events.map((evt) => {
            const badge = getSourceBadge(evt.source);
            return (
              <div
                key={evt.id}
                className="group flex items-start justify-between rounded-xl bg-zinc-900/80 hover:bg-zinc-900 px-3.5 py-2.5 border border-zinc-800/80 hover:border-zinc-700 transition-all"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-semibold border ${badge.bg}`}
                    >
                      {badge.icon}
                      <span>{evt.source}</span>
                    </span>
                    <span className="text-zinc-200 font-medium">{evt.task}</span>
                  </div>
                  {evt.details && (
                    <div className="text-zinc-400 text-[10px] pl-1">
                      {evt.details}
                    </div>
                  )}
                </div>
                <span className="text-zinc-500 whitespace-nowrap ml-3 text-[10px] shrink-0 font-medium">
                  {formatTime(evt.timestamp)}
                </span>
              </div>
            );
          })
        )}
      </div>
    </motion.div>
  );
};
