"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Film, Trophy, LineChart, Terminal, Cpu, Bluetooth, Smartphone, Search, Layers, ChevronDown, Sparkles } from "lucide-react";
import { CornerReticle } from "@/src/components/ui/CornerReticle";
import type { PinnedProjectItem } from "./PinnedProjectsScrollytelling";

const ICONS: Record<string, React.ReactNode> = {
  Film: <Film size={13} className="text-accent" />,
  Trophy: <Trophy size={13} className="text-accent" />,
  LineChart: <LineChart size={13} className="text-accent" />,
  Terminal: <Terminal size={13} className="text-accent" />,
  Cpu: <Cpu size={13} className="text-accent" />,
  Bluetooth: <Bluetooth size={13} className="text-accent" />,
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
        <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-accent/15 text-accent border border-accent/30 flex items-center gap-1.5 shadow-sm">
          {ICONS[active.icon || ""] || <Layers size={13} className="text-accent" />}
          <span>{active.eyebrow}</span>
        </span>
        <span className="text-[11px] font-mono text-text-muted font-medium">
          0{activeIndex + 1} / 0{totalItems}
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
                aria-label={`Jump to project 0${i + 1}: ${item.title}`}
                className={`h-2 rounded-full transition-all duration-200 cursor-pointer focus:outline-none ${
                  i === activeIndex ? "w-7 bg-accent shadow-[0_0_10px_rgba(255,149,0,0.9)]" : "w-2 bg-border-base hover:bg-text-muted"
                }`}
              />
              <AnimatePresence>
                {hoveredDot === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.12 }}
                    className="absolute -top-9 px-2.5 py-1 rounded-md bg-bg-surface border border-border-subtle text-[10px] font-mono font-semibold text-text-primary whitespace-nowrap shadow-2xl pointer-events-none z-30 flex items-center gap-1.5"
                  >
                    <span className="text-accent font-bold">0{i + 1}</span>
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
        <h3 className="text-2.5xl sm:text-3.5xl lg:text-4.5xl font-heading font-black text-text-primary tracking-tight leading-none mb-1">
          {active.title}
        </h3>
        <p className="text-xs sm:text-sm font-mono font-bold text-accent mb-3">
          {active.subtitle}
        </p>

        {/* Metric Badges */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {active.metrics.map((m, idx) => (
            <div key={idx} className="flex flex-col px-3.5 py-2 rounded-xl bg-bg-surface border border-border-subtle shadow-sm">
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">{m.label}</span>
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
            className="relative h-10 px-5 flex items-center justify-center gap-1.5 rounded-xl bg-accent text-black font-body font-bold text-xs shadow-[0_4px_20px_rgba(255,149,0,0.35)] hover:shadow-[0_4px_30px_rgba(255,149,0,0.6)] transition-all cursor-pointer"
          >
            <CornerReticle size={4} color="rgba(0,0,0,0.4)" />
            <span>Launch Project</span>
            <ArrowUpRight size={13} />
          </a>

          <button
            type="button"
            onClick={() => setIsDeepDiveOpen(!isDeepDiveOpen)}
            className={`relative h-10 px-4 flex items-center justify-center gap-1.5 rounded-xl border text-xs font-body font-semibold transition-all cursor-pointer ${
              isDeepDiveOpen
                ? "border-accent bg-accent/10 text-accent"
                : "border-border-subtle bg-bg-surface text-text-secondary hover:border-border-base hover:text-text-primary"
            }`}
          >
            <Sparkles size={12} className={isDeepDiveOpen ? "text-accent" : "text-text-muted"} />
            <span>{isDeepDiveOpen ? "Close Details" : "Deep Dive & Architecture"}</span>
            <ChevronDown size={13} className={`transition-transform duration-200 ${isDeepDiveOpen ? "rotate-180" : ""}`} />
          </button>

          <a
            href={active.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-3.5 flex items-center justify-center rounded-xl border border-border-subtle bg-bg-surface text-text-muted hover:text-text-primary hover:border-border-base text-xs font-mono transition-all"
            aria-label="GitHub Repository"
          >
            <span>Code</span>
          </a>
        </div>

        {/* Deep Dive Drawer */}
        <AnimatePresence>
          {isDeepDiveOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="p-3.5 rounded-xl border border-border-subtle bg-bg-surface shadow-xl flex flex-col gap-2 text-xs">
                <p className="text-text-secondary font-body leading-relaxed">
                  {active.description}
                </p>
                <div className="flex items-start gap-2 pt-2 border-t border-border-subtle">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-text shrink-0 mt-0.5" />
                  <p className="font-mono text-text-secondary text-[11px] leading-snug">
                    <span className="font-semibold text-text-primary">Execution: </span>
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
