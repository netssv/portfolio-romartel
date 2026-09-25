"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/src/context/LanguageContext";
import { SloganBackgroundLines } from "./SloganBackgroundLines";
import { SloganMetricsGrid } from "./scrollytelling/SloganMetricsGrid";

export const SloganSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data, t } = useLanguage();
  const slogan = data.slogan;
  const metrics = data.metrics || [];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Text stays pinned, solid, and crystal-clear while scrolling, only gently fading at the exit boundary
  const textOpacity = useTransform(scrollYProgress, [0, 0.92, 1], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.92, 1], [0, 0, -24]);
  const textScale = useTransform(scrollYProgress, [0, 0.92, 1], [1, 1, 0.98]);

  if (!slogan) return null;

  return (
    <div
      ref={containerRef}
      className="relative h-[320vh] w-full bg-[#21426E] dark:bg-[#162C4E] text-white select-none z-10"
    >
      {/* Pinned Viewport Container: text stays still while background lines move across scroll */}
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Kinetic Architectural Background Lines & Coordinates */}
        <SloganBackgroundLines scrollYProgress={scrollYProgress} />

        {/* Slogan & Projects Headline: Pinned and crystal-clear for comfortable reading */}
        <motion.div
          style={{
            opacity: textOpacity,
            y: textY,
            scale: textScale,
          }}
          className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 flex flex-col items-center text-center py-6"
        >
          {/* Line 1: THINK BIG. */}
          <p className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold uppercase tracking-tight leading-none mb-1 sm:mb-2 text-white drop-shadow-sm">
            {slogan.line1}
          </p>

          {/* Line 2: START SMALL. (Monumental Impact Typography) */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black uppercase tracking-tight leading-none mb-2 sm:mb-3 text-white drop-shadow-md">
            {slogan.line2}
          </h2>

          {/* High-Impact Quantifiable KPIs */}
          <SloganMetricsGrid metrics={metrics} />

          {/* [02] Selected Work & Systems */}
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold tracking-widest uppercase mb-1.5 mt-5 sm:mt-7 text-[#93C5FD]">
            <span className="opacity-70">[02]</span>
            <span>{t.projects.eyebrow}</span>
          </div>

          {/* Heading: Production Software & Automation Pipelines */}
          <h3 className="text-lg sm:text-2xl md:text-3xl font-heading font-extrabold uppercase tracking-tight max-w-3xl mb-1.5 leading-tight text-white drop-shadow-sm">
            {t.projects.heading}
          </h3>

          {/* Descriptive Subtitle */}
          <p className="text-xs sm:text-sm font-body max-w-2xl leading-relaxed text-white/85">
            {t.projects.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

