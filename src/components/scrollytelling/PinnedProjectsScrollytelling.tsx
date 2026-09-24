"use client";

import React, { useRef, useState } from "react";
import { useScroll, useMotionValueEvent, useMotionValue } from "framer-motion";
import { ProjectsShowcaseStage } from "./ProjectsShowcaseStage";

export interface PinnedProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  eyebrow: string;
  description: string;
  story: string;
  metrics: { label: string; value: string }[];
  tags?: string[];
  links: { demo: string; github: string };
  videoSrc?: string;
  imageSrc?: string;
  icon?: string;
}

export const PinnedProjectsScrollytelling: React.FC<{ items: PinnedProjectItem[] }> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const transitionProgress = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const total = items.length;
    const raw = latest * (total - 1);
    const index = Math.min(total - 1, Math.max(0, Math.floor(raw)));
    const frac = raw - index;
    transitionProgress.set(frac);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  const jumpToProject = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const targetScroll = scrollTop + (index / (items.length - 1)) * (rect.height - window.innerHeight);
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="relative h-[480vh] w-full bg-[#21426E] dark:bg-[#162C4E]">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden z-20">
        <ProjectsShowcaseStage
          items={items}
          activeIndex={activeIndex}
          jumpToProject={jumpToProject}
          transitionProgress={transitionProgress}
        />
      </div>
    </div>
  );
};
