"use client";

import React from "react";
import { X, RotateCcw } from "lucide-react";
import { ClippoAvatar } from "./ClippoAvatar";
import { useLanguage } from "@/src/context/LanguageContext";

interface ChatHeaderProps {
  isLoading: boolean;
  onReset: () => void;
  onClose: () => void;
}

export function ChatHeader({ isLoading, onReset, onClose }: ChatHeaderProps) {
  const { isSpanish } = useLanguage();

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-bg-raised/70 border-b border-border-subtle shrink-0">
      <div className="flex items-center gap-2.5">
        <ClippoAvatar size={28} isThinking={isLoading} />
        <div>
          <h3 className="text-xs font-semibold text-text-primary tracking-wide">Clippo</h3>
          <div className="flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isLoading ? "bg-accent animate-ping" : "bg-emerald-500 animate-pulse"
              }`}
            />
            <span className={`text-[10px] ${isLoading ? "text-accent font-medium" : "text-text-muted"}`}>
              {isLoading ? (isSpanish ? "Pensando..." : "Thinking...") : (isSpanish ? "En línea" : "Online")}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onReset}
          title={isSpanish ? "Reiniciar conversación" : "Reset conversation"}
          className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-raised transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={onClose}
          title={isSpanish ? "Cerrar chat" : "Close chat"}
          className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-raised transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
