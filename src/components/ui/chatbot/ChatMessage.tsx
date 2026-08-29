"use client";

import React, { useState } from "react";
import { User, Copy, Check, ExternalLink } from "lucide-react";
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

function renderFormattedInline(text: string) {
  const regex = /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[2] && match[3]) {
      parts.push(
        <a
          key={match.index}
          href={match[3]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline font-medium hover:opacity-80 inline-flex items-center gap-0.5 break-all"
        >
          {match[2]}
          <ExternalLink className="w-2.5 h-2.5 inline-block opacity-70 ml-0.5" />
        </a>
      );
    } else if (match[4]) {
      parts.push(
        <strong key={match.index} className="font-semibold text-text-primary">
          {match[4]}
        </strong>
      );
    } else if (match[5]) {
      parts.push(
        <code
          key={match.index}
          className="px-1.5 py-0.5 rounded bg-bg-surface font-mono text-[11px] text-accent border border-border-subtle"
        >
          {match[5]}
        </code>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

function FormattedContent({ text, isModel }: { text: string; isModel: boolean }) {
  if (!isModel) {
    return <div className="whitespace-pre-wrap break-words">{text}</div>;
  }

  const lines = text.split("\n");

  return (
    <div className="space-y-1.5 break-words">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-1" />;
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          return (
            <div key={idx} className="flex items-start gap-1.5 pl-1">
              <span className="text-accent font-bold select-none">•</span>
              <span className="flex-1 leading-relaxed">
                {renderFormattedInline(trimmed.slice(2))}
              </span>
            </div>
          );
        }
        return (
          <p key={idx} className="leading-relaxed">
            {renderFormattedInline(line)}
          </p>
        );
      })}
    </div>
  );
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
    <div className={`flex gap-2.5 items-start ${isModel ? "flex-row" : "flex-row-reverse"}`}>
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
            ? "bg-bg-raised/80 text-text-primary border-border-subtle rounded-tl-sm shadow-sm"
            : "bg-accent text-white font-medium border-accent rounded-tr-sm"
        }`}
      >
        <FormattedContent text={message.text} isModel={isModel} />

        <div className="flex items-center justify-between gap-2 mt-1.5 pt-1 border-t border-black/5 dark:border-white/5 text-[10px] opacity-70">
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

