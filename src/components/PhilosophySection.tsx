"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { FadeIn } from "@/src/components/ui/FadeIn";

interface PhilosophyProps {
  quote: string;
  focus: string[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.15,
    },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(2px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const PhilosophySection: React.FC<PhilosophyProps> = ({ quote, focus }) => {
  const words = quote.split(" ");

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

            {/* Blockquote with refined animated left border */}
            <blockquote className="relative pl-6 sm:pl-8 mb-10 min-h-[90px]">
              {/* Dynamic growing border indicator */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent origin-top"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Dynamic Staggered Words Reveal */}
              <motion.p
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-15%" }}
                className="text-xl sm:text-2xl font-heading font-medium text-text-primary leading-[1.6] tracking-tight flex flex-wrap gap-x-[7px] gap-y-1"
              >
                <motion.span variants={wordVariants} className="inline-block text-accent/80 font-serif">&ldquo;</motion.span>
                {words.map((word, idx) => (
                  <motion.span
                    key={idx}
                    variants={wordVariants}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
                <motion.span variants={wordVariants} className="inline-block text-accent/80 font-serif">&rdquo;</motion.span>
              </motion.p>
            </blockquote>

            {/* Premium capsule Focus tags */}
            <div className="flex flex-wrap gap-2.5">
              {focus.map((item, idx) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.4, delay: idx * 0.1 + 0.5, ease: "easeOut" }}
                  className="px-3.5 py-1 rounded-xl text-xs font-body font-semibold text-text-secondary border border-border-base bg-bg-raised backdrop-blur-sm hover:border-accent hover:text-accent transition-colors duration-300 cursor-default"
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
