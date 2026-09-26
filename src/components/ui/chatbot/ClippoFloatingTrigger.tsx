"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Moon, Languages } from "lucide-react";
import { ClippoAvatar } from "./ClippoAvatar";
import { SectionId } from "@/src/lib/useActiveSection";
import { getSectionChatbotConfig } from "@/src/lib/chatbot-section-data";
import { useLanguage } from "@/src/context/LanguageContext";
import { useDesign } from "@/src/context/DesignContext";

interface ClippoFloatingTriggerProps {
  isOpen: boolean;
  onToggle: () => void;
  isThinking?: boolean;
  sectionId?: SectionId;
  customPhrase?: string | null;
}

export function ClippoFloatingTrigger({
  isOpen,
  onToggle,
  isThinking = false,
  sectionId = "top",
  customPhrase = null,
}: ClippoFloatingTriggerProps) {
  const { isSpanish, toggleLocale } = useLanguage();
  const { theme, setTheme } = useDesign();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isNightTime, setIsNightTime] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsNightTime(hour >= 19 || hour < 6);
  }, []);

  useEffect(() => {
    const handleNav = (e: Event) => setIsNavOpen(Boolean((e as CustomEvent).detail?.open));
    window.addEventListener("mobile-nav-toggle", handleNav);
    return () => window.removeEventListener("mobile-nav-toggle", handleNav);
  }, []);

  const activeConfig = getSectionChatbotConfig(sectionId, isSpanish);

  const phrases = useMemo(() => {
    const list: string[] = [];

    // Nighttime mode suggestion if it's night and currently in light mode
    if (isNightTime && theme !== "night") {
      list.push(
        isSpanish
          ? "Parece que es de noche, ¿deseas tono nocturno?"
          : "It looks like it's night, would you like dark mode?"
      );
    }

    // Language switch suggestion
    list.push(
      isSpanish
        ? "¿Quieres cambiar el idioma a inglés?"
        : "Would you like to switch to Spanish?"
    );

    // Section specific speech phrases
    list.push(...activeConfig.speechPhrases);

    return list;
  }, [activeConfig.speechPhrases, isNightTime, theme, isSpanish]);

  useEffect(() => {
    setPhraseIndex(0);
    setIsDismissed(false);
  }, [isSpanish, sectionId, customPhrase, theme]);

  useEffect(() => {
    if (isOpen || isThinking || customPhrase || phrases.length <= 1) return;

    const interval = setInterval(() => setPhraseIndex((prev) => (prev + 1) % phrases.length), 6500);
    return () => clearInterval(interval);
  }, [isOpen, isThinking, customPhrase, phrases.length]);

  if (isOpen || isNavOpen) return null;

  const currentPhrase = customPhrase || phrases[phraseIndex % phrases.length] || phrases[0];
  const isNightAction = !customPhrase && (currentPhrase.includes("tono nocturno") || currentPhrase.includes("dark mode"));
  const isLangAction = !customPhrase && (currentPhrase.includes("idioma a inglés") || currentPhrase.includes("switch to Spanish"));

  return (
    <div className="relative flex flex-col items-end select-none">
      {/* Dynamic Speech / Thought Bubble */}
      <AnimatePresence mode="wait">
        {!isDismissed && (
          <motion.div
            key={isThinking ? "thinking" : customPhrase ? `custom-${customPhrase}` : `${isSpanish ? "es" : "en"}-${sectionId}-${phraseIndex}`}
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={onToggle}
            className={`cursor-pointer max-w-[245px] bg-bg-surface text-text-primary text-xs font-medium px-3.5 py-2.5 rounded-2xl rounded-br-sm border shadow-2xl mb-2 backdrop-blur-md relative transition-all duration-200 ${
              isThinking
                ? "border-accent/60 shadow-accent/20 ring-1 ring-accent/30"
                : customPhrase
                ? "border-accent/80 shadow-accent/20 ring-1 ring-accent/40"
                : "border-border-base hover:border-accent hover:shadow-accent/10"
            }`}
          >
            {/* Dismiss X button with expanded touch target */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setIsDismissed(true); }}
              className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-full bg-bg-surface border border-border-base flex items-center justify-center text-text-muted hover:text-text-primary transition-colors shadow-xs cursor-pointer before:absolute before:-inset-2.5 before:content-['']"
              aria-label={isSpanish ? "Cerrar mensaje" : "Dismiss message"}
            >
              <X size={10} />
            </button>
          {isThinking ? (
            <div className="flex items-center gap-2 text-accent">
              <span className="flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" style={{ animationDuration: "1s", animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" style={{ animationDuration: "1s", animationDelay: "200ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" style={{ animationDuration: "1s", animationDelay: "400ms" }} />
              </span>
              <span className="text-text-primary text-[11px] font-semibold">
                {isSpanish ? "Clippo está pensando..." : "Clippo is thinking..."}
              </span>
            </div>
          ) : (
            <>
              <p className="leading-snug">{currentPhrase}</p>
              {isNightAction && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setTheme("night"); }}
                  className="mt-2.5 w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent text-white text-[11px] font-semibold hover:bg-accent-hover transition-colors shadow-xs cursor-pointer"
                >
                  <Moon size={12} />
                  <span>{isSpanish ? "Activar tono nocturno" : "Enable dark mode"}</span>
                </button>
              )}
              {isLangAction && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); toggleLocale(); }}
                  className="mt-2.5 w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent text-white text-[11px] font-semibold hover:bg-accent-hover transition-colors shadow-xs cursor-pointer"
                >
                  <Languages size={12} />
                  <span>{isSpanish ? "Cambiar a inglés" : "Switch to Spanish"}</span>
                </button>
              )}
            </>
          )}

          {/* Pointer tail pointing down to Clippo */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-bg-surface border-r border-b border-border-base transform rotate-45" />
        </motion.div>
      )}
      </AnimatePresence>

      {/* Pure Animated Clippo Character Trigger */}
      <motion.div
        role="button"
        tabIndex={0}
        aria-label="Open Clippo Assistant"
        whileHover={{ scale: 1.15, rotate: 4 }}
        whileTap={{ scale: 0.9 }}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(); }
        }}
        className="cursor-pointer p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-transform duration-200 group"
      >
        <div className="relative flex items-center justify-center">
          {/* Ambient Pulse Ring */}
          <div
            className={`absolute inset-0 rounded-full blur-md transition-all duration-300 transform scale-110 ${
              isThinking
                ? "bg-accent/40 animate-pulse"
                : customPhrase
                ? "bg-accent/35 animate-pulse"
                : "bg-accent/15 group-hover:bg-accent/30"
            }`}
          />
          <ClippoAvatar size={58} isThinking={isThinking} />
        </div>
      </motion.div>
    </div>
  );
}
