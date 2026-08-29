"use client";

import { useRef, useCallback, useEffect, RefObject } from "react";
import { VisitorContext, detectConversationLanguage, getDeparturePhrase } from "@/src/lib/visitor-context";
import { MessageItem } from "./ChatMessage";

interface UseClippoAutoCloseOptions {
  isOpen: boolean;
  messages: MessageItem[];
  chatContainerRef: RefObject<HTMLDivElement | null>;
  visitorContext: VisitorContext | null;
  onClose: () => void;
  setCustomPhrase: (phrase: string | null) => void;
}

export function useClippoAutoClose({
  isOpen,
  messages,
  chatContainerRef,
  visitorContext,
  onClose,
  setCustomPhrase,
}: UseClippoAutoCloseOptions) {
  const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const phraseClearTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearAutoCloseTimer = useCallback(() => {
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
      autoCloseTimerRef.current = null;
    }
  }, []);

  const triggerAutoClose = useCallback(() => {
    clearAutoCloseTimer();
    onClose();

    const fallbackCode =
      visitorContext?.languageCode ||
      (typeof navigator !== "undefined" && navigator.language.toLowerCase().startsWith("es")
        ? "es"
        : "en");

    const detectedLang = detectConversationLanguage(messages, fallbackCode);
    const departurePhrase = getDeparturePhrase(detectedLang);

    setCustomPhrase(departurePhrase);

    if (phraseClearTimerRef.current) clearTimeout(phraseClearTimerRef.current);
    phraseClearTimerRef.current = setTimeout(() => {
      setCustomPhrase(null);
    }, 10000);
  }, [clearAutoCloseTimer, onClose, messages, visitorContext, setCustomPhrase]);

  useEffect(() => {
    if (!isOpen) {
      clearAutoCloseTimer();
      return;
    }

    const startAutoCloseTimer = () => {
      if (!autoCloseTimerRef.current) {
        autoCloseTimerRef.current = setTimeout(() => {
          triggerAutoClose();
        }, 1000);
      }
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (!chatContainerRef.current) return;
      if (chatContainerRef.current.contains(e.target as Node)) {
        clearAutoCloseTimer();
      } else {
        startAutoCloseTimer();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (!chatContainerRef.current) return;
      if (chatContainerRef.current.contains(e.target as Node)) {
        clearAutoCloseTimer();
      } else {
        startAutoCloseTimer();
      }
    };

    const handleScroll = () => {
      startAutoCloseTimer();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      clearAutoCloseTimer();
    };
  }, [isOpen, chatContainerRef, clearAutoCloseTimer, triggerAutoClose]);

  return { clearAutoCloseTimer };
}
