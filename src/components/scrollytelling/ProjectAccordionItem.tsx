"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import type { PinnedProjectItem } from "./PinnedProjectsScrollytelling";
import { ShowcaseHeaderBar } from "./ShowcaseHeaderBar";
import { ShowcaseNarrativePanel } from "./ShowcaseNarrativePanel";
import { ShowcaseMediaCard } from "./ShowcaseMediaCard";

interface ProjectAccordionItemProps {
  item: PinnedProjectItem;
  index: number;
  totalCount: number;
  items: PinnedProjectItem[];
  jumpToProject: (index: number) => void;
  scrollYProgress: MotionValue<number>;
  activeIndex: number;
  isLast: boolean;
}

export const ProjectAccordionItem: React.FC<ProjectAccordionItemProps> = ({
  item,
  index,
  totalCount,
  items,
  jumpToProject,
  scrollYProgress,
  activeIndex,
  isLast,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [mounted, setMounted] = useState(false);

  const isActive = activeIndex === index;
  const formattedIndex = String(index + 1).padStart(2, "0");
  const total = String(totalCount).padStart(2, "0");

  useEffect(() => {
    setMounted(true);
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) { videoRef.current.pause(); setIsPlaying(false); }
    else { videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {}); }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Accordion visual height collapses as scroll advances through this project's slice
  const visualHeight = useTransform(scrollYProgress, (raw) => {
    if (isLast || !mounted || typeof window === "undefined") return "calc(100dvh - 5rem)";
    const s = raw * (totalCount - 1);
    const barH = window.innerWidth >= 640 ? 80 : 64;
    const availHeight = Math.max(0, window.innerHeight - barH);

    if (s <= index + 0.25) return `${availHeight}px`;
    if (s >= index + 0.85) return "0px";
    const t = (s - (index + 0.25)) / 0.60;
    return `${Math.round((1 - t) * availHeight)}px`;
  });

  const narrativeOpacity = useTransform(scrollYProgress, (raw) => {
    if (isLast) return 1;
    const s = raw * (totalCount - 1);
    if (s <= index + 0.25) return 1;
    if (s >= index + 0.70) return 0;
    return 1 - (s - (index + 0.25)) / 0.45;
  });

  const narrativeX = useTransform(scrollYProgress, (raw) => {
    if (isLast) return 0;
    const s = raw * (totalCount - 1);
    if (s <= index + 0.25) return 0;
    if (s >= index + 0.85) return -35;
    return -35 * ((s - (index + 0.25)) / 0.60);
  });

  // Directional clipPath: appears from left to right on entry, disappears towards the right on exit
  const clipPath = useTransform(scrollYProgress, (raw) => {
    if (!mounted || typeof window === "undefined") return "inset(0 0% 0 0)";
    const s = raw * (totalCount - 1);

    // Entrance phase (project index - 1 -> index): reveals from left to right
    if (index > 0 && s < index) {
      const startReveal = index - 1 + 0.20;
      if (s <= startReveal) return "inset(0 100% 0 0)";
      const t = (s - startReveal) / (index - startReveal);
      const rightInset = Math.round((1 - Math.min(1, Math.max(0, t))) * 100);
      return `inset(0 ${rightInset}% 0 0)`;
    }

    // Active phase
    if (isLast || s <= index + 0.20) {
      return "inset(0 0% 0 0)";
    }

    // Exit phase (project index -> index + 1): disappears towards the right
    const exitStart = index + 0.20;
    const exitEnd = index + 0.85;
    if (s >= exitEnd) return "inset(0 0 0 100%)";
    const t = (s - exitStart) / (exitEnd - exitStart);
    const leftInset = Math.round(Math.min(1, Math.max(0, t)) * 100);
    return `inset(0 0 0 ${leftInset}%)`;
  });

  const mediaX = useTransform(scrollYProgress, (raw) => {
    if (isLast || !mounted || typeof window === "undefined") return 0;
    const s = raw * (totalCount - 1);
    if (s <= index + 0.20) return 0;
    if (s >= index + 0.85) return 30;
    const t = (s - (index + 0.20)) / 0.65;
    return Math.round(t * 30);
  });

  const mediaOpacity = useTransform(scrollYProgress, (raw) => {
    if (isLast || !mounted || typeof window === "undefined") return 1;
    const s = raw * (totalCount - 1);
    if (s <= index + 0.50) return 1;
    if (s >= index + 0.85) return 0;
    return 1 - (s - (index + 0.50)) / 0.35;
  });

  return (
    <div className="w-full flex flex-col flex-none select-none">
      {/* Pinned Title Bar */}
      <ShowcaseHeaderBar
        index={formattedIndex}
        total={total}
        title={item.title}
        className="bg-black/20 backdrop-blur-md shrink-0"
      />

      {/* Collapsible Visual Stage: Narrative on left, Media Card on right */}
      <motion.div
        suppressHydrationWarning
        style={{ height: mounted ? visualHeight : "calc(100dvh - 5rem)" }}
        className="w-full overflow-hidden flex flex-col justify-center relative bg-[#21426E] dark:bg-[#162C4E]"
      >
        <div className="w-full h-full flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-0 sm:min-h-[500px]">
            <ShowcaseNarrativePanel
              active={item}
              activeIndex={index}
              items={items}
              jumpToProject={jumpToProject}
              narrativeX={narrativeX}
              narrativeOpacity={narrativeOpacity}
            />
            <ShowcaseMediaCard
              active={item}
              jumpToProject={jumpToProject}
              videoRef={videoRef}
              isPlaying={isPlaying}
              isMuted={isMuted}
              togglePlay={togglePlay}
              toggleMute={toggleMute}
              mediaOpacity={mediaOpacity}
              mediaX={mediaX}
              clipPath={clipPath}
              isActive={isActive}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
