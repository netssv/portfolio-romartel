"use client";

import { useState } from "react";
import { MessageItem } from "./ChatMessage";
import { SectionId } from "@/src/lib/useActiveSection";
import { VisitorContext } from "@/src/lib/visitor-context";

const DEFAULT_INITIAL_MESSAGE: MessageItem = {
  id: "init-1",
  role: "model",
  text: "Hello! I am Clippo, the interactive assistant for Rodrigo Martel's portfolio. Ask me about his workflow automations, projects, or technical credentials.",
  timestamp: "Just now",
};

export function useChatBotState(greeting?: string) {
  const [messages, setMessages] = useState<MessageItem[]>([
    { ...DEFAULT_INITIAL_MESSAGE, text: greeting || DEFAULT_INITIAL_MESSAGE.text },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatchChat = async (
    history: MessageItem[],
    activeSection: SectionId,
    visitorContext: VisitorContext | null
  ) => {
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

      if (data.clientAction) {
        const { type, target, category, tag, language, theme } = data.clientAction;
        if (type === "NAVIGATE" && target) {
          if (target === "top") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            const elem = document.getElementById(target);
            if (elem) elem.scrollIntoView({ behavior: "smooth" });
          }
        } else if (type === "FILTER_PROJECTS") {
          window.dispatchEvent(
            new CustomEvent("portfolio:filter-projects", { detail: { category, tag } })
          );
          const elem = document.getElementById("projects");
          if (elem) elem.scrollIntoView({ behavior: "smooth" });
        } else if (type === "SET_PREFERENCES") {
          if (language) {
            window.dispatchEvent(
              new CustomEvent("portfolio:set-language", { detail: { language } })
            );
          }
          if (theme) {
            const isNight = theme === "dark" || theme === "night";
            document.documentElement.classList.toggle("theme-dark", isNight);
            try {
              localStorage.setItem("theme-override", isNight ? "night" : "day");
            } catch {
              // Ignore localStorage write failures
            }
          }
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now()}`,
          role: "model",
          text: data.reply || "I am here to assist. How can I help?",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      const isAbort = err instanceof DOMException && err.name === "AbortError";
      setError(
        isAbort
          ? "Response timed out. Please try again."
          : err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = (
    textToSend: string | undefined,
    activeSection: SectionId,
    visitorContext: VisitorContext | null
  ) => {
    const query = (textToSend ?? input).trim();
    if (!query || isLoading) return;
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const updated = [...messages, { id: `u-${Date.now()}`, role: "user" as const, text: query, timestamp: time }];
    setMessages(updated);
    setInput("");
    dispatchChat(updated, activeSection, visitorContext);
  };

  const handleReset = () => {
    setMessages([{ ...DEFAULT_INITIAL_MESSAGE, text: greeting || DEFAULT_INITIAL_MESSAGE.text }]);
    setError(null);
    setInput("");
    setIsLoading(false);
  };

  return {
    messages,
    setMessages,
    input,
    setInput,
    isLoading,
    setIsLoading,
    error,
    setError,
    dispatchChat,
    handleSend,
    handleReset,
  };
}
