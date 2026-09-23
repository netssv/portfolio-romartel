"use client";

import React from "react";
import { Activity } from "lucide-react";

export type TelemetryStatus = "live" | "waking_up" | "offline" | "loading";

interface BtcPriceCardProps {
  price: number;
  changePct: number;
  highPrice: number;
  lowPrice: number;
  flash: "up" | "down" | null;
  status?: TelemetryStatus;
  lastUpdatedLabel?: string | null;
  sentiment?: {
    fearGreed: number;
    classification: string;
  } | null;
}

export const BtcPriceCard: React.FC<BtcPriceCardProps> = ({
  price,
  changePct,
  highPrice,
  lowPrice,
  flash,
  status = "loading",
  lastUpdatedLabel,
  sentiment,
}) => {
  const isPositive = changePct >= 0;
  const isColdLoad = price === 0 || status === "loading";

  const getStatusBadge = () => {
    if (status === "waking_up") {
      return (
        <span className="rounded bg-amber-500/15 border border-amber-500/30 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-amber-500 uppercase tracking-tight">
          Waking up
        </span>
      );
    }
    if (status === "offline") {
      return (
        <span className="rounded bg-accent-signal/15 border border-accent-signal/30 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-accent-signal uppercase tracking-tight">
          Offline
        </span>
      );
    }
    return null;
  };

  return (
    <div
      className={`flex items-center gap-2.5 rounded-xl px-3 py-1.5 border transition-all duration-200 ${
        flash === "up"
          ? "bg-signal-success/15 border-signal-success/40"
          : flash === "down"
          ? "bg-accent-signal/15 border-accent-signal/40"
          : "bg-bg-raised border-border-subtle"
      }`}
    >
      <Activity size={14} className="text-accent shrink-0" />
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[9px] font-bold text-text-muted uppercase">BTC</span>
          {isColdLoad ? (
            <span className="inline-block h-2.5 w-10 rounded bg-border-subtle/80 animate-pulse" />
          ) : (
            <span
              className={`font-mono text-[10px] font-bold ${
                isPositive ? "text-emerald-text" : "text-accent-signal"
              }`}
            >
              {isPositive ? "+" : ""}
              {changePct.toFixed(2)}%
            </span>
          )}
          {getStatusBadge()}
        </div>

        {isColdLoad ? (
          <div className="h-4 w-16 my-0.5 rounded bg-border-subtle/80 animate-pulse" />
        ) : (
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-xs sm:text-sm font-bold tracking-tight text-text-primary whitespace-nowrap">
              {`$${price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
            </span>
            {lastUpdatedLabel && status !== "live" && (
              <span className="font-mono text-[9px] text-text-muted truncate max-w-[120px]">
                ({lastUpdatedLabel})
              </span>
            )}
          </div>
        )}
      </div>

      {sentiment && !isColdLoad && (
        <div className="hidden lg:flex flex-col pl-2.5 border-l border-border-subtle text-[9px] font-mono leading-tight">
          <span className="text-text-muted">Sentiment</span>
          <span className="font-bold text-text-primary">
            {sentiment.fearGreed} ({sentiment.classification})
          </span>
        </div>
      )}

      {highPrice > 0 && !isColdLoad && (
        <div className="hidden md:flex flex-col pl-2 border-l border-border-subtle text-[9px] font-mono text-text-muted leading-tight">
          <span>
            H: <strong className="text-text-secondary">${highPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>
          </span>
          <span>
            L: <strong className="text-text-secondary">${lowPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>
          </span>
        </div>
      )}
    </div>
  );
};
