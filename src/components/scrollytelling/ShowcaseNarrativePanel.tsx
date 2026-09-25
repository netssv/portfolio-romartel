"use client";

import React from "react";
import { motion, AnimatePresence, type MotionValue } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";
import type { PinnedProjectItem } from "./PinnedProjectsScrollytelling";

const GithubIcon = ({ size = 13 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2.25" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface ShowcaseNarrativePanelProps {
  active: PinnedProjectItem;
  activeIndex: number;
  items: PinnedProjectItem[];
  jumpToProject: (index: number) => void;
  narrativeX: MotionValue<number>;
  narrativeOpacity: MotionValue<number>;
}

export const ShowcaseNarrativePanel: React.FC<ShowcaseNarrativePanelProps> = ({
  active,
  activeIndex,
  items,
  jumpToProject,
  narrativeX,
  narrativeOpacity,
}) => {
  return (
    <motion.div
      style={{ x: narrativeX, opacity: narrativeOpacity }}
      className="col-span-1 lg:col-span-4 p-4 sm:p-6 lg:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/15"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`text-${active.id}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="space-y-2.5 sm:space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-white/10 border border-white/20 text-blue-200">
            <Sparkles size={11} className="text-blue-300" />
            <span>{active.category}</span>
          </div>
          <div className="space-y-1 sm:space-y-2">
            <p style={{ color: "#BFDBFE" }} className="font-mono text-xs uppercase tracking-widest text-blue-200 font-medium">
              {active.subtitle || active.title}
            </p>
            <p style={{ color: "#FFFFFF" }} className="text-xs sm:text-base text-white leading-relaxed font-body line-clamp-2 sm:line-clamp-none">
              {active.description}
            </p>
          </div>
          {active.story && (
            <div className="hidden sm:block border-l-2 border-blue-300/40 pl-3 py-0.5">
              <p className="text-xs text-blue-100/80 font-body leading-relaxed italic">{active.story}</p>
            </div>
          )}
          {active.tags && active.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {active.tags.slice(0, 5).map((tag) => (
                <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono bg-white/10 text-white/90 border border-white/15">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Action Links & Stepper */}
      <div className="pt-3 sm:pt-6 mt-2 sm:mt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {active.links.demo && (
            <a href={active.links.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-white text-[#21426E] hover:bg-white/90 shadow-md transition-all">
              <span>Live Demo</span><ExternalLink size={12} />
            </a>
          )}
          {active.links.github && (
            <a href={active.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-white/10 text-white border border-white/25 hover:bg-white/20 transition-all">
              <GithubIcon size={13} /><span>GitHub</span>
            </a>
          )}
        </div>
        <div className="flex items-center gap-1.5" aria-label="Project pagination">
          {items.map((it, idx) => (
            <button
              key={it.id}
              type="button"
              onClick={() => jumpToProject(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${idx === activeIndex ? "w-6 bg-white" : "w-2 bg-white/25 hover:bg-white/50"}`}
              aria-label={`Jump to project ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
