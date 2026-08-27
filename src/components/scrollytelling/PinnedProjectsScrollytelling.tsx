"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Play, Pause, Volume2, VolumeX, ShieldCheck, Film, Trophy, LineChart, Terminal, Cpu } from "lucide-react";
import { CornerReticle } from "@/src/components/ui/CornerReticle";

export interface PinnedProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  eyebrow: string;
  description: string;
  story: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  links: { demo: string; github: string };
  videoSrc?: string;
  imageSrc?: string;
  icon: "Film" | "Trophy" | "LineChart" | "Terminal" | "Cpu";
}

const ICONS = {
  Film: <Film size={14} className="text-accent" />,
  Trophy: <Trophy size={14} className="text-accent" />,
  LineChart: <LineChart size={14} className="text-accent" />,
  Terminal: <Terminal size={14} className="text-accent" />,
  Cpu: <Cpu size={14} className="text-accent" />,
};

export const PinnedProjectsScrollytelling: React.FC<{ items: PinnedProjectItem[] }> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const total = items.length;
    const index = Math.min(total - 1, Math.floor(latest * total));
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  const activeProject = items[activeIndex] || items[0];

  useEffect(() => {
    if (videoRef.current && activeProject.videoSrc) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [activeIndex, activeProject.videoSrc]);

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
    <div ref={containerRef} className="relative h-[360vh] w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-20 px-6 py-8">
        <div className="mx-auto max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Narrative & Metrics */}
          <div className="lg:col-span-6 flex flex-col justify-center z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-accent/15 text-accent border border-accent/30 flex items-center gap-1.5 shadow-sm">
                {ICONS[activeProject.icon] || <Film size={14} />}
                <span>{activeProject.eyebrow}</span>
              </span>
              <span className="text-xs font-mono text-zinc-400 font-medium">
                {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>

              {/* Interactive Chapter Indicator Buttons with Tooltips */}
              <div className="flex items-center gap-2 ml-auto">
                {items.map((item, i) => (
                  <div key={item.id} className="relative flex items-center justify-center">
                    <button
                      onClick={() => jumpToProject(i)}
                      onMouseEnter={() => setHoveredDot(i)}
                      onMouseLeave={() => setHoveredDot(null)}
                      aria-label={`Jump to project ${i + 1}: ${item.title}`}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none ${
                        i === activeIndex
                          ? "w-8 bg-accent shadow-[0_0_10px_rgba(255,149,0,0.9)]"
                          : "w-2.5 bg-zinc-700 hover:bg-zinc-400 hover:scale-125"
                      }`}
                    />

                    {/* Tooltip on Hover */}
                    <AnimatePresence>
                      {hoveredDot === i && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute -top-10 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-700 text-[10px] font-mono font-semibold text-white whitespace-nowrap shadow-2xl pointer-events-none z-30 flex items-center gap-1.5"
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

            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col"
              >
                <h3 className="text-3xl sm:text-4xl lg:text-4.5xl font-heading font-black text-white tracking-tight leading-tight mb-1">
                  {activeProject.title}
                </h3>
                <p className="text-sm sm:text-base font-mono font-bold text-accent mb-4">
                  {activeProject.subtitle}
                </p>
                <p className="text-sm sm:text-base text-zinc-300 font-body leading-relaxed mb-5">
                  {activeProject.description}
                </p>

                <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-3 flex items-start gap-2.5 mb-5 shadow-inner">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-xs font-mono text-zinc-300 leading-relaxed">
                    <span className="font-semibold text-white">Execution Story: </span>
                    {activeProject.story}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-5">
                  {activeProject.metrics.map((m, idx) => (
                    <div key={idx} className="flex flex-col px-3.5 py-2 rounded-lg bg-zinc-900/90 border border-zinc-800">
                      <span className="text-[11px] font-mono text-zinc-400">{m.label}</span>
                      <span className="text-xs sm:text-sm font-mono font-bold text-white mt-0.5">{m.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 items-center">
                  <a
                    href={activeProject.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative h-11 px-6 flex items-center justify-center gap-2 rounded-xl bg-accent text-black font-body font-bold text-xs shadow-[0_4px_20px_rgba(255,149,0,0.35)] hover:shadow-[0_4px_30px_rgba(255,149,0,0.6)] transition-all cursor-pointer"
                  >
                    <CornerReticle size={5} color="rgba(0,0,0,0.4)" />
                    <span>Launch Project</span>
                    <ArrowUpRight size={14} />
                  </a>
                  <a
                    href={activeProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative h-11 px-5 flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-950/70 text-white font-body font-semibold text-xs hover:border-accent hover:text-accent transition-all cursor-pointer"
                  >
                    <CornerReticle size={5} color="rgba(255,255,255,0.2)" />
                    <span>Source Code</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Visual Stage Mockup Shell */}
          <div className="lg:col-span-6 flex justify-center items-center z-10" style={{ perspective: "1200px" }}>
            <motion.div
              className="relative w-full aspect-video rounded-2xl overflow-hidden border border-zinc-700/80 bg-zinc-950 shadow-[0_20px_60px_rgba(0,0,0,0.9)] mirror-reflect-base"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <CornerReticle size={8} color="rgba(255, 149, 0, 0.5)" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.35 }}
                  className="w-full h-full"
                >
                  {activeProject.videoSrc ? (
                    <div className="relative w-full h-full bg-black">
                      <video
                        ref={videoRef}
                        src={activeProject.videoSrc}
                        poster="/projects/metropolyca.png"
                        autoPlay
                        loop
                        muted={isMuted}
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-3 right-3 flex items-center gap-2 z-20">
                        <button
                          onClick={togglePlay}
                          aria-label={isPlaying ? "Pause video" : "Play video"}
                          className="p-2 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-white hover:text-accent transition-all cursor-pointer"
                        >
                          {isPlaying ? <Pause size={13} /> : <Play size={13} className="fill-current" />}
                        </button>
                        <button
                          onClick={() => setIsMuted((m) => !m)}
                          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                          className="p-2 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-white hover:text-accent transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} className="text-accent" />}
                          <span className="text-[10px] font-mono font-semibold">{isMuted ? "Muted" : "Audio On"}</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={activeProject.imageSrc || "/projects/fifa-predictor.png"}
                      alt={activeProject.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
