"use client";

import React from "react";
import { Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/src/context/LanguageContext";

interface LanguageToggleProps {
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ className = "" }) => {
  const { locale, toggleLocale, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={t.nav.toggleLang}
      title={t.nav.toggleLang}
      className={`h-9 px-3 flex items-center gap-1.5 rounded-full border border-border-subtle bg-bg-surface text-text-secondary hover:text-text-primary hover:border-border-base transition-colors cursor-pointer shadow-xs select-none ${className}`}
    >
      <motion.div
        key={locale}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="flex items-center gap-1.5"
      >
        <Globe size={13} className="text-text-muted" />
        <span className="text-[11px] font-mono font-semibold tracking-wider text-text-primary uppercase">
          {locale}
        </span>
      </motion.div>
    </button>
  );
};
