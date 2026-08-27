"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClippoAvatar } from "./ClippoAvatar";

interface ClippoFloatingTriggerProps {
  isOpen: boolean;
  onToggle: () => void;
}

const DYNAMIC_PHRASES = [
  "It looks like you're exploring Rodrigo's portfolio!",
  "Want to check live Bitcoin mempool telemetry?",
  "Curious about Rodrigo's open-source projects?",
  "Want me to send a direct message to Rodrigo for you?",
  "Ask me about his hosting & automation stack!",
];

export function ClippoFloatingTrigger({
  isOpen,
  onToggle,
}: ClippoFloatingTriggerProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    if (isOpen) return;

    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % DYNAMIC_PHRASES.length);
    }, 6500);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (isOpen) return null;

  return (
    <div className="relative flex flex-col items-end select-none">
      {/* Dynamic Word 97 Speech Bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={phraseIndex}
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          onClick={onToggle}
          className="cursor-pointer max-w-[210px] bg-bg-surface text-text-primary text-xs font-medium px-3.5 py-2.5 rounded-2xl rounded-br-sm border border-border-base shadow-2xl mb-2 backdrop-blur-md relative hover:border-accent hover:shadow-accent/10 transition-all duration-200"
        >
          <p className="leading-snug">{DYNAMIC_PHRASES[phraseIndex]}</p>
          {/* Pointer tail pointing down to Clippo */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-bg-surface border-r border-b border-border-base transform rotate-45" />
        </motion.div>
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
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
        className="cursor-pointer p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-transform duration-200 group"
      >
        <div className="relative flex items-center justify-center">
          {/* Subtle Ambient Pulse Ring */}
          <div className="absolute inset-0 rounded-full bg-accent/15 blur-md group-hover:bg-accent/30 transition-all duration-300 transform scale-110" />
          <ClippoAvatar size={58} />
        </div>
      </motion.div>
    </div>
  );
}
