"use client";

import React from "react";
import { Zap } from "lucide-react";

interface BtcPriceCardProps {
  price: number;
  changePct: number;
  highPrice: number;
  lowPrice: number;
  flash: "up" | "down" | null;
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
  sentiment,
}) => {
  const isPositive = changePct >= 0;

  return (
    <div
      className={`flex items-center gap-2.5 rounded-xl px-3 py-1.5 border transition-all duration-300 ${
        flash === "up"
          ? "bg-emerald-500/20 border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
          : flash === "down"
          ? "bg-rose-500/20 border-rose-500/50 shadow-[0_0_12px_rgba(244,63,94,0.2)]"
          : "bg-bg-raised border-border-subtle"
      }`}
    >
      <Zap size={14} className="text-amber-600 dark:text-amber-400 shrink-0" />
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[9px] font-bold text-text-muted uppercase">BTC</span>
          <span className={`font-mono text-[10px] font-bold ${isPositive ? "text-emerald-text" : "text-rose-700 dark:text-rose-400"}`}>
            {isPositive ? "+" : ""}{changePct.toFixed(2)}%
          </span>
        </div>
        <span className="font-mono text-xs sm:text-sm font-extrabold tracking-tight text-text-primary whitespace-nowrap">
          {price > 0 ? `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "Syncing..."}
        </span>
      </div>

      {sentiment && (
        <div className="hidden lg:flex flex-col pl-2.5 border-l border-border-subtle text-[9px] font-mono leading-tight">
          <span className="text-text-muted">Sentiment</span>
          <span className="font-bold text-amber-700 dark:text-amber-400">
            {sentiment.fearGreed} ({sentiment.classification})
          </span>
        </div>
      )}

      {highPrice > 0 && (
        <div className="hidden md:flex flex-col pl-2 border-l border-border-subtle text-[9px] font-mono text-text-muted leading-tight">
          <span>H: <strong className="text-text-secondary">${highPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong></span>
          <span>L: <strong className="text-text-secondary">${lowPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong></span>
        </div>
      )}
    </div>
  );
};
