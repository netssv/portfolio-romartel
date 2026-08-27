"use client";

import React, { useState, useRef, useEffect, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, RotateCcw, Loader2 } from "lucide-react";
import { ChatMessage, MessageItem } from "./ChatMessage";
import { ChatSuggestions } from "./ChatSuggestions";
import { ClippoAvatar } from "./ClippoAvatar";
import { ClippoFloatingTrigger } from "./ClippoFloatingTrigger";

const INITIAL_MESSAGE: MessageItem = {
  id: "init-1",
  role: "model",
  text: "It looks like you're exploring Rodrigo's portfolio! I'm Clippo. Ask me anything about his technical background, web hosting operations, data analytics, or featured projects.",
  timestamp: "Just now",
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageItem[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, messages]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend ?? input).trim();
    if (!query || isPending) return;

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: MessageItem = { id: `u-${Date.now()}`, role: "user", text: query, timestamp: time };
    const updatedHistory = [...messages, userMsg];

    setMessages(updatedHistory);
    setInput("");
    setError(null);

    startTransition(async () => {
      try {
        const payload = updatedHistory.map((m) => ({ role: m.role, text: m.text }));
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: payload }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to retrieve response");

        const botMsg: MessageItem = {
          id: `m-${Date.now()}`,
          role: "model",
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, botMsg]);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Something went wrong.";
        setError(msg);
      }
    });
  };

  const handleReset = () => {
    setMessages([INITIAL_MESSAGE]);
    setError(null);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end print:hidden">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-[calc(100vw-2.5rem)] sm:w-[380px] h-[520px] max-h-[80vh] flex flex-col bg-bg-surface border border-border-base rounded-2xl shadow-2xl overflow-hidden mb-3"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-bg-raised/70 border-b border-border-subtle">
              <div className="flex items-center gap-2.5">
                <ClippoAvatar size={28} isThinking={isPending} />
                <div>
                  <h3 className="text-xs font-semibold text-text-primary tracking-wide">Clippo</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-text-muted">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleReset}
                  title="Reset conversation"
                  className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-raised transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-raised transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}

              {isPending && (
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <ClippoAvatar size={20} isThinking />
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-accent" />
                  <span>Clippo is thinking...</span>
                </div>
              )}

              {error && (
                <div className="text-xs text-red-500 bg-red-500/10 p-2.5 rounded-lg border border-red-500/20">
                  {error}
                </div>
              )}

              {messages.length === 1 && (
                <ChatSuggestions onSelect={(prompt) => handleSend(prompt)} disabled={isPending} />
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t border-border-subtle bg-bg-raised/30 flex gap-2 items-center"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Clippo about Rodrigo..."
                disabled={isPending}
                className="flex-1 text-xs sm:text-sm bg-bg-surface border border-border-subtle focus:border-accent text-text-primary placeholder:text-text-muted px-3 py-2 rounded-xl focus:outline-none transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isPending || !input.trim()}
                className="p-2 bg-accent text-black rounded-xl hover:opacity-90 disabled:opacity-40 disabled:hover:opacity-40 transition-opacity shrink-0 font-medium"
                title="Send message"
              >
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger with Speech Bubble & Clippo */}
      <ClippoFloatingTrigger
        isOpen={isOpen}
        onToggle={() => setIsOpen((prev) => !prev)}
      />
    </div>
  );
}
