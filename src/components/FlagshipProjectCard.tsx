"use client";

import React, { useState, useRef } from "react";
import { ArrowUpRight, Play, Pause, Volume2, VolumeX, Maximize2, ShieldCheck, Gamepad2, Film } from "lucide-react";
import { motion } from "framer-motion";

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
  title, subtitle, description, orchestrationStory, metrics, tags, links, videoSrc = "/metro.mp4",
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

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

  const handleFullscreen = () => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <motion.div
      className="relative rounded-3xl border border-accent/30 bg-gradient-to-b from-bg-surface via-bg-surface/90 to-bg-base p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden mb-12 group transition-all duration-300 hover:border-accent"
      onMouseMove={(e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        setCoords({ x: e.clientX - left, y: e.clientY - top });
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(600px circle at ${coords.x}px ${coords.y}px, rgba(255, 149, 0, 0.08), transparent 70%)` }}
      />

      <div className="relative z-10 flex flex-col gap-6">
        {/* Top Header Badge Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-accent/15 text-accent border border-accent/30">
              <Gamepad2 size={13} className="text-accent" />
              FLAGSHIP PROJECT
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Early Access Live
            </span>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-text-muted">
            3D Web Simulation & Game
          </span>
        </div>

        {/* Video Player */}
        <div className="relative rounded-2xl overflow-hidden border border-border-base bg-black/90 aspect-video shadow-2xl group/video">
          <video ref={videoRef} src={videoSrc} autoPlay loop muted={isMuted} playsInline className="w-full h-full object-cover cursor-pointer" onClick={togglePlay} />
          <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-xs font-mono text-white/90">
            <Film size={13} className="text-accent" />
            <span className="font-semibold">Official Trailer 1 · Metropolyca Engine</span>
          </div>

          <div className="absolute bottom-3.5 right-3.5 z-20 flex items-center gap-2">
            <button onClick={togglePlay} className="p-2 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 text-white hover:border-accent hover:text-accent transition-all cursor-pointer" aria-label={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? <Pause size={14} /> : <Play size={14} className="fill-current" />}
            </button>
            <button onClick={toggleMute} className="px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 text-xs font-mono text-white hover:border-accent hover:text-accent transition-all flex items-center gap-1.5 cursor-pointer" aria-label={isMuted ? "Unmute" : "Mute"}>
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} className="text-accent" />}
              <span>{isMuted ? "Unmute" : "Mute"}</span>
            </button>
            <button onClick={handleFullscreen} className="p-2 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 text-white hover:border-accent hover:text-accent transition-all cursor-pointer" aria-label="Fullscreen">
              <Maximize2 size={14} />
            </button>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 flex flex-col gap-3.5">
            <div>
              <h3 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-text-primary group-hover:text-accent transition-colors duration-200">
                {title}
              </h3>
              <p className="text-sm font-mono font-medium text-accent mt-0.5">
                {subtitle}
              </p>
            </div>
            <p className="text-sm font-body text-text-secondary leading-relaxed">
              {description}
            </p>
            <div className="rounded-xl border border-border-subtle bg-bg-raised/70 p-3.5 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <div className="text-xs font-mono text-text-secondary leading-relaxed">
                <span className="font-semibold text-text-primary">QA Standards: </span>
                {orchestrationStory}
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {tags.map((tag) => (
                <span key={tag} className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-bg-base border border-border-subtle text-text-muted">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights & CTAs */}
          <div className="lg:col-span-4 flex flex-col gap-3 bg-bg-base/70 rounded-2xl border border-border-subtle p-4">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-text-muted">
              Telemetry Metrics
            </span>
            <div className="grid grid-cols-1 gap-2">
              {metrics.map((m, i) => (
                <div key={i} className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-bg-surface border border-border-subtle/60 text-xs font-mono">
                  <span className="text-text-secondary">{m.label}</span>
                  <span className="font-bold text-accent">{m.value}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 pt-2 mt-auto">
              <a href={links.demo} target="_blank" rel="noopener noreferrer" className="w-full h-10 px-4 flex items-center justify-center gap-2 rounded-xl bg-accent text-black font-body font-bold text-xs shadow-md hover:shadow-accent/30 transition-all">
                <Play size={13} className="fill-black" />
                <span>Play in Browser</span>
                <ArrowUpRight size={13} />
              </a>
              <a href={links.github} target="_blank" rel="noopener noreferrer" className="w-full h-9 px-3 flex items-center justify-center gap-2 rounded-xl border border-border-base bg-bg-surface text-text-secondary hover:text-text-primary font-body font-semibold text-xs transition-all">
                <GithubIcon size={13} />
                <span>Source on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

