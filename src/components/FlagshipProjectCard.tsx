"use client";

import React, { useState } from "react";
import { ArrowUpRight, Play, Sparkles, ShieldCheck, Flame, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";

const GithubIcon = ({ size = 14, className = "" }: { size?: number; className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2.25"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
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
}

export const FlagshipProjectCard: React.FC<FlagshipProjectProps> = ({
  title,
  subtitle,
  description,
  orchestrationStory,
  metrics,
  tags,
  links,
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    setCoords({ x: e.clientX - left, y: e.clientY - top });
  };

  return (
    <motion.div
      className="relative rounded-3xl border border-accent/30 bg-gradient-to-b from-bg-surface via-bg-surface/90 to-bg-base p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden mb-12 group transition-all duration-300 hover:border-accent"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic spotlight gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${coords.x}px ${coords.y}px, rgba(255, 149, 0, 0.08), transparent 70%)`,
        }}
      />

      {/* Decorative ambient background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
        style={{
          backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 flex flex-col gap-6">
        {/* Top Header Badge Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-accent/15 text-accent border border-accent/30">
              <Sparkles size={12} className="animate-spin-slow" />
              FLAGSHIP PROJECT
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Play in Browser
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Flame size={12} className="text-blue-400" />
              Roadmap to Steam
            </span>
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-text-muted">
            3D Web Simulation & Game
          </span>
        </div>

        {/* Main Content Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black tracking-tight text-text-primary group-hover:text-accent transition-colors duration-200">
                {title}
              </h3>
              <p className="text-sm sm:text-base font-body font-semibold text-accent/90 mt-1">
                {subtitle}
              </p>
            </div>

            <p className="text-sm sm:text-base font-body text-text-secondary leading-relaxed">
              {description}
            </p>

            {/* Craftsmanship & Quality Assurance Callout */}
            <div className="rounded-xl border border-border-subtle bg-bg-raised/70 p-4 flex items-start gap-3 mt-1">
              <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div className="text-xs font-body text-text-secondary leading-relaxed">
                <span className="font-semibold text-text-primary">Craftsmanship & Engineering QA: </span>
                {orchestrationStory}
              </div>
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-bg-base border border-border-subtle text-text-muted group-hover:border-border-base transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Highlights Panel */}
          <div className="lg:col-span-4 flex flex-col gap-3.5 bg-bg-base/70 rounded-2xl border border-border-subtle p-5">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
              // Highlights
            </p>
            <div className="grid grid-cols-1 gap-2.5">
              {metrics.map((m, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-bg-surface border border-border-subtle/60"
                >
                  <span className="text-xs font-body text-text-secondary">{m.label}</span>
                  <span className="text-xs font-mono font-bold text-accent">{m.value}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-2.5 pt-3 mt-auto">
              <a
                href={links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 px-5 flex items-center justify-center gap-2 rounded-xl bg-accent text-black font-body font-bold text-xs shadow-lg hover:shadow-accent/30 hover:scale-[1.02] transition-all duration-200"
              >
                <Play size={14} className="fill-black" />
                <span>Play in Browser (Early Access)</span>
                <ArrowUpRight size={14} />
              </a>

              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-10 px-4 flex items-center justify-center gap-2 rounded-xl border border-border-base bg-bg-surface text-text-secondary hover:text-text-primary hover:border-accent/40 font-body font-semibold text-xs transition-all duration-200"
              >
                <GithubIcon size={14} />
                <span>View Source on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
