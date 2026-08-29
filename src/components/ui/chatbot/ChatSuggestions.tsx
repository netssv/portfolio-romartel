"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { SectionId } from "@/src/lib/useActiveSection";
import { getSectionChatbotConfig } from "@/src/lib/chatbot-section-data";
import { useLanguage } from "@/src/context/LanguageContext";

interface ChatSuggestionsProps {
  sectionId?: SectionId;
  onSelect: (prompt: string) => void;
  disabled?: boolean;
}

export function ChatSuggestions({
  sectionId = "top",
  onSelect,
  disabled,
}: ChatSuggestionsProps) {
  const { isSpanish } = useLanguage();
  const config = getSectionChatbotConfig(sectionId, isSpanish);
  const suggestions = (config.suggestions || []).slice(0, 3);

  return (
    <div className="flex flex-col gap-1.5 pt-1">
      <div className="flex items-center justify-between text-[10px] text-text-muted font-mono uppercase tracking-wider px-0.5">
        <div className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-accent" />
          <span>{isSpanish ? "Acciones rápidas" : "Quick actions"}</span>
        </div>
        <span className="text-[9px] text-accent/80 font-mono lowercase tracking-normal">
          {config.sectionName}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        {suggestions.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.text}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(item.text)}
              className="flex items-center gap-2 text-left text-[11px] leading-tight bg-bg-raised/60 hover:bg-bg-raised text-text-secondary hover:text-text-primary px-2.5 py-1.5 rounded-lg border border-border-subtle hover:border-accent/40 transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none group"
            >
              <Icon className="w-3 h-3 text-accent/80 group-hover:text-accent shrink-0" />
              <span className="truncate">{item.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
