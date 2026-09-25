"use client";

import React from "react";
import { motion } from "framer-motion";
import { CaseStudy } from "@/src/data/i18n/caseStudies";

interface CaseStudyTabsProps {
  items: CaseStudy[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export const CaseStudyTabs: React.FC<CaseStudyTabsProps> = ({
  items,
  activeIndex,
  onSelect,
}) => {
  return (
    <div
      className="flex flex-wrap items-center justify-start md:justify-center gap-2 mb-12"
      role="tablist"
      aria-label="Case Studies"
    >
      {items.map((item, idx) => {
        const isActive = activeIndex === idx;
        const Icon = item.icon;
        const indexStr = String(idx + 1).padStart(2, "0");

        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(idx)}
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
              isActive
                ? "text-white font-semibold"
                : "text-text-secondary hover:text-text-primary bg-bg-surface/60 border border-border-subtle hover:border-border-base"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="case-study-active-tab-pill"
                className="absolute inset-0 rounded-full bg-accent shadow-xs"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10 opacity-70">[{indexStr}]</span>
            <Icon size={13} className="relative z-10" />
            <span className="relative z-10 font-body font-medium">{item.tag}</span>
          </button>
        );
      })}
    </div>
  );
};
