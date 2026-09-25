"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { useLanguage } from "@/src/context/LanguageContext";
import { DeliceTimelineTrack } from "./timeline/DeliceTimelineTrack";
import type { ExperienceItem } from "./scrollytelling/PinnedExperienceScrollytelling";

export const ExperienceTimeline: React.FC<{ items: ExperienceItem[] }> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate live fractional milestone progress
  const progressPercent = useTransform(scrollYProgress, (val) => `${Math.round(val * 100)}%`);

  return (
    <div
      ref={containerRef}
      id="experience"
      className="relative h-[280vh] w-full bg-[#21426E] dark:bg-[#162C4E] text-white select-none border-t border-b border-white/15"
    >
      {/* ── Pinned 100dvh Stage ── */}
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-center items-center overflow-hidden py-8">
        {/* Subtle Background Radial Depth */}
        <div
          className="absolute inset-0 bg-radial from-white/[0.04] via-transparent to-black/25 pointer-events-none"
          aria-hidden="true"
        />

        {/* ── Section Header ── */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-center mb-6 sm:mb-8 text-center shrink-0">
          {/* Systematic Architectural Index Tag */}
          <div className="text-xs sm:text-sm font-mono font-bold tracking-widest uppercase mb-1.5 text-[#93C5FD]">
            <span>[03]</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-white drop-shadow-sm mb-2">
            {t.experience.heading}
          </h2>

          <p className="text-xs sm:text-sm font-body text-white/80 max-w-xl mx-auto leading-relaxed">
            {t.experience.description}
          </p>
        </div>

        {/* ── Scroll-Driven Horizontal Timeline Track ── */}
        <div className="relative z-10 w-full shrink-0">
          <DeliceTimelineTrack items={items} scrollYProgress={scrollYProgress} />
        </div>

        {/* ── Bottom Scroll Guidance & Progress Bar ── */}
        <div className="relative z-10 mt-6 flex flex-col items-center gap-2 text-center shrink-0">
          <div className="w-36 h-[2px] bg-white/20 rounded-full overflow-hidden">
            <motion.div
              style={{ width: progressPercent }}
              className="h-full bg-white rounded-full transition-all duration-75"
            />
          </div>
          <span className="font-mono text-[10px] text-white/60 tracking-widest uppercase">
            SCROLL TO EXPLORE TIMELINE (2018 &rarr; 2025)
          </span>
        </div>
      </div>
    </div>
  );
};
