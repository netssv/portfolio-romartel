"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, ExternalLink } from "lucide-react";
import type { PinnedProjectItem } from "./PinnedProjectsScrollytelling";

interface ShowcaseMediaCardProps {
  active: PinnedProjectItem;
  nextItem?: PinnedProjectItem;
  nextIndex: number;
  jumpToProject: (index: number) => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isPlaying: boolean;
  isMuted: boolean;
  togglePlay: () => void;
  toggleMute: () => void;
}

export const ShowcaseMediaCard: React.FC<ShowcaseMediaCardProps> = ({
  active,
  nextItem,
  nextIndex,
  jumpToProject,
  videoRef,
  isPlaying,
  isMuted,
  togglePlay,
  toggleMute,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="col-span-1 lg:col-span-7 relative p-4 sm:p-8 lg:p-10 flex items-center justify-center overflow-hidden">
      {/* Active Front Card with rightward reduction & disappear exit animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`card-${active.id}`}
          initial={{ opacity: 0, scale: 0.92, y: 35, x: 0 }}
          animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
          exit={{
            opacity: 0,
            scale: 0.82,
            x: 85,
            transition: { duration: 0.42, ease: [0.65, 0, 0.35, 1] },
          }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative w-full max-w-xl rounded-xl sm:rounded-2xl border border-white/20 bg-black/40 backdrop-blur-md shadow-2xl overflow-hidden z-10"
        >
          {/* Browser Window Chrome */}
          <div className="w-full px-3.5 py-2.5 bg-black/30 border-b border-white/10 flex items-center justify-between text-xs select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/90" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/90" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/90" />
            </div>
            <span className="font-mono text-[11px] text-white/60 truncate max-w-[200px]">
              {active.links.demo ? new URL(active.links.demo).hostname : active.id}
            </span>
            <div className="w-8" />
          </div>

          {/* Media Viewport */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
            {isMounted && active.videoSrc ? (
              <div className="relative w-full h-full" suppressHydrationWarning>
                <video
                  ref={videoRef}
                  src={active.videoSrc}
                  poster={active.imageSrc || "/projects/metropolyca.png"}
                  preload="none"
                  muted={isMuted}
                  loop
                  playsInline
                  suppressHydrationWarning
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-black/70 backdrop-blur-md px-2.5 py-1.5 rounded-full text-white border border-white/15">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="p-1 hover:text-blue-300 transition-colors cursor-pointer"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                  </button>
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="p-1 hover:text-blue-300 transition-colors cursor-pointer"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                  </button>
                </div>
              </div>
            ) : (
              <img
                src={active.imageSrc || "/projects/metropolyca.png"}
                alt={active.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Layered Peeking Next Card on the Right */}
      {nextItem && (
        <div
          onClick={() => jumpToProject(nextIndex)}
          className="absolute right-[-10%] lg:right-[-6%] w-full max-w-sm rounded-xl border border-white/15 bg-black/30 backdrop-blur-sm shadow-xl overflow-hidden opacity-30 hover:opacity-75 scale-90 translate-x-8 transition-all hidden md:block cursor-pointer select-none"
          title={`Next: ${nextItem.title}`}
        >
          <div className="w-full px-3 py-2 bg-black/40 border-b border-white/10 flex items-center justify-between text-[10px]">
            <span className="font-mono text-white/70 truncate">{nextItem.title}</span>
            <span className="font-mono text-blue-200 flex items-center gap-1">Next <ExternalLink size={10} /></span>
          </div>
          <div className="aspect-[16/10] bg-black/40 overflow-hidden">
            <img
              src={nextItem.imageSrc || "/projects/metropolyca.png"}
              alt={nextItem.title}
              className="w-full h-full object-cover opacity-50"
            />
          </div>
        </div>
      )}
    </div>
  );
};
