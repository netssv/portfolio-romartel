"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/src/context/LanguageContext";

export const SloganSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data } = useLanguage();
  const slogan = data.slogan;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Background flood transition to established button blue (#21426E)
  const bgOpacity = useTransform(scrollYProgress, [0.15, 0.42, 0.78, 0.98], [0, 1, 1, 0]);

  // Dynamic diagonal graphic sliding across the top-left corner
  const slashX = useTransform(scrollYProgress, [0.08, 0.45], ["-40%", "0%"]);
  const slashY = useTransform(scrollYProgress, [0.08, 0.45], ["-25%", "0%"]);
  const slashScale = useTransform(scrollYProgress, [0.1, 0.5], [0.85, 1.05]);
  const slashOpacity = useTransform(scrollYProgress, [0.1, 0.35, 0.8, 1], [0.25, 0.95, 0.95, 0]);

  // Kinetic typography transformations
  const textScale = useTransform(scrollYProgress, [0.18, 0.45], [0.92, 1]);
  const textY = useTransform(scrollYProgress, [0.18, 0.45], [40, 0]);

  // Color interpolation as background turns blue
  const primaryTextColor = useTransform(
    scrollYProgress,
    [0.2, 0.42],
    ["#111827", "#FFFFFF"]
  );
  const secondaryTextColor = useTransform(
    scrollYProgress,
    [0.2, 0.42],
    ["#4B5563", "rgba(255, 255, 255, 0.82)"]
  );
  const tagColor = useTransform(
    scrollYProgress,
    [0.2, 0.42],
    ["#21426E", "#93C5FD"]
  );

  if (!slogan) return null;

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] sm:min-h-screen py-28 sm:py-36 lg:py-44 flex flex-col items-center justify-center overflow-hidden transition-colors duration-500 select-none"
    >
      {/* Background color morph overlay into established button blue */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 bg-[#21426E] dark:bg-[#1A375E] pointer-events-none z-0 shadow-inner"
        aria-hidden="true"
      />

      {/* Diagonal Architectural Bar (Dynamic accent slash) */}
      <motion.div
        style={{
          x: slashX,
          y: slashY,
          scale: slashScale,
          opacity: slashOpacity,
          rotate: -36,
        }}
        className="absolute -top-36 -left-32 sm:-left-20 w-48 sm:w-64 md:w-80 h-[150%] bg-[#1A3557] dark:bg-[#2A4D78] rounded-full pointer-events-none shadow-2xl z-0 blur-[1px]"
        aria-hidden="true"
      />

      {/* Slogan Content Container */}
      <motion.div
        style={{
          scale: textScale,
          y: textY,
        }}
        className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 flex flex-col items-center text-center"
      >
        {/* Line 1: THINK BIG. */}
        <motion.p
          style={{ color: primaryTextColor }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold uppercase tracking-tight leading-none mb-2 sm:mb-4 drop-shadow-xs"
        >
          {slogan.line1}
        </motion.p>

        {/* Line 2: START SMALL. (Monumental Impact Typography) */}
        <motion.h2
          style={{ color: primaryTextColor }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-black uppercase tracking-tight leading-none mb-6 sm:mb-8 drop-shadow-sm"
        >
          {slogan.line2}
        </motion.h2>

        {/* Bracketed Tag [ Systems & Execution ] */}
        <motion.div
          style={{ color: tagColor }}
          className="inline-flex items-center gap-1.5 sm:gap-2.5 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-mono font-bold tracking-tight mb-5"
        >
          <span className="opacity-60">[</span>
          <span>{slogan.tag}</span>
          <span className="opacity-60">]</span>
        </motion.div>

        {/* Descriptive Subtitle */}
        {slogan.subtitle && (
          <motion.p
            style={{ color: secondaryTextColor }}
            className="text-sm sm:text-base md:text-lg font-body max-w-xl leading-relaxed mt-2"
          >
            {slogan.subtitle}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
};
