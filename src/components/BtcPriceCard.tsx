"use client";

import React from "react";
import { Zap } from "lucide-react";

interface BtcPriceCardProps {
  price: number;
  changePct: number;
  highPrice: number;
  lowPrice: number;
  flash: "up" | "down" | null;
}

export const BtcPriceCard: React.FC<BtcPriceCardProps> = ({
  price,
  changePct,
  highPrice,
  lowPrice,
  flash,
}) => {
  const isPositive = changePct >= 0;

  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex items-center gap-2 rounded-xl px-3 py-1.5 border transition-all duration-300 ${
          flash === "up"
            ? "bg-emerald-500/20 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
            : flash === "down"
            ? "bg-rose-500/20 border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.25)]"
            : "bg-zinc-900/90 border-zinc-800"
        }`}
      >
        <Zap size={13} className="text-amber-400 shrink-0" />
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[9px] font-bold text-zinc-400 uppercase">
              BTC/USDT
            </span>
            <span
              className={`font-mono text-[10px] font-bold ${
                isPositive ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {isPositive ? "+" : ""}
              {changePct.toFixed(2)}%
            </span>
          </div>
          <span className="font-mono text-sm font-extrabold tracking-tight text-zinc-100">
            {price > 0
              ? `$${price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`
              : "Syncing..."}
          </span>
        </div>
      </div>

      {highPrice > 0 && (
        <div className="hidden sm:flex flex-col justify-center rounded-xl bg-zinc-900/90 px-2.5 py-1.5 border border-zinc-800 font-mono text-[10px]">
          <div className="flex items-center gap-1 text-zinc-400">
            <span>24h H:</span>
            <span className="text-zinc-200 font-semibold">
              ${highPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
          </div>
          <div className="flex items-center gap-1 text-zinc-400">
            <span>24h L:</span>
            <span className="text-zinc-200 font-semibold">
              ${lowPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
