"use client";

import React from "react";
import { Sparkles, Moon, Sun, Languages } from "lucide-react";
import { SectionId } from "@/src/lib/useActiveSection";
import { getSectionChatbotConfig } from "@/src/lib/chatbot-section-data";
import { useLanguage } from "@/src/context/LanguageContext";
import { useDesign } from "@/src/context/DesignContext";

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
  const { theme } = useDesign();
  const config = getSectionChatbotConfig(sectionId, isSpanish);
  const suggestions = (config.suggestions || []).slice(0, 3);

  return (
    <div className="flex flex-col gap-2 pt-1">
      {/* Quick controls: Tone & Language */}
      <div className="grid grid-cols-2 gap-1.5">
        <button
          type="button"
          disabled={disabled}
          onClick={() =>
            onSelect(
              isSpanish
                ? (theme === "night" ? "Cambiar a tono claro" : "Activar tono nocturno")
                : (theme === "night" ? "Switch to light mode" : "Activate dark mode")
            )
          }
          className="flex items-center gap-1.5 text-left text-[11px] leading-tight bg-bg-raised/80 hover:bg-bg-raised text-text-secondary hover:text-text-primary px-2.5 py-1.5 rounded-lg border border-border-subtle hover:border-accent/40 transition-colors duration-150 disabled:opacity-50 cursor-pointer"
        >
          {theme === "night" ? (
            <Sun className="w-3.5 h-3.5 text-accent shrink-0" />
          ) : (
            <Moon className="w-3.5 h-3.5 text-accent shrink-0" />
          )}
          <span className="truncate">
            {isSpanish
              ? (theme === "night" ? "Tono claro" : "Tono nocturno")
              : (theme === "night" ? "Light mode" : "Dark mode")}
          </span>
        </button>

        <button
          type="button"
          disabled={disabled}
          onClick={() =>
            onSelect(
              isSpanish ? "Cambiar idioma a inglés" : "Switch language to Spanish"
            )
          }
          className="flex items-center gap-1.5 text-left text-[11px] leading-tight bg-bg-raised/80 hover:bg-bg-raised text-text-secondary hover:text-text-primary px-2.5 py-1.5 rounded-lg border border-border-subtle hover:border-accent/40 transition-colors duration-150 disabled:opacity-50 cursor-pointer"
        >
          <Languages className="w-3.5 h-3.5 text-accent shrink-0" />
          <span className="truncate">
            {isSpanish ? "Cambiar a inglés" : "Switch to Spanish"}
          </span>
        </button>
      </div>
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
