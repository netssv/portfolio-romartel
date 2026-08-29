"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Film, Trophy, LineChart, Cpu, Smartphone, Search, Layers, ChevronDown, Sparkles } from "lucide-react";
import type { PinnedProjectItem } from "./PinnedProjectsScrollytelling";

const ICONS: Record<string, React.ReactNode> = {
  Film: <Film size={13} className="text-accent" />,
  Trophy: <Trophy size={13} className="text-accent" />,
  LineChart: <LineChart size={13} className="text-accent" />,
  Cpu: <Cpu size={13} className="text-accent" />,
  Bluetooth: (
    <svg viewBox="0 0 24 24" width={13} height={13} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
      <polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5" />
    </svg>
  ),
  Smartphone: <Smartphone size={13} className="text-accent" />,
  Search: <Search size={13} className="text-accent" />,
};

interface PinnedProjectDetailsProps {
  active: PinnedProjectItem;
  activeIndex: number;
  totalItems: number;
  items: PinnedProjectItem[];
  jumpToProject: (index: number) => void;
  isDeepDiveOpen: boolean;
  setIsDeepDiveOpen: (open: boolean) => void;
}

export const PinnedProjectDetails: React.FC<PinnedProjectDetailsProps> = ({
  active,
  activeIndex,
  totalItems,
  items,
  jumpToProject,
  isDeepDiveOpen,
  setIsDeepDiveOpen,
}) => {
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);

  return (
    <div className="w-full lg:col-span-6 flex flex-col justify-center z-10">
      <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
        <span className="px-2.5 py-1 rounded-lg text-xs font-body font-semibold bg-accent/10 text-accent border border-accent/20 flex items-center gap-1.5 shadow-xs">
          {ICONS[active.icon || ""] || <Layers size={13} className="text-accent" />}
          <span>{active.eyebrow}</span>
        </span>
        <span className="text-xs font-body text-text-muted font-medium">
          {activeIndex + 1} of {totalItems}
        </span>

        {/* Project Jump Dots */}
        <div className="flex items-center gap-1.5 ml-auto">
          {items.map((item, i) => (
            <div key={item.id} className="relative flex items-center justify-center">
              <button
                type="button"
                onClick={() => jumpToProject(i)}
                onMouseEnter={() => setHoveredDot(i)}
                onMouseLeave={() => setHoveredDot(null)}
                aria-label={`Jump to project ${i + 1}: ${item.title}`}
                className={`h-2 rounded-full transition-all duration-200 cursor-pointer focus:outline-none ${
                  i === activeIndex
                    ? "w-6 bg-accent shadow-xs"
                    : "w-2 bg-border-base hover:bg-text-muted"
                }`}
              />
              <AnimatePresence>
                {hoveredDot === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.12 }}
                    className="absolute -top-8 px-2.5 py-1 rounded-md bg-bg-surface border border-border-subtle text-[11px] font-body font-medium text-text-primary whitespace-nowrap shadow-lg pointer-events-none z-30 flex items-center gap-1.5"
                  >
                    <span className="text-accent font-semibold">{i + 1}</span>
                    <span>·</span>
                    <span className="truncate max-w-[130px]">{item.title}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <div key={active.id} className="flex flex-col">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-text-primary tracking-tight leading-tight mb-1">
          {active.title}
        </h3>
        <p className="text-xs sm:text-sm font-body font-semibold text-accent mb-3.5">
          {active.subtitle}
        </p>

        {/* Metric Badges */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {active.metrics.map((m, idx) => (
            <div key={idx} className="flex flex-col px-3.5 py-2 rounded-xl bg-bg-surface border border-border-subtle shadow-xs">
              <span className="text-[10px] font-body text-text-muted uppercase tracking-wider font-semibold">{m.label}</span>
              <span className="text-xs sm:text-sm font-mono font-bold text-text-primary mt-0.5 truncate">{m.value}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2.5 items-center mb-3">
          <a
            href={active.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-5 flex items-center justify-center gap-1.5 rounded-xl bg-accent text-white font-body font-semibold text-xs shadow-xs hover:bg-accent-hover transition-all cursor-pointer"
          >
            <span>Launch Project</span>
            <ArrowUpRight size={13} />
          </a>

          <button
            type="button"
            onClick={() => setIsDeepDiveOpen(!isDeepDiveOpen)}
            className={`h-10 px-4 flex items-center justify-center gap-1.5 rounded-xl border text-xs font-body font-medium transition-all cursor-pointer ${
              isDeepDiveOpen
                ? "border-accent bg-accent/10 text-accent"
                : "border-border-subtle bg-bg-surface text-text-secondary hover:border-border-base hover:text-text-primary shadow-xs"
            }`}
          >
            <Sparkles size={12} className={isDeepDiveOpen ? "text-accent" : "text-text-muted"} />
            <span>{isDeepDiveOpen ? "Hide Breakdown" : "System Details"}</span>
            <ChevronDown size={13} className={`transition-transform duration-200 ${isDeepDiveOpen ? "rotate-180" : ""}`} />
          </button>

          <a
            href={active.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-3.5 flex items-center justify-center rounded-xl border border-border-subtle bg-bg-surface text-text-secondary hover:text-text-primary hover:border-border-base text-xs font-body font-medium transition-all shadow-xs"
            aria-label="GitHub Repository"
          >
            <span>Source</span>
          </a>
        </div>

        {/* Deep Dive Drawer */}
        <AnimatePresence>
          {isDeepDiveOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="p-3.5 rounded-xl border border-border-subtle bg-bg-surface shadow-md flex flex-col gap-2 text-xs">
                <p className="text-text-secondary font-body leading-relaxed">
                  {active.description}
                </p>
                <div className="flex items-start gap-2 pt-2 border-t border-border-subtle">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                  <p className="font-body text-text-secondary text-xs leading-snug">
                    <strong className="font-semibold text-text-primary">Execution: </strong>
                    {active.story}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
