"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/src/context/LanguageContext";

interface LanguageToggleProps {
  className?: string;
}

/**
 * Clean SVG icon for the US/English flag indicator
 */
const UsFlagIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg
    width={size}
    height={(size * 3) / 4}
    viewBox="0 0 640 480"
    className="rounded-xs shrink-0 overflow-hidden shadow-2xs"
    aria-hidden="true"
  >
    <path fill="#bd3d44" d="M0 0h640v480H0z" />
    <path
      stroke="#fff"
      strokeWidth="37"
      d="M0 55.4h640M0 129.2h640M0 203h640M0 277h640M0 350.8h640M0 424.6h640"
    />
    <path fill="#192f5d" d="M0 0h260v222H0z" />
    {/* Clean stylized stars grid */}
    <g fill="#fff">
      <circle cx="45" cy="35" r="9" />
      <circle cx="95" cy="35" r="9" />
      <circle cx="145" cy="35" r="9" />
      <circle cx="195" cy="35" r="9" />
      <circle cx="70" cy="70" r="9" />
      <circle cx="120" cy="70" r="9" />
      <circle cx="170" cy="70" r="9" />
      <circle cx="220" cy="70" r="9" />
      <circle cx="45" cy="105" r="9" />
      <circle cx="95" cy="105" r="9" />
      <circle cx="145" cy="105" r="9" />
      <circle cx="195" cy="105" r="9" />
      <circle cx="70" cy="140" r="9" />
      <circle cx="120" cy="140" r="9" />
      <circle cx="170" cy="140" r="9" />
      <circle cx="220" cy="140" r="9" />
      <circle cx="45" cy="175" r="9" />
      <circle cx="95" cy="175" r="9" />
      <circle cx="145" cy="175" r="9" />
      <circle cx="195" cy="175" r="9" />
    </g>
  </svg>
);

/**
 * Clean SVG icon for the Spanish flag indicator
 */
const EsFlagIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg
    width={size}
    height={(size * 3) / 4}
    viewBox="0 0 640 480"
    className="rounded-xs shrink-0 overflow-hidden shadow-2xs"
    aria-hidden="true"
  >
    <path fill="#c60b1e" d="M0 0h640v480H0z" />
    <path fill="#ffc400" d="M0 120h640v240H0z" />
    {/* Stylized crest emblem */}
    <g fill="#c60b1e" opacity="0.85">
      <rect x="140" y="180" width="40" height="55" rx="8" />
      <circle cx="160" cy="165" r="12" />
    </g>
  </svg>
);

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ className = "" }) => {
  const { locale, toggleLocale, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={t.nav.toggleLang}
      title={t.nav.toggleLang}
      className={`h-9 px-2 sm:px-2.5 flex items-center gap-1.5 rounded-xl border border-border-subtle bg-bg-surface text-text-secondary hover:text-text-primary hover:border-accent transition-colors cursor-pointer shadow-xs select-none ${className}`}
    >
      <motion.div
        key={locale}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="flex items-center gap-1.5"
      >
        {locale === "es" ? <EsFlagIcon size={16} /> : <UsFlagIcon size={16} />}
        <span className="text-[11px] font-mono font-semibold tracking-wider text-text-primary uppercase">
          {locale}
        </span>
      </motion.div>
    </button>
  );
};
