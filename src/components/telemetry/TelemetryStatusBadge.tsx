"use client";

import React from "react";
import { TelemetryStatus } from "@/src/components/BtcPriceCard";
import { formatTimeAgo, formatEventTime } from "@/src/lib/telemetryFormat";
import { TelemetryEvent } from "@/src/components/TelemetryLogDrawer";

interface TelemetryStatusBadgeProps {
  status: TelemetryStatus;
  isSpanish: boolean;
  latestEvent?: TelemetryEvent;
  lastRealDataTimestamp?: string | null;
}

export const TelemetryStatusBadge: React.FC<TelemetryStatusBadgeProps> = ({
  status,
  isSpanish,
  latestEvent,
  lastRealDataTimestamp,
}) => {
  const renderIndicator = () => {
    if (status === "waking_up") {
      return (
        <>
          <div className="relative flex h-3 w-3 shrink-0 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
          </div>
          <span className="font-body text-xs font-bold uppercase tracking-wider text-amber-500">
            {isSpanish ? "Iniciando..." : "Waking Up"}
          </span>
        </>
      );
    }
    if (status === "offline") {
      return (
        <>
          <div className="relative flex h-3 w-3 shrink-0 items-center justify-center">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-text-muted" />
          </div>
          <span className="font-body text-xs font-bold uppercase tracking-wider text-text-muted">
            {isSpanish ? "Fuera de Línea" : "Offline"}
          </span>
        </>
      );
    }
    return (
      <>
        <div className="relative flex h-3 w-3 shrink-0 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-success opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-signal-success" />
        </div>
        <span className="font-body text-xs font-bold uppercase tracking-wider text-emerald-text">
          {isSpanish ? "Telemetría en Vivo" : "Live Telemetry"}
        </span>
      </>
    );
  };

  const renderDescription = () => {
    const lastSeen = lastRealDataTimestamp ? ` (${formatTimeAgo(lastRealDataTimestamp, isSpanish)})` : "";
    if (status === "waking_up") {
      return isSpanish
        ? `Servicio upstream no disponible, posiblemente iniciando...${lastSeen}`
        : `Upstream service unavailable, possibly initializing...${lastSeen}`;
    }
    if (status === "offline") {
      return isSpanish
        ? `Servicio upstream no disponible o fuera de línea${lastSeen}`
        : `Upstream service unreachable or offline${lastSeen}`;
    }
    if (latestEvent) {
      return (
        <>
          {isSpanish ? "Tarea: " : "Task: "}
          <strong className="text-text-primary font-semibold">{latestEvent.task}</strong> ·{" "}
          <span className="font-mono text-[11px] text-text-primary font-medium">[{latestEvent.source}]</span>{" "}
          ({formatEventTime(latestEvent.timestamp, isSpanish)})
        </>
      );
    }
    return isSpanish
      ? "Pipeline serverless autónomo con monitoreo de disponibilidad 24/7"
      : "Autonomous serverless pipeline with 24/7 uptime monitoring";
  };

  return (
    <div className="flex items-center gap-3 min-w-0">
      {renderIndicator()}
      <div className="min-w-0">
        <span className="rounded-md bg-bg-raised px-2 py-0.5 text-[11px] font-body text-text-secondary font-medium border border-border-subtle">
          {isSpanish ? "Watchdog Python y Cron $0/mes" : "$0/mo Python & Cron Watchdog"}
        </span>
        <p className="text-xs font-body text-text-secondary mt-0.5 truncate">{renderDescription()}</p>
      </div>
    </div>
  );
};
