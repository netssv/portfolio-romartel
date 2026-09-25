"use client";

import React from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import type { PinnedProjectItem } from "./PinnedProjectsScrollytelling";
import { ProjectAccordionItem } from "./ProjectAccordionItem";

interface ProjectsShowcaseStageProps {
  items: PinnedProjectItem[];
  activeIndex: number;
  jumpToProject: (index: number) => void;
  scrollYProgress: MotionValue<number>;
}

export const ProjectsShowcaseStage: React.FC<ProjectsShowcaseStageProps> = ({
  items,
  activeIndex,
  jumpToProject,
  scrollYProgress,
}) => {
  // Drives the upward list translation, pushing older headers off as incoming ones dock
  const listY = useTransform(scrollYProgress, (raw) => {
    if (typeof window === "undefined") return "0px";
    const totalTransitions = items.length - 1;
    const s = raw * totalTransitions;
    const barH = window.innerWidth >= 640 ? 80 : 64;

    const k = Math.min(totalTransitions - 1, Math.max(0, Math.floor(s)));
    const f = s - k;

    let offset = -k * barH;
    if (f > 0.85) {
      const t = (f - 0.85) / 0.15;
      offset -= t * barH;
    }
    return `${Math.round(offset)}px`;
  });

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#21426E] dark:bg-[#162C4E] text-white">
      <motion.div
        style={{ y: listY }}
        className="w-full flex flex-col will-change-transform"
      >
        {items.map((item, idx) => (
          <ProjectAccordionItem
            key={item.id}
            item={item}
            index={idx}
            totalCount={items.length}
            items={items}
            jumpToProject={jumpToProject}
            scrollYProgress={scrollYProgress}
            activeIndex={activeIndex}
            isLast={idx === items.length - 1}
          />
        ))}
      </motion.div>
    </div>
  );
};
