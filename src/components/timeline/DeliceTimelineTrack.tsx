"use client";

import React from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import type { ExperienceItem } from "../scrollytelling/PinnedExperienceScrollytelling";
import { DeliceTimelineCard } from "./DeliceTimelineCard";

interface DeliceTimelineTrackProps {
  items: ExperienceItem[];
  scrollYProgress: MotionValue<number>;
}

export const DeliceTimelineTrack: React.FC<DeliceTimelineTrackProps> = ({
  items,
  scrollYProgress,
}) => {
  // Chronological order from past to present: 2018 (left) -> 2025 (right)
  const chronologicalItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const yearA = parseInt(a.period.split(" - ")[0].trim(), 10) || 0;
      const yearB = parseInt(b.period.split(" - ")[0].trim(), 10) || 0;
      return yearA - yearB;
    });
  }, [items]);

  const total = chronologicalItems.length;
  const cardWidth = 320;
  const cardGap = 40;
  const cardPitch = cardWidth + cardGap; // 360px pitch
  const startOffsetRight = 240; // 2018 starts 240px to the right of center
  const totalTravel = startOffsetRight + (total - 1) * cardPitch; // 2040px exact travel

  // Calculates exact scroll progress (0 to 1) when card i docks cabal en medio (at 50vw)
  const getCenterProgress = (index: number) => {
    return (startOffsetRight + index * cardPitch) / totalTravel;
  };

  // Horizontal translation driven by vertical scroll
  const x = useTransform(scrollYProgress, [0, 1], [0, -totalTravel]);

  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* ── Continuous Horizontal Connecting Line (Spanning Full Viewport Width) ── */}
      <div
        className="absolute top-[108px] left-0 right-0 w-full h-[2px] bg-white/20 pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* ── Motion Track: Glides so each milestone aligns precisely at 50vw ── */}
      <motion.div
        style={{
          x,
          // When x = -startOffsetRight, Card 0 center aligns exactly with 50vw
          paddingLeft: `calc(50vw + ${startOffsetRight - cardWidth / 2}px)`,
          paddingRight: "50vw",
        }}
        className="flex gap-[40px] py-4 w-max relative z-10 will-change-transform"
      >
        {/* Track-level connecting line linking all nodes */}
        <div
          className="absolute top-[108px] left-0 right-0 min-w-full h-[2px] bg-white/30 pointer-events-none z-0"
          aria-hidden="true"
        />

        {chronologicalItems.map((item, idx) => (
          <DeliceTimelineCard
            key={`${item.company}-${idx}`}
            item={item}
            index={idx}
            total={total}
            scrollYProgress={scrollYProgress}
            centerProgress={getCenterProgress(idx)}
          />
        ))}
      </motion.div>
    </div>
  );
};
