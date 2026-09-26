"use client";

import React from "react";
import { MessageItem } from "./ChatMessage";
import { SectionId } from "@/src/lib/useActiveSection";
import { VisitorContext } from "@/src/lib/visitor-context";
import { ThemeMode } from "@/src/context/DesignContext";

interface ClippoSystemCommandsParams {
  isSpanish: boolean;
  toggleLocale: () => void;
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  setMessages: React.Dispatch<React.SetStateAction<MessageItem[]>>;
  setInput: (val: string) => void;
  handleSend: (
    text: string | undefined,
    activeSection: SectionId,
    visitorContext: VisitorContext | null
  ) => void;
  clearAutoCloseTimer: () => void;
  activeSection: SectionId;
  visitorContext: VisitorContext | null;
  input: string;
}

export function useClippoSystemCommands({
  isSpanish,
  toggleLocale,
  theme,
  setTheme,
  setMessages,
  setInput,
  handleSend,
  clearAutoCloseTimer,
  activeSection,
  visitorContext,
  input,
}: ClippoSystemCommandsParams) {
  const onUserSend = (text?: string) => {
    clearAutoCloseTimer();
    const query = (text ?? input).trim();
    if (!query) return;

    const lower = query.toLowerCase();
    const isQuestion = /[?¿]|^(c[oó]mo|how|por\s*qu[eé]|why|cu[aá]l|what|explica|tell\s+me)/i.test(query);

    const isNightCommand =
      !isQuestion &&
      /^(activar|poner|cambiar\s+a(l)?|toggle|switch\s+to|enable)?\s*(el\s+)?(tono\s+nocturno|dark\s+mode|modo\s+oscuro)$/i.test(lower);

    const isDayCommand =
      !isQuestion &&
      /^(activar|poner|cambiar\s+a(l)?|toggle|switch\s+to|enable)?\s*(el\s+)?(tono\s+claro|light\s+mode|modo\s+claro)$/i.test(lower);

    const isLangCommand =
      !isQuestion &&
      /^(cambiar|switch|toggle)?\s*(el\s+)?(idioma(\s+a\s+(ingl[eé]s|español))?|language(\s+to\s+(english|spanish))?|a\s+ingl[eé]s|to\s+spanish)$/i.test(lower);

    if (isNightCommand) {
      setTheme("night");
      const userMsg: MessageItem = {
        id: `u-${Date.now()}`,
        role: "user",
        text: query,
        timestamp: isSpanish ? "Ahora" : "Just now",
      };
      const modelMsg: MessageItem = {
        id: `m-${Date.now()}`,
        role: "model",
        text: isSpanish
          ? "He activado el tono nocturno para una lectura más cómoda."
          : "I have activated dark mode for a more comfortable reading experience.",
        timestamp: isSpanish ? "Ahora" : "Just now",
      };
      setMessages((prev) => [...prev, userMsg, modelMsg]);
      setInput("");
      return;
    }

    if (isDayCommand) {
      setTheme("day");
      const userMsg: MessageItem = {
        id: `u-${Date.now()}`,
        role: "user",
        text: query,
        timestamp: isSpanish ? "Ahora" : "Just now",
      };
      const modelMsg: MessageItem = {
        id: `m-${Date.now()}`,
        role: "model",
        text: isSpanish
          ? "He activado el tono claro."
          : "I have activated light mode.",
        timestamp: isSpanish ? "Ahora" : "Just now",
      };
      setMessages((prev) => [...prev, userMsg, modelMsg]);
      setInput("");
      return;
    }

    if (isLangCommand) {
      toggleLocale();
      const userMsg: MessageItem = {
        id: `u-${Date.now()}`,
        role: "user",
        text: query,
        timestamp: isSpanish ? "Ahora" : "Just now",
      };
      const modelMsg: MessageItem = {
        id: `m-${Date.now()}`,
        role: "model",
        text: isSpanish
          ? "Language switched to English. You can continue in English."
          : "Idioma cambiado al español. Puedes continuar en español.",
        timestamp: isSpanish ? "Ahora" : "Just now",
      };
      setMessages((prev) => [...prev, userMsg, modelMsg]);
      setInput("");
      return;
    }

    handleSend(text, activeSection, visitorContext);
  };

  return { onUserSend };
}
