"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useTransform, useMotionValue, type MotionValue } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";
import type { PinnedProjectItem } from "./PinnedProjectsScrollytelling";
import { ShowcaseMediaCard } from "./ShowcaseMediaCard";

const GithubIcon = ({ size = 13 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2.25" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface ProjectsShowcaseStageProps {
  items: PinnedProjectItem[];
  activeIndex: number;
  jumpToProject: (index: number) => void;
  transitionProgress?: MotionValue<number>;
}

export const ProjectsShowcaseStage: React.FC<ProjectsShowcaseStageProps> = ({
  items,
  activeIndex,
  jumpToProject,
  transitionProgress,
}) => {
  const active = items[activeIndex] || items[0];
  const nextIndex = (activeIndex + 1) % items.length;
  const nextItem = activeIndex < items.length - 1 ? items[activeIndex + 1] : undefined;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const fallbackProgress = useMotionValue(0);
  const progress = transitionProgress || fallbackProgress;

  const visualHeight = useTransform(progress, [0, 1], ["540px", "0px"]);
  const narrativeX = useTransform(progress, [0, 1], [0, -35]);
  const narrativeOpacity = useTransform(progress, [0, 0.65], [1, 0]);

  const mediaX = useTransform(progress, [0, 1], [0, -95]);
  const mediaScale = useTransform(progress, [0, 1], [1, 0.78]);
  const mediaOpacity = useTransform(progress, [0, 0.85, 1], [1, 0.6, 0]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [activeIndex]);

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

  const formattedIndex = String(activeIndex + 1).padStart(2, "0");
  const nextFormattedIndex = String(activeIndex + 2).padStart(2, "0");
  const totalCount = String(items.length).padStart(2, "0");

  return (
    <div className="w-full bg-[#21426E] dark:bg-[#162C4E] text-white overflow-hidden">
      {/* Current Full-Bleed Header Bar */}
      <div className="w-full px-6 sm:px-12 lg:px-16 py-4 sm:py-5 border-t border-b border-white/20 flex items-center justify-between bg-black/15 select-none">
        <div className="flex items-center gap-4">
          <span className="font-mono font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white">[{formattedIndex}]</span>
          <span className="font-mono text-xs sm:text-sm text-blue-200/90 font-medium">{formattedIndex} / {totalCount}</span>
        </div>
        <h3
          style={{ color: "#FFFFFF" }}
          className="font-heading font-black text-lg sm:text-2xl md:text-3xl lg:text-4xl uppercase tracking-wider text-right !text-white text-white drop-shadow-xs truncate max-w-[65%] sm:max-w-[75%]"
        >
          <span style={{ color: "#FFFFFF" }} className="!text-white text-white">{active.title}</span>
        </h3>
      </div>

      {/* Collapsible Split Stage: Narrative + Media (Collapses to 0 as scroll advances) */}
      <motion.div style={{ height: visualHeight }} className="overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px] sm:min-h-[540px]">
          {/* Narrative Left Column */}
          <motion.div
            style={{ x: narrativeX, opacity: narrativeOpacity }}
            className="col-span-1 lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/15"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${active.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-white/10 border border-white/20 text-blue-200">
                  <Sparkles size={11} className="text-blue-300" />
                  <span>{active.category}</span>
                </div>
                <div className="space-y-2">
                  <p style={{ color: "#BFDBFE" }} className="font-mono text-xs uppercase tracking-widest text-blue-200 font-medium">
                    {active.subtitle || active.title}
                  </p>
                  <p style={{ color: "#FFFFFF" }} className="text-sm sm:text-base text-white leading-relaxed font-body">
                    {active.description}
                  </p>
                </div>
                {active.story && (
                  <div className="border-l-2 border-blue-300/40 pl-3 py-0.5">
                    <p className="text-xs text-blue-100/80 font-body leading-relaxed italic">{active.story}</p>
                  </div>
                )}
                {active.tags && active.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {active.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-white/10 text-white/90 border border-white/15">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Action Links & Stepper */}
            <div className="pt-6 mt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
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

          {/* Floating Media Viewport on the Right */}
          <ShowcaseMediaCard
            active={active}
            nextItem={nextItem}
            nextIndex={nextIndex}
            jumpToProject={jumpToProject}
            videoRef={videoRef}
            isPlaying={isPlaying}
            isMuted={isMuted}
            togglePlay={togglePlay}
            toggleMute={toggleMute}
            mediaX={mediaX}
            mediaScale={mediaScale}
            mediaOpacity={mediaOpacity}
          />
        </div>
      </motion.div>

      {/* Rising Next Project Title Bar ("va subiendo el nuevo titulo") */}
      {nextItem && (
        <div className="w-full px-6 sm:px-12 lg:px-16 py-4 sm:py-5 border-t border-b border-white/20 flex items-center justify-between bg-black/25 backdrop-blur-md select-none">
          <div className="flex items-center gap-4">
            <span className="font-mono font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white/90">[{nextFormattedIndex}]</span>
            <span className="font-mono text-xs sm:text-sm text-blue-200/90 font-medium">{nextFormattedIndex} / {totalCount}</span>
          </div>
          <h3
            style={{ color: "#FFFFFF" }}
            className="font-heading font-black text-lg sm:text-2xl md:text-3xl lg:text-4xl uppercase tracking-wider text-right !text-white text-white drop-shadow-xs truncate max-w-[65%] sm:max-w-[75%]"
          >
            <span style={{ color: "#FFFFFF" }} className="!text-white text-white">{nextItem.title}</span>
          </h3>
        </div>
      )}
    </div>
  );
};
