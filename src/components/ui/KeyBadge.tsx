"use client";

import React from "react";

interface KeyBadgeProps {
  keyLabel: string;
  className?: string;
  variant?: "default" | "accent" | "subtle";
}

export const KeyBadge: React.FC<KeyBadgeProps> = ({
  keyLabel,
  className = "",
  variant = "default",
}) => {
  const variantStyles = {
    default:
      "bg-bg-raised text-text-secondary border-border-base shadow-[0_1px_0_1px_rgba(0,0,0,0.08)]",
    accent:
      "bg-accent text-black font-semibold border-accent/60 shadow-[0_1px_0_1px_rgba(184,74,0,0.2)]",
    subtle:
      "bg-bg-surface/80 text-text-muted border-border-subtle shadow-[0_1px_0_1px_rgba(0,0,0,0.04)]",
  };

  return (
    <kbd
      aria-label={`Shortcut key ${keyLabel}`}
      className={`inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 text-[10px] font-mono uppercase tracking-wider rounded border select-none transition-all duration-150 ${variantStyles[variant]} ${className}`}
    >
      {keyLabel}
    </kbd>
  );
};
