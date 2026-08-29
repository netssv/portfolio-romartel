"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, RotateCcw, Loader2, RefreshCw } from "lucide-react";
import { ChatMessage, MessageItem } from "./ChatMessage";
import { ChatSuggestions } from "./ChatSuggestions";
import { ClippoAvatar } from "./ClippoAvatar";
import { ClippoFloatingTrigger } from "./ClippoFloatingTrigger";
import { useActiveSection } from "@/src/lib/useActiveSection";
import { useVisitorContext } from "@/src/lib/useVisitorContext";

const DEFAULT_INITIAL_MESSAGE: MessageItem = {
  id: "init-1",
  role: "model",
  text: "Hello! I am Clippo, the interactive assistant for Rodrigo Martel's portfolio. Ask me about his workflow automations, projects, or technical credentials.",
  timestamp: "Just now",
};

export function ChatBot() {
  const activeSection = useActiveSection();
  const { context: visitorContext, greeting } = useVisitorContext();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      ...DEFAULT_INITIAL_MESSAGE,
      text: greeting || DEFAULT_INITIAL_MESSAGE.text,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [isOpen, messages]);

  useEffect(() => {
    const handleContactOpen = () => {
      setIsOpen(true);
      setMessages((prev) => {
        const contactMsg: MessageItem = {
          id: `contact-${Date.now()}`,
          role: "model",
          text: "I see you would like to reach Rodrigo! Feel free to share your name, email, and a message here, and I will deliver it straight to his inbox.",
          timestamp: "Just now",
        };
        return [...prev, contactMsg];
      });
      setTimeout(() => inputRef.current?.focus(), 150);
    };

    window.addEventListener("open-clippo-contact", handleContactOpen);
    return () => window.removeEventListener("open-clippo-contact", handleContactOpen);
  }, []);

  const dispatchChat = async (history: MessageItem[]) => {
    setError(null);
    setIsLoading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000);

    try {
      const payload = history.map((m) => ({ role: m.role, text: m.text }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: payload,
          currentSection: activeSection,
          visitorContext: visitorContext || undefined,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to retrieve response");

      const botMsg: MessageItem = {
        id: `m-${Date.now()}`,
        role: "model",
        text: data.reply || "I am here to assist. How can I help?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      const isAbort = err instanceof DOMException && err.name === "AbortError";
      setError(isAbort ? "Response timed out. Please try again." : err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = (textToSend?: string) => {
    const query = (textToSend ?? input).trim();
    if (!query || isLoading) return;
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const updated = [...messages, { id: `u-${Date.now()}`, role: "user" as const, text: query, timestamp: time }];
    setMessages(updated);
    setInput("");
    dispatchChat(updated);
  };

  const handleReset = () => {
    setMessages([{ ...DEFAULT_INITIAL_MESSAGE, text: greeting || DEFAULT_INITIAL_MESSAGE.text }]);
    setError(null);
    setInput("");
    setIsLoading(false);
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
            data-lenis-prevent
            className="w-[calc(100vw-2.5rem)] sm:w-[380px] h-[520px] max-h-[80vh] flex flex-col bg-bg-surface border border-border-base rounded-2xl shadow-2xl overflow-hidden mb-3 overscroll-contain"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-bg-raised/70 border-b border-border-subtle shrink-0">
              <div className="flex items-center gap-2.5">
                <ClippoAvatar size={28} isThinking={isLoading} />
                <div>
                  <h3 className="text-xs font-semibold text-text-primary tracking-wide">Clippo</h3>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${isLoading ? "bg-accent animate-ping" : "bg-emerald-500 animate-pulse"}`} />
                    <span className={`text-[10px] ${isLoading ? "text-accent font-medium" : "text-text-muted"}`}>{isLoading ? "Thinking..." : "Online"}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button type="button" onClick={handleReset} title="Reset conversation" className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-raised transition-colors"><RotateCcw className="w-3.5 h-3.5" /></button>
                <button type="button" onClick={() => setIsOpen(false)} title="Close chat" className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-raised transition-colors"><X className="w-4 h-4" /></button>
              </div>
            </div>

            {/* Message Area */}
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
                    onClick={() => !isLoading && messages.length > 0 && dispatchChat(messages)}
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
                  onSelect={(prompt) => handleSend(prompt)}
                  disabled={isLoading}
                />
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 bg-bg-raised/70 border-t border-border-subtle flex items-center gap-2 shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about systems, automations, or experience..."
                disabled={isLoading}
                className="flex-1 bg-bg-surface border border-border-base rounded-xl px-3 py-2 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 rounded-xl bg-accent text-white hover:bg-accent-hover disabled:opacity-40 transition-colors cursor-pointer"
                title="Send message"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <ClippoFloatingTrigger
          isOpen={isOpen}
          onToggle={() => setIsOpen(true)}
          isThinking={isLoading}
          sectionId={activeSection}
        />
      )}
    </div>
  );
}
