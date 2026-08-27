"use client";

import React from "react";
import { Sparkles, Terminal, Mail, Activity } from "lucide-react";

interface ChatSuggestionsProps {
  onSelect: (prompt: string) => void;
  disabled?: boolean;
}

const DEFAULT_SUGGESTIONS = [
  { text: "Check live BTC mempool & telemetry", icon: Activity },
  { text: "What open-source repos are on GitHub?", icon: Terminal },
  { text: "I want to send an email to Rodrigo", icon: Mail },
  { text: "Tell me about his web infrastructure background", icon: Sparkles },
];

export function ChatSuggestions({ onSelect, disabled }: ChatSuggestionsProps) {
  return (
    <div className="flex flex-col gap-2 pt-2">
      <div className="flex items-center gap-1.5 text-xs text-text-muted font-mono uppercase tracking-wider">
        <Sparkles className="w-3.5 h-3.5 text-accent" />
        <span>Quick actions & questions</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {DEFAULT_SUGGESTIONS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.text}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(item.text)}
              className="flex items-center gap-1.5 text-left text-xs bg-bg-raised/70 hover:bg-bg-raised text-text-secondary hover:text-text-primary px-3 py-1.5 rounded-lg border border-border-subtle hover:border-border-base transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none"
            >
              <Icon className="w-3 h-3 text-accent shrink-0" />
              <span>{item.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
