"use client";

import React from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import type { ExperienceItem } from "../scrollytelling/PinnedExperienceScrollytelling";

interface DeliceTimelineCardProps {
  item: ExperienceItem;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  centerProgress: number;
}

export const DeliceTimelineCard: React.FC<DeliceTimelineCardProps> = ({
  item,
  index,
  total,
  scrollYProgress,
  centerProgress,
}) => {
  const startYear = item.period.split(" - ")[0].trim();

  // Opacity: 0.40 incoming -> 1.0 peak contrast cabal en medio -> 0.25 departing left
  const cardOpacity = useTransform(scrollYProgress, (s) => {
    const dist = s - centerProgress;
    if (dist < -0.10) return 0.40;
    if (dist <= 0) {
      const t = (dist + 0.10) / 0.10;
      return 0.40 + t * 0.60;
    }
    if (dist <= 0.10) {
      const t = dist / 0.10;
      return 1.0 - t * 0.75;
    }
    return 0.25;
  });

  // Scale: peaks at 1.06 cabal en medio, resting at 0.94
  const cardScale = useTransform(scrollYProgress, (s) => {
    const dist = Math.abs(s - centerProgress);
    if (dist > 0.08) return 0.94;
    const t = 1 - dist / 0.08;
    return 0.94 + t * 0.12;
  });

  // Node illumination glow: active only when docked cabal en medio
  const nodeGlow = useTransform(scrollYProgress, (s) => {
    const dist = Math.abs(s - centerProgress);
    if (dist < 0.04) {
      const t = 1 - dist / 0.04;
      return `0 0 ${Math.round(t * 18)}px ${Math.round(t * 5)}px rgba(255, 255, 255, 0.95), 0 0 ${Math.round(t * 28)}px ${Math.round(t * 10)}px rgba(147, 197, 253, 0.8)`;
    }
    return "0 0 0px 0px rgba(0,0,0,0)";
  });

  return (
    <motion.article
      style={{ opacity: cardOpacity, scale: cardScale }}
      className="flex-shrink-0 w-[320px] min-w-[320px] max-w-[320px] flex flex-col items-center text-center select-none relative will-change-transform"
      aria-label={`${item.company} (${startYear})`}
    >
      {/* ── 1. Top: Fractional Monospace Index & Monumental Year ── */}
      <div className="h-24 flex flex-col items-center justify-end pb-3">
        <span className="font-mono text-[11px] text-white/50 tracking-widest uppercase mb-1">
          [{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}]
        </span>

        <span className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none drop-shadow-sm">
          {startYear}
        </span>
      </div>

      {/* ── 2. Center: Timeline Node (Anchored on the connecting line) ── */}
      <div className="relative flex items-center justify-center h-6 w-full z-10">
        <motion.div
          style={{ boxShadow: nodeGlow }}
          className="w-4 h-4 rounded-full bg-white ring-2 ring-white/30"
        />
      </div>

      {/* ── 3. Bottom: Milestone Information ── */}
      <div className="flex flex-col items-center pt-5 px-3 max-w-[310px]">
        {/* Company Title */}
        <h3 className="font-heading font-bold text-lg sm:text-xl md:text-2xl text-white tracking-tight leading-snug">
          {item.company}
        </h3>

        {/* Role Subtitle in Refined Italics */}
        <p className="font-body italic text-sm sm:text-base text-[#93C5FD] mt-1 line-clamp-2">
          {item.role}
        </p>

        {/* Metadata Pill */}
        <div className="inline-flex items-center gap-1.5 font-mono text-[11px] text-white/70 bg-white/10 px-3 py-1 rounded-full border border-white/15 my-2.5">
          <Calendar size={11} className="text-[#93C5FD]" />
          <span>{item.period}</span>
          <span className="opacity-40">•</span>
          <MapPin size={11} className="text-[#93C5FD]" />
          <span>{item.location}</span>
        </div>

        {/* Concise Description */}
        <p className="font-body text-xs sm:text-sm text-white/80 leading-relaxed line-clamp-3">
          {item.description}
        </p>
      </div>
    </motion.article>
  );
};
