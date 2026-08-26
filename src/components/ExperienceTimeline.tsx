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
    <p className="text-xs font-mono font-bold uppercase tracking-wider text-accent mb-4">
      <span className="text-text-muted">//</span> {label}
    </p>
    <ul className="space-y-3.5">
      {items.map((item, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06, duration: 0.3 }}
          className="flex items-start gap-3 text-sm font-mono text-text-secondary leading-relaxed"
        >
          <span className="mt-[5px] text-accent text-xs shrink-0 font-bold" aria-hidden="true">▸</span>
          <span>{item}</span>
        </motion.li>
      ))}
    </ul>
  </div>
);

export const ExperienceTimeline: React.FC<{ items: ExperienceItem[] }> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex];

  // Generate stable hex address per job
  const hexAddr = (idx: number) => `0x${(0xA000 + idx * 0x1C4).toString(16).toUpperCase()}`;

  return (
    <section id="experience" className="py-24 border-b border-border-subtle relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 relative">
        <FadeIn>
          <SectionLabel
            eyebrow="Employment History"
            heading="Work Experience"
            description="Professional background across hosting infrastructure, data analytics, quantitative systems, and customer operations."
          />
        </FadeIn>

        <div className="mt-16 sm:mt-24">
          {/* ── Timeline nav ── */}
          <div className="relative mb-16 px-2 sm:px-12 overflow-x-auto overflow-y-hidden hide-scrollbar pb-4" role="tablist" aria-label="Career Timeline">
            <div className="min-w-max">
              <div className="absolute left-8 right-8 sm:left-16 sm:right-16 top-[40px] h-[2px] bg-border-base z-0" />
              <div className="relative z-10 flex justify-between items-center gap-2">
                {items.map((job, idx) => {
                  const isActive = idx === activeIndex;
                  const isPast = idx < activeIndex;
                  return (
                    <button
                      key={idx}
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`${job.role} at ${job.company}, ${job.period}`}
                      onClick={() => setActiveIndex(idx)}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={`relative group focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-xl focus:outline-none h-[115px] shrink-0 cursor-pointer ${
                        job.isSecondary ? 'w-[85px] sm:w-[105px]' : 'w-[110px] sm:w-[140px]'
                      }`}
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
                          <div className={`absolute top-[51px] w-3 h-3 rounded-full border-2 flex items-center justify-center bg-bg-base transition-all duration-300 
                            ${isActive ? 'border-accent scale-150 shadow-[0_0_8px_rgba(255,149,0,0.6)]' : isPast ? 'border-accent/80' : 'border-border-base group-hover:border-accent/50'}`}>
                            {(isActive || isPast) && <div className="w-1.5 h-1.5 bg-accent rounded-full" />}
                          </div>
                          <span className={`absolute top-[70px] text-xs font-mono uppercase tracking-wider text-center transition-colors duration-300 w-[120%] leading-tight ${isActive ? 'text-accent font-bold' : 'text-text-muted group-hover:text-text-primary'}`}>
                            {job.period.split(" - ")[0]}<br />{job.company}
                          </span>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center pointer-events-none">
                          <span className={`absolute top-[12px] text-xs sm:text-sm font-mono font-bold transition-colors duration-300 ${isActive ? 'text-text-primary' : 'text-text-muted group-hover:text-text-secondary'}`}>
                            {job.period.split(" - ")[0]}{idx === 0 && " - Now"}
                          </span>
                          <div className={`absolute top-[33px] w-4 h-4 rounded-full border-2 flex items-center justify-center bg-bg-base transition-all duration-300 
                            ${isActive ? 'border-accent scale-125 shadow-[0_0_12px_rgba(255,149,0,0.6)]' : isPast ? 'border-accent' : 'border-border-base group-hover:border-accent/50'}`}>
                            {(isActive || isPast) && <div className="w-1.5 h-1.5 bg-accent rounded-full" />}
                          </div>
                          <span className={`absolute top-[60px] text-xs font-mono uppercase tracking-wider text-center transition-colors duration-300 w-[120%] leading-tight ${isActive ? 'text-accent font-bold' : 'text-text-muted group-hover:text-text-primary'}`}>
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

          {/* ── Active Content — Accessible Terminal Card ── */}
          <div className="relative min-h-[450px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="bg-bg-raised border border-border-base rounded-2xl overflow-hidden relative shadow-lg"
              >
                {/* Terminal top bar */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-border-subtle bg-bg-surface">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" aria-hidden="true" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" aria-hidden="true" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" aria-hidden="true" />
                    <span className="ml-3 text-xs font-mono text-text-muted tracking-wider uppercase font-semibold">
                      experience.log — record {activeIndex + 1}/{items.length}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-accent font-semibold tracking-wider">
                    {hexAddr(activeIndex)}
                  </span>
                </div>

                {/* Terminal prompt header */}
                <div className="px-6 pt-6 pb-4 border-b border-border-subtle/50">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                    <div>
                      <p className="text-xs font-mono text-text-muted mb-1">
                        <span className="text-accent font-bold">$</span> load --record=&quot;{active.company}&quot;
                      </p>
                      <h3 className="text-xl sm:text-2xl font-mono font-bold text-text-primary tracking-tight">
                        <TerminalText key={`role-${activeIndex}`} text={active.role} speed={20} />
                      </h3>
                      <p className="text-sm font-mono font-bold text-accent mt-1">
                        @ {active.company}
                      </p>
                    </div>
                    <div className="text-left sm:text-right font-mono">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-accent/15 border border-accent/30">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
                        <span className="text-xs text-accent font-bold tracking-wider">{active.period}</span>
                      </div>
                      <p className="text-xs text-text-muted mt-2 font-mono font-medium">{active.location}</p>
                    </div>
                  </div>
                </div>

                {/* Description block */}
                <div className="px-6 py-5 border-b border-border-subtle/50">
                  <p className="text-xs font-mono text-accent font-bold mb-2">
                    <span>{"// "}</span>SUMMARY
                  </p>
                  <p className="text-sm font-mono text-text-secondary leading-relaxed">
                    &quot;{active.description}&quot;
                  </p>
                </div>

                {/* Bullet grids */}
                <div className="px-6 py-6">
                  <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                    <BulletList items={active.impact || []} label="Impact & Automation" />
                    <div className="hidden lg:block w-[1px] bg-border-subtle/70 self-stretch" aria-hidden="true" />
                    <BulletList items={active.operations || []} label="Core Operations" />
                  </div>
                </div>

                {/* Bottom status bar */}
                <div className="px-5 py-3 border-t border-border-subtle bg-bg-surface/60 flex items-center justify-between">
                  <span className="text-xs font-mono text-text-muted tracking-wider font-semibold">
                    STATUS: <span className="text-emerald-400 font-bold">LOADED</span>
                  </span>
                  <span className="text-xs font-mono text-text-muted tracking-wider font-semibold">
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
