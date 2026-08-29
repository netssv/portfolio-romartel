"use client";

import React, { useState, useRef } from "react";
import { ArrowUpRight, Play, Pause, Volume2, VolumeX, ShieldCheck, Gamepad2, Film } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const GithubIcon = ({ size = 14 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2.25" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export interface FlagshipProjectProps {
  id: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  description: string;
  orchestrationStory: string;
  status: string;
  category: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  links: { demo: string; github: string };
  videoSrc?: string;
}

export const FlagshipProjectCard: React.FC<FlagshipProjectProps> = ({
  title,
  subtitle,
  description,
  orchestrationStory,
  metrics,
  tags,
  links,
  videoSrc = "/metro.mp4",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 350, damping: 28 });
  const mouseYSpring = useSpring(y, { stiffness: 350, damping: 28 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

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

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div style={{ perspective: "1500px" }}>
      <motion.div
        className="relative rounded-3xl border border-border-base bg-bg-surface p-6 sm:p-8 lg:p-10 shadow-xl overflow-hidden mb-12 group transition-all duration-200 hover:border-accent"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <div className="relative z-10 flex flex-col gap-6">
          {/* Header Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-body font-bold bg-accent/10 text-accent border border-accent/20">
                <Gamepad2 size={13} className="text-accent" />
                FLAGSHIP SIMULATION
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-body font-semibold bg-bg-raised text-text-secondary border border-border-subtle">
                <span className="w-2 h-2 rounded-full bg-accent-signal animate-pulse" />
                Early Access Live
              </span>
            </div>
            <span className="text-xs font-body text-text-muted">
              Interactive 3D Web &amp; Game Architecture
            </span>
          </div>

          {/* Video Mockup Shell */}
          <div className="relative rounded-2xl overflow-hidden border border-border-base bg-black aspect-video shadow-lg group/video">
            <video
              ref={videoRef}
              src={videoSrc}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover cursor-pointer"
              onClick={togglePlay}
            />
            <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-xs font-body text-white/90">
              <Film size={13} className="text-accent" />
              <span className="font-semibold">Official Trailer · Metropolyca Engine</span>
            </div>

            <div className="absolute bottom-3.5 right-3.5 z-20 flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="p-2 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 text-white hover:text-accent transition-all cursor-pointer"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} className="fill-current" />}
              </button>
              <button
                onClick={toggleMute}
                className="px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 text-xs font-body text-white hover:text-accent transition-all flex items-center gap-1.5 cursor-pointer"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} className="text-accent" />}
                <span>{isMuted ? "Unmute" : "Mute"}</span>
              </button>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 flex flex-col gap-3.5">
              <div>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold tracking-tight text-text-primary group-hover:text-accent transition-colors duration-150">
                  {title}
                </h3>
                <p className="text-sm font-body font-semibold text-accent mt-0.5">{subtitle}</p>
              </div>
              <p className="text-sm font-body text-text-secondary leading-relaxed">{description}</p>
              <div className="rounded-xl border border-border-subtle bg-bg-raised/70 p-3.5 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div className="text-xs font-body text-text-secondary leading-relaxed">
                  <strong className="font-semibold text-text-primary">QA Standards: </strong>
                  {orchestrationStory}
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-bg-raised border border-border-subtle text-text-secondary">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Metrics & CTAs */}
            <div className="lg:col-span-4 flex flex-col gap-3 bg-bg-raised/50 rounded-2xl border border-border-subtle p-4">
              <span className="text-xs font-body font-bold uppercase tracking-wider text-text-muted">
                System Metrics
              </span>
              <div className="grid grid-cols-1 gap-2">
                {metrics.map((m, i) => (
                  <div key={i} className="flex items-center justify-between px-3 py-2 rounded-lg bg-bg-surface border border-border-subtle text-xs font-body">
                    <span className="text-text-secondary">{m.label}</span>
                    <span className="font-mono font-bold text-accent">{m.value}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2 pt-2 mt-auto">
                <a
                  href={links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-10 px-4 flex items-center justify-center gap-2 rounded-xl bg-accent text-white font-body font-semibold text-xs shadow-xs hover:bg-accent-hover transition-all"
                >
                  <Play size={13} className="fill-white" />
                  <span>Play in Browser</span>
                  <ArrowUpRight size={13} />
                </a>
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-9 px-3 flex items-center justify-center gap-2 rounded-xl border border-border-base bg-bg-surface text-text-secondary hover:text-text-primary font-body font-medium text-xs transition-all shadow-xs"
                >
                  <GithubIcon size={13} />
                  <span>Source Code</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
