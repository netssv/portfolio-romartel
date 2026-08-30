"use client";

import React from "react";
import { Activity } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";

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

const sentimentEsMap: Record<string, string> = {
  "Extreme Greed": "Codicia Ext.",
  "Greed": "Codicia",
  "Neutral": "Neutral",
  "Fear": "Miedo",
  "Extreme Fear": "Miedo Ext.",
};

export const BtcPriceCard: React.FC<BtcPriceCardProps> = ({
  price,
  changePct,
  highPrice,
  lowPrice,
  flash,
  sentiment,
}) => {
  const { isSpanish } = useLanguage();
  const isPositive = changePct >= 0;

  const getSentimentLabel = (cls?: string) => {
    if (!cls) return "";
    if (!isSpanish) return cls;
    return sentimentEsMap[cls] || cls;
  };

  return (
    <div
      className={`flex items-center gap-2 rounded-xl px-2.5 sm:px-3 py-1.5 border transition-all duration-200 shrink-0 ${
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
          <span
            className={`font-mono text-[10px] font-bold ${
              isPositive ? "text-emerald-text" : "text-accent-signal"
            }`}
          >
            {isPositive ? "+" : ""}
            {changePct.toFixed(2)}%
          </span>
        </div>
        <span className="font-mono text-xs sm:text-sm font-bold tracking-tight text-text-primary whitespace-nowrap">
          {price > 0
            ? `$${price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`
            : isSpanish ? "Sincronizando..." : "Syncing..."}
        </span>
      </div>

      {sentiment && (
        <div className="hidden lg:flex flex-col pl-2 border-l border-border-subtle text-[9px] font-mono leading-tight">
          <span className="text-text-muted">{isSpanish ? "Sentimiento" : "Sentiment"}</span>
          <span className="font-bold text-text-primary whitespace-nowrap">
            {sentiment.fearGreed} ({getSentimentLabel(sentiment.classification)})
          </span>
        </div>
      )}

      {highPrice > 0 && (
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

