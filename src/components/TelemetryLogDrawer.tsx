"use client";

import React from "react";
import { Terminal, RefreshCw, Cpu, Sparkles, CheckCircle2, UserCheck, Info } from "lucide-react";
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
      label: "ai-synthesis",
      bg: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
      icon: <Sparkles size={11} className="text-cyan-400" />,
    };
  }
  if (s.includes("visitor") || s.includes("interactive") || s.includes("recruiter")) {
    return {
      label: "visitor-test",
      bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
      icon: <UserCheck size={11} className="text-emerald-400" />,
    };
  }
  if (s.includes("make")) {
    return {
      label: "make-cron",
      bg: "bg-purple-500/10 border-purple-500/30 text-purple-300",
      icon: <Cpu size={11} className="text-purple-400" />,
    };
  }
  return {
    label: s,
    bg: "bg-bg-surface border-border-subtle text-text-secondary",
    icon: <CheckCircle2 size={11} className="text-text-muted" />,
  };
};

export const TelemetryLogDrawer: React.FC<TelemetryLogDrawerProps> = ({
  events,
  loading,
  onRefresh,
  formatTime,
}) => (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: 0.25, ease: "easeInOut" }}
    className="mt-4 pt-4 border-t border-border-subtle"
  >
    {/* Architectural Context Note */}
    <div className="mb-3.5 flex items-start gap-2.5 rounded-xl bg-bg-raised/90 border border-border-subtle p-3 font-mono text-[11px] text-text-secondary leading-relaxed">
      <Info size={14} className="text-accent mt-0.5 shrink-0" />
      <div>
        <span className="font-semibold text-text-primary">Why this watchdog runs: </span>
        Free serverless tiers sleep after 15 minutes of idle time. To keep the live Bitcoin quantitative dashboard instantly snappy without paying monthly idle compute fees, an autonomous Make.com job checks network fees every 30 minutes to keep the FastAPI service warm at $0/mo.
      </div>
    </div>

    {/* Header */}
    <div className="flex items-center justify-between mb-2.5">
      <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
        <Terminal size={13} className="text-emerald-400" />
        <span className="font-semibold text-text-primary">Execution Buffer</span>
        <span className="text-[10px] text-text-muted">({events.length} / 15 memory slots)</span>
      </div>
      <button
        type="button"
        onClick={onRefresh}
        className="flex items-center gap-1 text-[11px] font-mono text-text-muted hover:text-emerald-400 transition-colors p-1"
        title="Refresh logs"
      >
        <RefreshCw size={11} className={loading ? "animate-spin" : ""} />
        <span>Sync</span>
      </button>
    </div>

    {/* Logs List */}
    <div className="max-h-48 overflow-y-auto space-y-2 pr-1.5 font-mono text-[11px]">
      {events.map((evt) => {
        const badge = getSourceBadge(evt.source);
        return (
          <div
            key={evt.id}
            className="flex items-start justify-between rounded-xl bg-bg-surface hover:bg-bg-surface/80 px-3.5 py-2 border border-border-subtle hover:border-border-base transition-all"
          >
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-semibold border ${badge.bg}`}>
                  {badge.icon}
                  <span>{badge.label}</span>
                </span>
                <span className="text-text-primary font-medium">{evt.task}</span>
              </div>
              {evt.details && <div className="text-text-muted text-[10px] pl-1">{evt.details}</div>}
            </div>
            <span className="text-text-muted whitespace-nowrap ml-3 text-[10px] shrink-0 font-medium">{formatTime(evt.timestamp)}</span>
          </div>
        );
      })}
    </div>
  </motion.div>
);
