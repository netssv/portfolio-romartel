"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { CornerDownLeft, RotateCcw, Loader2 } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";
import { ClippoAvatar } from "@/src/components/ui/chatbot/ClippoAvatar";
import { useContainerScrollTrap } from "@/src/lib/useContainerScrollTrap";

interface TerminalMessage {
  id: string;
  role: "model" | "user";
  text: string;
}

export const ContactTerminal: React.FC = () => {
  const { t, isSpanish } = useLanguage();
  const [messages, setMessages] = useState<TerminalMessage[]>([
    { id: "init", role: "model", text: t.contact.terminalGreeting },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { containerRef: scrollRef, scrollTrapProps } = useContainerScrollTrap<HTMLDivElement>();

  useEffect(() => {
    setMessages((prev) => (prev.length === 1 && prev[0].id.startsWith("init")
      ? [{ id: prev[0].id, role: "model", text: t.contact.terminalGreeting }]
      : prev));
  }, [t.contact.terminalGreeting]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading, scrollRef]);

  const handleSendQuery = async (queryText: string) => {
    const text = queryText.trim();
    if (!text || isLoading) return;

    const userMsg: TerminalMessage = { id: `u-${Date.now()}`, role: "user", text };
    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextHistory.map((m) => ({ role: m.role, text: m.text })),
          currentSection: "contact",
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { id: `m-${Date.now()}`, role: "model", text: data.reply || (isSpanish ? "Estoy a tu servicio." : "I am here to assist.") },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "model",
          text: isSpanish
            ? "Pausa temporal con el servicio de IA. Puedes escribirme directo al correo o por WhatsApp."
            : "Temporary AI timeout. Feel free to contact Rodrigo directly via email or WhatsApp.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChipClick = (prompt: string, idx: number) => {
    if (idx === 0) return window.dispatchEvent(new CustomEvent("open-clippo-schedule"));
    if (idx === 1) return window.open("https://api.whatsapp.com/send/?phone=50378748247", "_blank");
    if (idx === 2) return window.open("https://mail.google.com/mail/?view=cm&fs=1&to=rop.martel@gmail.com", "_blank");
    handleSendQuery(prompt);
  };

  const handleReset = () => {
    setMessages([{ id: `init-${Date.now()}`, role: "model", text: t.contact.terminalGreeting }]);
    setInput("");
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl border border-border-base bg-bg-surface/90 shadow-2xl p-6 sm:p-7 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between">
      {/* Top Bar with Clippo Integration */}
      <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 18 }}
            className="w-8 h-8 flex items-center justify-center shrink-0 cursor-pointer"
            whileHover={{ scale: 1.15, rotate: 6 }}
            whileTap={{ scale: 0.95 }}
          >
            <ClippoAvatar size={32} isThinking={isLoading} />
          </motion.div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-xs font-bold text-emerald-500 tracking-wider">
              {t.contact.terminalStatus}
            </span>
            <span className="text-text-muted text-xs font-mono">·</span>
            <span className="text-xs font-mono font-medium text-text-primary">
              {t.contact.terminalBadge}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="text-text-muted hover:text-text-primary p-1.5 rounded-lg hover:bg-bg-raised transition-colors cursor-pointer"
          title={isSpanish ? "Reiniciar conversación" : "Reset conversation"}
        >
          <RotateCcw size={13} />
        </button>
      </div>

      {/* Terminal Conversation Body with Wheel Scroll Trap */}
      <div
        ref={scrollRef}
        {...scrollTrapProps}
        className="space-y-3.5 max-h-[290px] overflow-y-auto pr-1 no-scrollbar text-xs font-mono overscroll-contain"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 rounded-2xl leading-relaxed ${
              msg.role === "user"
                ? "bg-accent/15 text-accent border border-accent/25 ml-8"
                : "bg-bg-raised/70 text-text-secondary border border-border-subtle mr-4"
            }`}
          >
            <span className="text-[10px] block opacity-60 font-mono uppercase mb-0.5">
              {msg.role === "user" ? "You" : "Clippo"}
            </span>
            <p className="font-body text-xs sm:text-[13px] text-text-primary leading-relaxed whitespace-pre-wrap">
              {msg.text}
            </p>
          </div>
        ))}

        {isLoading && (
          <div className="p-3 rounded-2xl bg-bg-raised/70 border border-border-subtle mr-4 flex items-center gap-2 text-text-muted">
            <Loader2 size={13} className="animate-spin text-accent" />
            <span className="font-mono text-xs">{isSpanish ? "Pensando..." : "Thinking..."}</span>
          </div>
        )}
      </div>

      {/* Quick-Action Prompt Chips */}
      {messages.length <= 2 && (
        <div className="pt-3.5 flex flex-wrap gap-1.5">
          {t.contact.quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleChipClick(prompt, idx)}
              className="text-left text-[11px] font-body text-text-secondary hover:text-text-primary bg-bg-raised/60 hover:bg-bg-raised border border-border-subtle hover:border-accent/40 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer"
            >
              • {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Terminal Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendQuery(input);
        }}
        className="mt-4 pt-3 border-t border-border-subtle flex items-center gap-2"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.contact.terminalPlaceholder}
          disabled={isLoading}
          className="flex-1 bg-bg-raised/50 border border-border-subtle focus:border-accent rounded-xl px-3 py-2 text-xs font-mono text-text-primary placeholder:text-text-muted outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="p-2 rounded-xl bg-accent text-white hover:opacity-90 disabled:opacity-40 transition-opacity cursor-pointer shadow-xs"
        >
          <CornerDownLeft size={14} />
        </button>
      </form>

      <p className="text-[10px] font-mono text-text-muted text-center mt-2.5">
        {t.contact.terminalDisclaimer}
      </p>
    </div>
  );
};
