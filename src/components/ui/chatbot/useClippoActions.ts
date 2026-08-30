"use client";

import { useEffect, Dispatch, SetStateAction, RefObject } from "react";
import { MessageItem } from "./ChatMessage";

interface UseClippoActionsProps {
  isSpanish: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setCustomPhrase: Dispatch<SetStateAction<string | null>>;
  setMessages: Dispatch<SetStateAction<MessageItem[]>>;
  inputRef: RefObject<HTMLInputElement | null>;
  clearAutoCloseTimer: () => void;
  onUserSend: (text?: string) => void;
}

export function useClippoActions({
  isSpanish,
  setIsOpen,
  setCustomPhrase,
  setMessages,
  inputRef,
  clearAutoCloseTimer,
  onUserSend,
}: UseClippoActionsProps) {
  useEffect(() => {
    const handleContactOpen = () => {
      clearAutoCloseTimer();
      setCustomPhrase(null);
      setIsOpen(true);
      setMessages((prev) => [
        ...prev,
        {
          id: `contact-${Date.now()}`,
          role: "model",
          text: isSpanish
            ? "¡Veo que te gustaría contactar a Rodrigo! Comparte tu nombre, correo y mensaje aquí. Te mostraré un borrador para que lo confirmes antes de enviarlo a su bandeja de entrada."
            : "I see you would like to reach Rodrigo! Feel free to share your name, email, and a message. I'll prepare a draft for your confirmation before sending it to his inbox.",
          timestamp: isSpanish ? "Ahora" : "Just now",
        },
      ]);
      setTimeout(() => inputRef.current?.focus(), 150);
    };

    const handleAction = (e: Event) => {
      clearAutoCloseTimer();
      const customEvent = e as CustomEvent<{ action: string; label: string }>;
      const { action } = customEvent.detail || {};
      if (action === "action:send_email") {
        onUserSend(isSpanish ? "Los datos están correctos, por favor envía el correo a Rodrigo." : "The details are correct, please send the email to Rodrigo.");
      } else if (action === "action:edit_contact") {
        onUserSend(isSpanish ? "Deseo corregir algunos datos del mensaje antes de enviarlo." : "I would like to edit some details before sending.");
      } else if (action === "action:cancel_contact") {
        onUserSend(isSpanish ? "Aún no, prefiero cancelar el envío del correo por ahora." : "Not yet, I prefer to cancel sending for now.");
      } else if (action?.startsWith("action:send?text=")) {
        const text = decodeURIComponent(action.replace("action:send?text=", ""));
        onUserSend(text);
      }
    };

    window.addEventListener("open-clippo-contact", handleContactOpen);
    window.addEventListener("clippo:action", handleAction);

    return () => {
      window.removeEventListener("open-clippo-contact", handleContactOpen);
      window.removeEventListener("clippo:action", handleAction);
    };
  }, [isSpanish, setIsOpen, setCustomPhrase, setMessages, inputRef, clearAutoCloseTimer, onUserSend]);
}
