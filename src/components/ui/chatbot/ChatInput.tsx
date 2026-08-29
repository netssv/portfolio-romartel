"use client";

import React, { forwardRef } from "react";
import { Send, Loader2 } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";

interface ChatInputProps {
  input: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const ChatInput = forwardRef<HTMLInputElement, ChatInputProps>(
  ({ input, onChange, onSubmit, isLoading }, ref) => {
    const { isSpanish } = useLanguage();

    return (
      <form
        onSubmit={onSubmit}
        className="p-3 bg-bg-raised/70 border-t border-border-subtle flex items-center gap-2 shrink-0"
      >
        <input
          ref={ref}
          type="text"
          value={input}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            isSpanish
              ? "Pregunta sobre sistemas, automatizaciones o experiencia..."
              : "Ask about systems, automations, or experience..."
          }
          disabled={isLoading}
          className="flex-1 bg-bg-surface border border-border-base rounded-xl px-3 py-2 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-all"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-2 rounded-xl bg-accent text-white hover:bg-accent-hover disabled:opacity-40 transition-colors cursor-pointer"
          title={isSpanish ? "Enviar mensaje" : "Send message"}
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </form>
    );
  }
);

ChatInput.displayName = "ChatInput";
