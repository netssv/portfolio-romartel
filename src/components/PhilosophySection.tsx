"use client";

import React from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/src/components/ui/FadeIn";

interface PhilosophyProps {
  quote: string;
  focus: string[];
}

export const PhilosophySection: React.FC<PhilosophyProps> = ({ quote, focus }) => {
  return (
    <section className="py-24 border-b border-border-subtle relative overflow-hidden">
      {/* ── Background Abstract Animated Geometry ──────────────────────── */}
      <div 
        className="absolute right-12 top-1/2 -translate-y-1/2 w-80 h-80 opacity-[0.05] pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        {/* Outer slow-spinning dashed ring */}
        <motion.svg
          viewBox="0 0 100 100"
          className="w-full h-full text-accent"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
        >
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeDasharray="6 6"
          />
        </motion.svg>

        {/* Inner fast-spinning counter ring */}
        <motion.svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full text-accent"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          <circle
            cx="50"
            cy="50"
            r="32"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeDasharray="2 12"
          />
          <circle
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="4 4"
          />
        </motion.svg>
      </div>

      {/* ── Section Content ────────────────────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <FadeIn>
          <div className="max-w-3xl">
            <p className="text-[10px] font-body font-bold uppercase tracking-wider text-text-muted mb-8">
              Philosophy &amp; Strategic Vision
            </p>

            {/* Blockquote with refined orange left border */}
            <blockquote className="border-l-2 border-accent pl-6 sm:pl-8 mb-10">
              <p className="text-xl sm:text-2xl font-heading font-medium text-text-primary leading-[1.6] tracking-tight">
                &ldquo;{quote}&rdquo;
              </p>
            </blockquote>

            {/* Premium capsule Focus tags */}
            <div className="flex flex-wrap gap-2.5">
              {focus.map((item, idx) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  className="px-3.5 py-1 rounded-xl text-xs font-body font-semibold text-text-secondary border border-border-base bg-bg-raised backdrop-blur-sm"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
