"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { SectionLabel } from "@/src/components/ui/SectionLabel";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  impact?: string[];
  operations?: string[];
  isSecondary?: boolean;
}

// Typewriter for terminal strings
const TerminalText: React.FC<{ text: string; speed?: number }> = ({ text, speed = 18 }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const id = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block w-[7px] h-[1em] bg-current opacity-80 animate-pulse ml-0.5 align-middle" />
      )}
    </span>
  );
};

const BulletList: React.FC<{ items: string[]; label: string }> = ({ items, label }) => (
  <div className="flex-1">
    <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent/70 mb-4">
      <span className="text-text-muted">//</span> {label}
    </p>
    <ul className="space-y-3">
      {items.map((item, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06, duration: 0.3 }}
          className="flex items-start gap-3 text-sm font-mono text-text-secondary leading-relaxed"
        >
          <span className="mt-[5px] text-accent text-xs shrink-0 font-bold">▸</span>
          <span>{item}</span>
        </motion.li>
      ))}
    </ul>
  </div>
);

export const ExperienceTimeline: React.FC<{ items: ExperienceItem[] }> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex];

  // Generate stable fake hex address per job
  const hexAddr = (idx: number) => `0x${(0xA000 + idx * 0x1C4).toString(16).toUpperCase()}`;

  return (
    <section id="experience" className="py-24 border-b border-border-subtle relative overflow-hidden">
      {/* PCB circuit trace decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04] theme-dark:opacity-[0.07]">
        {/* Horizontal traces */}
        <div className="absolute top-[20%] left-0 right-0 h-[1px] bg-current" />
        <div className="absolute top-[75%] left-0 right-0 h-[1px] bg-current" />
        {/* Vertical traces */}
        <div className="absolute left-[15%] top-0 bottom-0 w-[1px] bg-current" />
        <div className="absolute right-[15%] top-0 bottom-0 w-[1px] bg-current" />
        {/* Corner pads */}
        <div className="absolute top-[20%] left-[15%] w-3 h-3 border border-current rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-[20%] right-[15%] w-3 h-3 border border-current rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-[75%] left-[15%] w-3 h-3 border border-current rounded-full -translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-[75%] right-[15%] w-3 h-3 border border-current rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="mx-auto max-w-5xl px-6 relative">
        <FadeIn>
          <SectionLabel
            eyebrow="Employment History"
            heading="Work Experience"
            description="High-impact technical roles leading automation operations, relational database architectures, and systems supervisor teams."
          />
        </FadeIn>

        <div className="mt-16 sm:mt-24">
          {/* ── Timeline nav ── */}
          <div className="relative mb-16 px-2 sm:px-12 overflow-x-auto overflow-y-hidden hide-scrollbar pb-4">
            <div className="min-w-max">
              <div className="absolute left-8 right-8 sm:left-16 sm:right-16 top-[40px] h-[2px] bg-border-base z-0" />
              <div className="relative z-10 flex justify-between items-center gap-2">
                {items.map((job, idx) => {
                  const isActive = idx === activeIndex;
                  const isPast = idx < activeIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={`relative group focus:outline-none h-[110px] shrink-0 ${job.isSecondary ? 'w-[70px] sm:w-[90px]' : 'w-[100px] sm:w-[130px]'}`}
                    >
                      {idx > 0 && (
                        <div
                          className={`absolute right-[50%] top-[40px] w-[200%] sm:w-[250%] h-[2px] origin-right transition-all duration-500 z-[-1]
                          ${isActive || isPast ? "bg-accent shadow-[0_0_8px_rgba(255,149,0,0.5)]" : "bg-transparent"}`}
                        />
                      )}
                      {job.isSecondary ? (
                        <div className="absolute inset-0 flex flex-col items-center pointer-events-none">
                          <div className={`absolute top-[41px] w-[2px] h-[15px] transition-colors duration-500 ${isActive || isPast ? 'bg-accent/60' : 'bg-border-base'}`} />
                          <div className={`absolute top-[51px] w-2.5 h-2.5 rounded-full border-2 flex items-center justify-center bg-bg-base transition-all duration-300 
                            ${isActive ? 'border-accent scale-150 shadow-[0_0_8px_rgba(255,149,0,0.6)]' : isPast ? 'border-accent/80' : 'border-border-subtle group-hover:border-accent/50'}`}>
                            {(isActive || isPast) && <div className="w-1 h-1 bg-accent rounded-full" />}
                          </div>
                          <span className={`absolute top-[68px] text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-center transition-colors duration-300 w-[120%] leading-tight ${isActive ? 'text-accent' : 'text-text-muted/40 group-hover:text-text-muted'}`}>
                            {job.period.split(" - ")[0]}<br />{job.company}
                          </span>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center pointer-events-none">
                          <span className={`absolute top-[12px] text-xs sm:text-sm font-mono font-bold transition-colors duration-300 ${isActive ? 'text-text-primary' : 'text-text-muted group-hover:text-text-secondary'}`}>
                            {job.period.split(" - ")[0]}{idx === 0 && " - Now"}
                          </span>
                          <div className={`absolute top-[33px] w-4 h-4 rounded-full border-2 flex items-center justify-center bg-bg-base transition-all duration-300 
                            ${isActive ? 'border-accent scale-125 shadow-[0_0_12px_rgba(255,149,0,0.6)]' : isPast ? 'border-accent' : 'border-border-subtle group-hover:border-accent/50'}`}>
                            {(isActive || isPast) && <div className="w-1.5 h-1.5 bg-accent rounded-full" />}
                          </div>
                          <span className={`absolute top-[58px] text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-center transition-colors duration-300 w-[120%] leading-tight ${isActive ? 'text-accent' : 'text-text-muted/40 group-hover:text-text-muted'}`}>
                            {job.company}
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Active Content — PCB terminal card ── */}
          <div className="relative min-h-[450px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="bg-bg-raised border border-border-subtle rounded-2xl overflow-hidden relative"
              >
                {/* Scanline overlay */}
                <div
                  className="absolute inset-0 pointer-events-none z-20 opacity-[0.025]"
                  style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)",
                  }}
                />

                {/* Terminal top bar */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-border-subtle bg-bg-surface/50">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                    <span className="ml-3 text-[11px] font-mono text-text-muted tracking-widest uppercase">
                      experience.log — record {activeIndex + 1}/{items.length}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-accent/60 tracking-widest">
                    {hexAddr(activeIndex)}
                  </span>
                </div>

                {/* Terminal prompt header */}
                <div className="px-6 pt-5 pb-3 border-b border-border-subtle/40">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-mono text-accent/60 mb-1">
                        <span className="text-text-muted">$</span> load --record=&quot;{active.company}&quot;
                      </p>
                      <h3 className="text-xl sm:text-2xl font-mono font-bold text-text-primary tracking-tight">
                        <TerminalText key={`role-${activeIndex}`} text={active.role} speed={20} />
                      </h3>
                      <p className="text-sm font-mono font-semibold text-accent mt-1">
                        @ {active.company}
                      </p>
                    </div>
                    <div className="text-left sm:text-right font-mono">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-accent/10 border border-accent/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        <span className="text-xs text-accent font-bold tracking-widest">{active.period}</span>
                      </div>
                      <p className="text-[11px] text-text-muted mt-2 font-mono">{active.location}</p>
                    </div>
                  </div>
                </div>

                {/* Description block */}
                <div className="px-6 py-5 border-b border-border-subtle/40">
                  <p className="text-[11px] font-mono text-text-muted mb-2">
                    <span className="text-accent/50">{"// "}</span>SUMMARY
                  </p>
                  <p className="text-sm font-mono text-text-secondary leading-relaxed">
                    &quot;{active.description}&quot;
                  </p>
                </div>

                {/* Bullet grids */}
                <div className="px-6 py-6">
                  <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                    <BulletList items={active.impact || []} label="Impact & Automation" />
                    <div className="hidden lg:block w-[1px] bg-border-subtle/50 self-stretch" />
                    <BulletList items={active.operations || []} label="Core Operations" />
                  </div>
                </div>

                {/* Bottom status bar */}
                <div className="px-5 py-2.5 border-t border-border-subtle bg-bg-surface/30 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-text-muted tracking-widest">
                    STATUS: <span className="text-green-400">LOADED</span>
                  </span>
                  <span className="text-[10px] font-mono text-text-muted tracking-widest">
                    {(active.impact?.length || 0) + (active.operations?.length || 0)} ENTRIES
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
