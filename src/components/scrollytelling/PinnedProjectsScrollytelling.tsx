"use client";

import React, { useRef, useState, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const total = items.length;
    const index = Math.min(total - 1, Math.max(0, Math.floor(latest * total)));
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
    <div ref={containerRef} className="relative h-[480vh] w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-20 px-3 sm:px-6 py-4 sm:py-6">
        <div className="w-full max-w-7xl">
          <ProjectsShowcaseStage
            items={items}
            activeIndex={activeIndex}
            jumpToProject={jumpToProject}
          />
        </div>
      </div>
    </div>
  );
};
