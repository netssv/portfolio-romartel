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
  mediaX?: any;
  mediaScale?: any;
  mediaOpacity?: any;
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
  mediaX,
  mediaScale,
  mediaOpacity,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="col-span-1 lg:col-span-7 relative p-2 sm:p-6 lg:p-10 flex items-center justify-center overflow-hidden">
      {/* Active Front Card: minimizes to the left side and fades out */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`card-${active.id}`}
          style={{
            x: mediaX,
            scale: mediaScale,
            opacity: mediaOpacity,
            transformOrigin: "left center",
          }}
          initial={{ opacity: 0, scale: 0.92, y: 35, x: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
          exit={{
            opacity: 0,
            scale: 0.78,
            x: -95,
            transition: { duration: 0.4, ease: [0.65, 0, 0.35, 1] },
          }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative w-full max-w-sm sm:max-w-xl lg:max-w-2xl rounded-xl sm:rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden z-10 group"
        >
          {/* Media Viewport */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/20">
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
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded-full text-white border border-white/15">
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
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Layered Peeking Next Card on the Right */}
      {nextItem && (
        <div
          onClick={() => jumpToProject(nextIndex)}
          className="absolute right-[-10%] lg:right-[-6%] w-full max-w-sm sm:max-w-md rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm shadow-[0_20px_50px_-15px_rgba(0,0,0,0.35)] overflow-hidden opacity-35 hover:opacity-85 scale-90 translate-x-6 transition-all hidden md:block cursor-pointer select-none"
          title={`Next: ${nextItem.title}`}
        >
          <div className="aspect-[16/10] bg-black/20 overflow-hidden">
            <img
              src={nextItem.imageSrc || "/projects/metropolyca.png"}
              alt={nextItem.title}
              className="w-full h-full object-cover opacity-60 hover:opacity-80 transition-opacity"
            />
          </div>
        </div>
      )}
    </div>
  );
};
