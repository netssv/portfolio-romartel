"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2 } from "lucide-react";
import { CornerReticle } from "@/src/components/ui/CornerReticle";
import type { PinnedProjectItem } from "./PinnedProjectsScrollytelling";

interface ProjectMediaStageProps {
  active: PinnedProjectItem;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isPlaying: boolean;
  isMuted: boolean;
  togglePlay: () => void;
  toggleMute: () => void;
  isVerticalMedia: boolean;
  setIsVerticalMedia: (isVertical: boolean) => void;
}

export const ProjectMediaStage: React.FC<ProjectMediaStageProps> = ({
  active,
  videoRef,
  isPlaying,
  isMuted,
  togglePlay,
  toggleMute,
  isVerticalMedia,
  setIsVerticalMedia,
}) => {
  const [isHoverExpanded, setIsHoverExpanded] = useState(false);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearHoverTimer = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    clearHoverTimer();
    hoverTimerRef.current = setTimeout(() => {
      setIsHoverExpanded(true);
    }, 1200);
  };

  const handleMouseLeave = () => {
    clearHoverTimer();
    setIsHoverExpanded(false);
  };

  useEffect(() => {
    setIsHoverExpanded(false);
    clearHoverTimer();
  }, [active.id]);

  useEffect(() => {
    return () => clearHoverTimer();
  }, []);

  const isPhoneMockup = isVerticalMedia || active.id === "rebusca";

  return (
    <div
      className="w-full lg:col-span-6 flex justify-center items-center z-10 min-h-[260px] sm:min-h-[320px] lg:min-h-[440px]"
      style={{ perspective: "1200px" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        layout
        animate={{
          scale: isHoverExpanded ? (isPhoneMockup ? 1.15 : 1.25) : 1,
          zIndex: isHoverExpanded ? 40 : 10,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className={`relative overflow-hidden border border-border-subtle bg-bg-surface shadow-2xl mirror-reflect-base transition-all duration-500 ${
          isHoverExpanded ? "ring-2 ring-accent shadow-[0_30px_100px_rgba(0,0,0,0.6)]" : ""
        } ${
          isPhoneMockup
            ? "w-[240px] sm:w-[280px] lg:w-[300px] aspect-[9/18] max-h-[52vh] sm:max-h-[58vh] lg:max-h-[460px] rounded-[32px] ring-2 ring-border-subtle shadow-[0_0_50px_rgba(255,149,0,0.15)]"
            : "w-full aspect-video max-h-[36vh] sm:max-h-[42vh] lg:max-h-none rounded-2xl"
        }`}
      >
        <CornerReticle size={8} color="rgba(255, 149, 0, 0.5)" />

        {/* Dynamic notch for smartphone card */}
        {isPhoneMockup && (
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-black/90 rounded-full border border-white/10 z-30 pointer-events-none flex items-center justify-end px-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
          </div>
        )}

        {/* Hover zoom indicator chip */}
        <AnimatePresence>
          {isHoverExpanded && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="absolute top-3 right-3 z-40 px-2 py-1 rounded-md bg-black/85 backdrop-blur-md border border-white/20 text-[10px] font-mono text-accent flex items-center gap-1 shadow-xl pointer-events-none"
            >
              <Maximize2 size={10} className="text-accent" />
              <span>Expanded</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div key={active.id} className="w-full h-full relative flex items-center justify-center overflow-hidden bg-black">
          {active.videoSrc ? (
            <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
              <video
                ref={videoRef}
                src={active.videoSrc}
                poster={active.imageSrc || "/projects/metropolyca.png"}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="auto"
                onLoadedMetadata={(e) => {
                  setIsVerticalMedia(e.currentTarget.videoHeight > e.currentTarget.videoWidth);
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 z-20">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                  className="p-1.5 sm:p-2 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-white hover:text-accent transition-all cursor-pointer"
                >
                  {isPlaying ? <Pause size={12} /> : <Play size={12} className="fill-current" />}
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                  className="p-1.5 sm:p-2 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-white hover:text-accent transition-all cursor-pointer flex items-center gap-1"
                >
                  {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} className="text-accent" />}
                  <span className="text-[10px] font-mono font-semibold hidden sm:inline">{isMuted ? "Muted" : "Audio On"}</span>
                </button>
              </div>
            </div>
          ) : (
            <img
              src={active.imageSrc || "/projects/fifa-predictor.png"}
              alt={active.title}
              onLoad={(e) => {
                setIsVerticalMedia(e.currentTarget.naturalHeight > e.currentTarget.naturalWidth);
              }}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </motion.div>
    </div>
  );
};
