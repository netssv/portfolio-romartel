"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionLabelProps {
  eyebrow: string;
  heading: string;
  description?: string;
  align?: "left" | "center";
  index?: string;
  variant?: "default" | "onDark";
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  eyebrow,
  heading,
  description,
  align = "left",
  index,
  variant = "default",
}) => {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";
  const isOnDark = variant === "onDark";

  return (
    <div className={`flex flex-col ${alignClass} mb-12 sm:mb-16 select-none`}>
      <div className="flex items-center gap-2 mb-3">
        {index ? (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono font-bold tracking-tighter shadow-xs overflow-hidden ${
              isOnDark
                ? "bg-white/10 border border-white/20 text-white"
                : "bg-accent/10 border border-accent/20 text-accent"
            }`}
          >
            <motion.span
              initial={{ x: -10, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              [
            </motion.span>
            <span>{index}</span>
            <motion.span
              initial={{ x: 10, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              ]
            </motion.span>
          </span>
        ) : (
          <span
            className={`h-1.5 w-1.5 rounded-full ${isOnDark ? "bg-white" : "bg-accent"}`}
            aria-hidden="true"
          />
        )}
        <p
          className={`text-xs font-body font-semibold uppercase tracking-[0.18em] ${
            isOnDark ? "text-blue-200" : "text-accent"
          }`}
        >
          {eyebrow}
        </p>
      </div>

      <h2
        className={`text-3xl sm:text-4xl font-heading font-bold tracking-tight leading-tight inline-flex flex-wrap items-center gap-1.5 ${
          isOnDark ? "text-white" : "text-text-primary"
        }`}
      >
        <motion.span
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className={`font-mono font-light text-2xl sm:text-3xl ${
            isOnDark ? "text-blue-300/70" : "text-accent/60"
          }`}
        >
          [
        </motion.span>
        <span>{heading}</span>
        <motion.span
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className={`font-mono font-light text-2xl sm:text-3xl ${
            isOnDark ? "text-blue-300/70" : "text-accent/60"
          }`}
        >
          ]
        </motion.span>
      </h2>

      {description && (
        <p
          className={`mt-3.5 text-sm sm:text-base font-body leading-relaxed max-w-2xl ${
            isOnDark ? "text-blue-100/90" : "text-text-secondary"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
