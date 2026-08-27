"use client";

import React, { useState } from "react";
import { User, Copy, Check } from "lucide-react";
import { ClippoAvatar } from "./ClippoAvatar";

export interface MessageItem {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}

interface ChatMessageProps {
  message: MessageItem;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isModel = message.role === "model";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard write failures
    }
  };

  return (
    <div
      className={`flex gap-2.5 items-start ${
        isModel ? "flex-row" : "flex-row-reverse"
      }`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs border ${
          isModel
            ? "bg-bg-raised border-border-subtle overflow-visible"
            : "bg-bg-raised border-border-base text-text-primary"
        }`}
      >
        {isModel ? <ClippoAvatar size={26} /> : <User className="w-4 h-4" />}
      </div>

      <div
        className={`relative group max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed border ${
          isModel
            ? "bg-bg-raised/80 text-text-primary border-border-subtle rounded-tl-sm"
            : "bg-accent text-black font-medium border-accent rounded-tr-sm"
        }`}
      >
        <div className="whitespace-pre-wrap break-words">{message.text}</div>

        <div className="flex items-center justify-between gap-2 mt-1 pt-1 border-t border-black/5 dark:border-white/5 text-[10px] opacity-70">
          <span>{message.timestamp}</span>
          {isModel && (
            <button
              type="button"
              onClick={handleCopy}
              title="Copy message"
              className="hover:opacity-100 transition-opacity p-0.5 rounded"
            >
              {copied ? (
                <Check className="w-3 h-3 text-green-500" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
