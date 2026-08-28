"use client";

import React, { useRef, useState, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { ProjectMediaStage } from "./ProjectMediaStage";
import { PinnedProjectDetails } from "./PinnedProjectDetails";

export interface PinnedProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  eyebrow: string;
  description: string;
  story: string;
  metrics: { label: string; value: string }[];
  tags?: string[];
  links: { demo: string; github: string };
  videoSrc?: string;
  imageSrc?: string;
  icon?: string;
}

export const PinnedProjectsScrollytelling: React.FC<{ items: PinnedProjectItem[] }> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isDeepDiveOpen, setIsDeepDiveOpen] = useState(false);
  const [isVerticalMedia, setIsVerticalMedia] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const total = items.length;
    const index = Math.min(total - 1, Math.max(0, Math.floor(latest * total)));
    if (index !== activeIndex) {
      setActiveIndex(index);
      setIsDeepDiveOpen(false);
      setIsVerticalMedia(false);
    }
  });

  const active = items[activeIndex] || items[0];

  useEffect(() => {
    setIsVerticalMedia(false);
    if (videoRef.current && active.videoSrc) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [activeIndex, active.videoSrc]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const jumpToProject = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const targetScroll = scrollTop + (index / (items.length - 1)) * (rect.height - window.innerHeight);
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="relative h-[480vh] w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-20 px-4 sm:px-6 py-4 sm:py-8">
        <div className="mx-auto max-w-6xl w-full flex flex-col-reverse lg:grid lg:grid-cols-12 gap-5 lg:gap-10 items-center">
          
          <PinnedProjectDetails
            active={active}
            activeIndex={activeIndex}
            totalItems={items.length}
            items={items}
            jumpToProject={jumpToProject}
            isDeepDiveOpen={isDeepDiveOpen}
            setIsDeepDiveOpen={setIsDeepDiveOpen}
          />

          <ProjectMediaStage
            active={active}
            videoRef={videoRef}
            isPlaying={isPlaying}
            isMuted={isMuted}
            togglePlay={togglePlay}
            toggleMute={() => setIsMuted((m) => !m)}
            isVerticalMedia={isVerticalMedia}
            setIsVerticalMedia={setIsVerticalMedia}
          />
        </div>
      </div>
    </div>
  );
};
