"use client";

import React, { RefObject } from "react";
import { RefreshCw } from "lucide-react";
import { ChatMessage, MessageItem } from "./ChatMessage";
import { ChatSuggestions } from "./ChatSuggestions";
import { ClippoAvatar } from "./ClippoAvatar";
import { SectionId } from "@/src/lib/useActiveSection";

interface ChatMessageListProps {
  messages: MessageItem[];
  isLoading: boolean;
  error: string | null;
  activeSection: SectionId;
  onSend: (text: string) => void;
  onRetry: () => void;
  messagesEndRef: RefObject<HTMLDivElement | null>;
}

export function ChatMessageList({
  messages,
  isLoading,
  error,
  activeSection,
  onSend,
  onRetry,
  messagesEndRef,
}: ChatMessageListProps) {
  return (
    <div data-lenis-prevent className="flex-1 overflow-y-auto p-4 space-y-3.5 overscroll-contain">
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}

      {isLoading && (
        <div className="flex gap-2.5 items-start">
          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs border bg-bg-raised border-border-subtle overflow-visible">
            <ClippoAvatar size={26} isThinking />
          </div>
          <div className="relative max-w-[85%] rounded-2xl rounded-tl-sm px-3.5 py-2.5 bg-bg-raised/80 border border-border-subtle shadow-xs flex items-center gap-2 text-xs">
            <span className="text-text-muted font-medium">Thinking</span>
            <span className="flex gap-1 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: "300ms" }} />
            </span>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-between gap-2 text-xs text-accent-signal bg-accent-signal/10 p-2.5 rounded-xl border border-accent-signal/20">
          <span className="truncate">{error}</span>
          <button
            type="button"
            onClick={onRetry}
            disabled={isLoading}
            className="flex items-center gap-1 shrink-0 font-medium text-accent hover:underline transition-colors cursor-pointer"
            title="Retry message"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Retry</span>
          </button>
        </div>
      )}

      {messages.length === 1 && (
        <ChatSuggestions
          sectionId={activeSection}
          onSelect={onSend}
          disabled={isLoading}
        />
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
