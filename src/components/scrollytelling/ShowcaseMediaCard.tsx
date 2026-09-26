"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import type { PinnedProjectItem } from "./PinnedProjectsScrollytelling";

interface ShowcaseMediaCardProps {
  active: PinnedProjectItem;
  jumpToProject: (index: number) => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isPlaying: boolean;
  isMuted: boolean;
  togglePlay: () => void;
  toggleMute: () => void;
  mediaScale?: any;
  mediaOpacity?: any;
  mediaX?: any;
  clipPath?: any;
  isActive?: boolean;
}

export const ShowcaseMediaCard: React.FC<ShowcaseMediaCardProps> = ({
  active,
  videoRef,
  isPlaying,
  isMuted,
  togglePlay,
  toggleMute,
  mediaOpacity,
  mediaX,
  clipPath,
  isActive = false,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !videoRef.current || !active.videoSrc) return;
    const video = videoRef.current;
    video.muted = isMuted;

    // Play continuously as long as visible on screen, pause when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.02 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [isMounted, isMuted, active.videoSrc]);

  return (
    <div className="col-span-1 lg:col-span-8 relative p-2 sm:p-4 lg:p-6 flex items-center justify-start w-full overflow-hidden">
      {/* Aligned media card: reveals from left to right on entrance, disappears towards right on exit */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`card-${active.id}`}
          style={{
            opacity: mediaOpacity,
            x: mediaX,
            clipPath: clipPath,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative w-full aspect-[16/10] max-h-[calc(100dvh-6rem)] rounded-none border border-white/20 bg-white/5 backdrop-blur-md shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden z-10 group"
        >
          {/* Media Viewport: Widescreen visual with sharp borders */}
          <div className="relative w-full h-full overflow-hidden bg-black/20 rounded-none">
            {isMounted && active.videoSrc ? (
              <div className="relative w-full h-full" suppressHydrationWarning>
                <video
                  ref={videoRef}
                  src={active.videoSrc}
                  poster={active.imageSrc || "/projects/metropolyca.png"}
                  autoPlay={isActive}
                  preload={isActive ? "auto" : "none"}
                  muted={isMuted}
                  loop
                  playsInline
                  onEnded={(e) => {
                    e.currentTarget.currentTime = 0;
                    e.currentTarget.play().catch(() => {});
                  }}
                  suppressHydrationWarning
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02] rounded-none"
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded-none text-white border border-white/15">
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
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02] rounded-none"
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
