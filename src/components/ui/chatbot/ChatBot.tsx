"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { ChatMessageList } from "./ChatMessageList";
import { ClippoFloatingTrigger } from "./ClippoFloatingTrigger";
import { useActiveSection } from "@/src/lib/useActiveSection";
import { useVisitorContext } from "@/src/lib/useVisitorContext";
import { useLanguage } from "@/src/context/LanguageContext";
import { useDesign } from "@/src/context/DesignContext";
import { useChatBotState } from "./useChatBotState";
import { useClippoAutoClose } from "./useClippoAutoClose";
import { useClippoSystemCommands } from "./useClippoSystemCommands";

export function ChatBot() {
  const activeSection = useActiveSection();
  const { context: visitorContext, greeting } = useVisitorContext();
  const { locale, isSpanish, toggleLocale } = useLanguage();
  const { theme, setTheme } = useDesign();
  const [isOpen, setIsOpen] = useState(false);
  const [customPhrase, setCustomPhrase] = useState<string | null>(null);

  const prevLocaleRef = useRef<string>(locale);
  const isInitialMount = useRef(true);

  const {
    messages, setMessages, input, setInput, isLoading, error, dispatchChat, handleSend, handleReset,
  } = useChatBotState(greeting);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const { clearAutoCloseTimer } = useClippoAutoClose({
    isOpen,
    messages,
    chatContainerRef,
    visitorContext,
    onClose: () => setIsOpen(false),
    setCustomPhrase,
  });

  // Smart Clippo: Detect active language change and notify visitor
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevLocaleRef.current = locale;
      return;
    }

    if (prevLocaleRef.current !== locale) {
      prevLocaleRef.current = locale;
      const smartPhrase = isSpanish
        ? "Veo que cambiaste al español. ¿Te gustaría seguir así o cambiamos al inglés?"
        : "I noticed you switched to English! Would you like to continue in English or switch to Spanish?";

      setCustomPhrase(smartPhrase);
      const timer = setTimeout(() => setCustomPhrase((curr) => (curr === smartPhrase ? null : curr)), 10000);

      if (isOpen) {
        setMessages((prev) => [
          ...prev,
          {
            id: `lang-detect-${Date.now()}`,
            role: "model",
            text: isSpanish
              ? "Veo que cambiaste al español. ¿Te gustaría seguir así o cambiamos al inglés? Puedo responderte en el idioma que prefieras."
              : "I noticed you switched to English! Would you like to continue in English or switch back to Spanish? I'm happy to assist in whichever language you prefer.",
            timestamp: isSpanish ? "Ahora" : "Just now",
          },
        ]);
      }
      return () => clearTimeout(timer);
    }
  }, [locale, isSpanish, isOpen, setMessages]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView?.({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [isOpen, messages]);

  useEffect(() => {
    const openWithPrompt = (idPrefix: string, text: string) => {
      setCustomPhrase(null);
      setIsOpen(true);
      setMessages((prev) => [
        ...prev,
        {
          id: `${idPrefix}-${Date.now()}`,
          role: "model",
          text,
          timestamp: isSpanish ? "Ahora" : "Just now",
        },
      ]);
      setTimeout(() => inputRef.current?.focus(), 150);
    };

    const handleContact = () => openWithPrompt(
      "contact",
      isSpanish
        ? "¡Veo que te gustaría contactar a Rodrigo! Comparte tu nombre, correo y mensaje aquí, y se lo enviaré directo a su bandeja de entrada."
        : "I see you would like to reach Rodrigo! Feel free to share your name, email, and a message here, and I will deliver it straight to his inbox."
    );

    const handleSchedule = () => openWithPrompt(
      "schedule",
      isSpanish
        ? "¡Hola! Con gusto te ayudo a agendar una llamada con Rodrigo. Déjame tu nombre, correo y tu fecha/horario de preferencia o tema a tratar, y coordinamos la sesión."
        : "Hi! I would be delighted to help you schedule a call with Rodrigo. Please share your name, email, and your preferred date/time or topic, and we will coordinate right away."
    );

    window.addEventListener("open-clippo-contact", handleContact);
    window.addEventListener("open-clippo-schedule", handleSchedule);
    return () => {
      window.removeEventListener("open-clippo-contact", handleContact);
      window.removeEventListener("open-clippo-schedule", handleSchedule);
    };
  }, [setMessages, isSpanish]);

  const { onUserSend } = useClippoSystemCommands({
    isSpanish, toggleLocale, theme, setTheme, setMessages, setInput,
    handleSend, clearAutoCloseTimer, activeSection, visitorContext, input,
  });

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end print:hidden">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatContainerRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={clearAutoCloseTimer}
            onFocusCapture={clearAutoCloseTimer}
            data-lenis-prevent
            className="w-[calc(100vw-2.5rem)] sm:w-[380px] h-[520px] max-h-[80vh] flex flex-col bg-bg-surface border border-border-base rounded-2xl shadow-2xl overflow-hidden mb-3 overscroll-contain"
          >
            <ChatHeader
              isLoading={isLoading}
              onReset={() => { clearAutoCloseTimer(); handleReset(); }}
              onClose={() => { clearAutoCloseTimer(); setIsOpen(false); }}
            />

            <ChatMessageList
              messages={messages}
              isLoading={isLoading}
              error={error}
              activeSection={activeSection}
              onSend={onUserSend}
              onRetry={() => !isLoading && messages.length > 0 && dispatchChat(messages, activeSection, visitorContext)}
              messagesEndRef={messagesEndRef}
            />

            <ChatInput
              ref={inputRef}
              input={input}
              onChange={(val) => {
                clearAutoCloseTimer();
                setInput(val);
              }}
              onSubmit={(e) => {
                e.preventDefault();
                onUserSend();
              }}
              isLoading={isLoading}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <ClippoFloatingTrigger
          isOpen={isOpen}
          onToggle={() => {
            clearAutoCloseTimer();
            setCustomPhrase(null);
            setIsOpen(true);
          }}
          isThinking={isLoading}
          sectionId={activeSection}
          customPhrase={customPhrase}
        />
      )}
    </div>
  );
}
