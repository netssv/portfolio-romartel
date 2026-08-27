"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Play, Pause, Volume2, VolumeX, ShieldCheck, Film, Trophy, LineChart, Terminal, Cpu, Bluetooth, Layers, ChevronDown, Sparkles } from "lucide-react";
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
  tags?: string[];
  links: { demo: string; github: string };
  videoSrc?: string;
  imageSrc?: string;
  icon?: string;
}

const ICONS: Record<string, React.ReactNode> = {
  Film: <Film size={13} className="text-accent" />,
  Trophy: <Trophy size={13} className="text-accent" />,
  LineChart: <LineChart size={13} className="text-accent" />,
  Terminal: <Terminal size={13} className="text-accent" />,
  Cpu: <Cpu size={13} className="text-accent" />,
  Bluetooth: <Bluetooth size={13} className="text-accent" />,
};

export const PinnedProjectsScrollytelling: React.FC<{ items: PinnedProjectItem[] }> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isDeepDiveOpen, setIsDeepDiveOpen] = useState(false);
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);
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
    }
  });

  const active = items[activeIndex] || items[0];

  useEffect(() => {
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
          
          {/* Left Column: Punchy Surface + Progressive Deep Dive */}
          <div className="w-full lg:col-span-6 flex flex-col justify-center z-10">
            <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-accent/15 text-accent border border-accent/30 flex items-center gap-1.5 shadow-sm">
                {ICONS[active.icon || ""] || <Layers size={13} className="text-accent" />}
                <span>{active.eyebrow}</span>
              </span>
              <span className="text-[11px] font-mono text-zinc-400 font-medium">
                0{activeIndex + 1} / 0{items.length}
              </span>

              {/* Indicator Buttons */}
              <div className="flex items-center gap-1.5 ml-auto">
                {items.map((item, i) => (
                  <div key={item.id} className="relative flex items-center justify-center">
                    <button
                      onClick={() => jumpToProject(i)}
                      onMouseEnter={() => setHoveredDot(i)}
                      onMouseLeave={() => setHoveredDot(null)}
                      aria-label={`Jump to project 0${i + 1}: ${item.title}`}
                      className={`h-2 rounded-full transition-all duration-200 cursor-pointer focus:outline-none ${
                        i === activeIndex ? "w-7 bg-accent shadow-[0_0_10px_rgba(255,149,0,0.9)]" : "w-2 bg-zinc-700 hover:bg-zinc-400"
                      }`}
                    />
                    <AnimatePresence>
                      {hoveredDot === i && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.95 }}
                          transition={{ duration: 0.12 }}
                          className="absolute -top-9 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-700 text-[10px] font-mono font-semibold text-white whitespace-nowrap shadow-2xl pointer-events-none z-30 flex items-center gap-1.5"
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

            {/* ── Surface Level: Bold Headlines & Hero Metric Chips ── */}
            <div key={active.id} className="flex flex-col">
              <h3 className="text-2.5xl sm:text-3.5xl lg:text-4.5xl font-heading font-black text-white tracking-tight leading-none mb-1">
                {active.title}
              </h3>
              <p className="text-xs sm:text-sm font-mono font-bold text-accent mb-3">
                {active.subtitle}
              </p>

              {/* 2-3 Hero Metric Badges */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {active.metrics.map((m, idx) => (
                  <div key={idx} className="flex flex-col px-3.5 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800 shadow-sm">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">{m.label}</span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-white mt-0.5 truncate">{m.value}</span>
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
                  onClick={() => setIsDeepDiveOpen(!isDeepDiveOpen)}
                  className={`relative h-10 px-4 flex items-center justify-center gap-1.5 rounded-xl border text-xs font-body font-semibold transition-all cursor-pointer ${
                    isDeepDiveOpen
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-zinc-700 bg-zinc-950/70 text-zinc-200 hover:border-zinc-500 hover:text-white"
                  }`}
                >
                  <Sparkles size={12} className={isDeepDiveOpen ? "text-accent" : "text-zinc-400"} />
                  <span>{isDeepDiveOpen ? "Close Details" : "Deep Dive & Architecture"}</span>
                  <ChevronDown size={13} className={`transition-transform duration-200 ${isDeepDiveOpen ? "rotate-180" : ""}`} />
                </button>

                <a
                  href={active.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 px-3.5 flex items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950/50 text-zinc-400 hover:text-white hover:border-zinc-700 text-xs font-mono transition-all"
                  aria-label="GitHub Repository"
                >
                  <span>Code</span>
                </a>
              </div>

              {/* ── Progressive Disclosure Drawer (Revealed on Click) ── */}
              <AnimatePresence>
                {isDeepDiveOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-3.5 rounded-xl border border-zinc-700/70 bg-zinc-900/90 shadow-2xl flex flex-col gap-2 text-xs">
                      <p className="text-zinc-300 font-body leading-relaxed">
                        {active.description}
                      </p>
                      <div className="flex items-start gap-2 pt-2 border-t border-zinc-800">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <p className="font-mono text-zinc-300 text-[11px] leading-snug">
                          <span className="font-semibold text-white">Execution: </span>
                          {active.story}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Visual Stage Mockup */}
          <div className="w-full lg:col-span-6 flex justify-center items-center z-10" style={{ perspective: "1200px" }}>
            <div className="relative w-full aspect-video max-h-[36vh] sm:max-h-[42vh] lg:max-h-none rounded-2xl overflow-hidden border border-zinc-700/80 bg-zinc-950 shadow-[0_20px_60px_rgba(0,0,0,0.9)] mirror-reflect-base">
              <CornerReticle size={8} color="rgba(255, 149, 0, 0.5)" />
              <div key={active.id} className="w-full h-full">
                {active.videoSrc ? (
                  <div className="relative w-full h-full bg-black">
                    <video
                      ref={videoRef}
                      src={active.videoSrc}
                      poster="/projects/metropolyca.png"
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 z-20">
                      <button
                        onClick={togglePlay}
                        aria-label={isPlaying ? "Pause video" : "Play video"}
                        className="p-1.5 sm:p-2 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-white hover:text-accent transition-all cursor-pointer"
                      >
                        {isPlaying ? <Pause size={12} /> : <Play size={12} className="fill-current" />}
                      </button>
                      <button
                        onClick={() => setIsMuted((m) => !m)}
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
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
