"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionLabelProps {
  eyebrow: string;
  heading: string;
  description?: string;
  align?: "left" | "center";
  index?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  eyebrow,
  heading,
  description,
  align = "left",
  index,
}) => {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col ${alignClass} mb-12 sm:mb-16 select-none`}>
      <div className="flex items-center gap-2 mb-3">
        {index ? (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-accent/10 border border-accent/20 text-[11px] font-mono font-bold text-accent tracking-tighter shadow-xs overflow-hidden">
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
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
        )}
        <p className="text-xs font-body font-semibold uppercase tracking-[0.18em] text-accent">
          {eyebrow}
        </p>
      </div>

      <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-primary tracking-tight leading-tight inline-flex flex-wrap items-center gap-1.5">
        <motion.span
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-accent/60 font-mono font-light text-2xl sm:text-3xl"
        >
          [
        </motion.span>
        <span>{heading}</span>
        <motion.span
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-accent/60 font-mono font-light text-2xl sm:text-3xl"
        >
          ]
        </motion.span>
      </h2>

      {description && (
        <p className="mt-3.5 text-sm sm:text-base font-body text-text-secondary leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
};
