"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Briefcase, Calendar, MapPin, CheckCircle2, Terminal, ChevronDown, Sparkles } from "lucide-react";
import { CornerReticle } from "@/src/components/ui/CornerReticle";

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  impact?: string[];
  operations?: string[];
  isSecondary?: boolean;
}

export const PinnedExperienceScrollytelling: React.FC<{ items: ExperienceItem[] }> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const total = items.length;
    const index = Math.min(total - 1, Math.max(0, Math.floor(latest * total)));
    if (index !== activeIndex) {
      setActiveIndex(index);
      setIsDetailsOpen(false);
    }
  });

  const jumpToYear = (idx: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const targetScroll = scrollTop + (idx / (items.length - 1)) * (rect.height - window.innerHeight);
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const active = items[activeIndex] || items[0];

  return (
    <div ref={containerRef} className="relative h-[380vh] w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-20 px-4 sm:px-6 py-4 sm:py-8">
        <div className="mx-auto max-w-5xl w-full flex flex-col justify-center">
          
          {/* ── 1. Chronological Timeline Ribbon ── */}
          <div className="relative mb-4 sm:mb-6">
            <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-border-base" />
            <motion.div
              className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 bg-accent shadow-[0_0_12px_rgba(255,149,0,0.8)] transition-all duration-300"
              style={{ width: `${(activeIndex / (items.length - 1)) * 100}%` }}
            />

            <div className="relative flex justify-between items-center z-10">
              {items.map((job, idx) => {
                const isActive = idx === activeIndex;
                const isPast = idx <= activeIndex;
                const startYear = job.period.split(" - ")[0].trim();

                return (
                  <button
                    key={idx}
                    onClick={() => jumpToYear(idx)}
                    className="flex flex-col items-center group cursor-pointer focus:outline-none"
                    aria-label={`Jump to ${job.company} (${startYear})`}
                  >
                    <div
                      className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center border transition-all duration-200 ${
                        isActive
                          ? "bg-accent border-accent text-black scale-110 shadow-[0_0_15px_rgba(255,149,0,0.7)]"
                          : isPast
                          ? "bg-bg-surface border-accent/60 text-accent"
                          : "bg-bg-surface border-border-subtle text-text-muted group-hover:border-border-base"
                      }`}
                    >
                      <Briefcase size={11} className={isActive ? "text-black" : "text-current"} />
                    </div>

                    <span
                      className={`text-[9px] sm:text-xs font-mono font-bold mt-1.5 transition-colors ${
                        isActive ? "text-accent drop-shadow-[0_0_8px_rgba(255,149,0,0.5)]" : isPast ? "text-text-primary" : "text-text-muted"
                      }`}
                    >
                      {startYear}
                    </span>
                    <span className="text-[9px] font-mono text-text-muted hidden sm:block max-w-[80px] truncate">
                      {job.company}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── 2. Terminal Stage with Progressive Disclosure ── */}
          <div className="relative w-full" style={{ perspective: "1000px" }}>
            <div
              key={activeIndex}
              className="bg-bg-surface/90 border border-border-subtle rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl mirror-reflect-base"
            >
              <CornerReticle size={8} color="rgba(255, 149, 0, 0.5)" />

              {/* Window Header */}
              <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3 border-b border-border-subtle bg-bg-raised/60">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-1 sm:ml-2 text-[11px] sm:text-xs font-mono text-text-muted font-semibold uppercase tracking-wider truncate">
                    career_record_0{activeIndex + 1}.sh
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono text-accent font-bold">
                  <Calendar size={11} />
                  <span>{active.period}</span>
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="p-4 sm:p-6 border-b border-border-subtle bg-bg-surface">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-black text-text-primary tracking-tight leading-tight">
                      {active.role}
                    </h3>
                    <p className="text-sm sm:text-base font-mono font-bold text-accent mt-0.5 sm:mt-1 flex items-center gap-1.5">
                      <span>@ {active.company}</span>
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-bg-raised border border-border-subtle text-[11px] sm:text-xs font-mono text-text-secondary self-start sm:self-auto">
                    <MapPin size={11} className="text-accent" />
                    <span>{active.location}</span>
                  </span>
                </div>
              </div>

              {/* Surface Summary Narrative */}
              <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-border-subtle bg-bg-surface/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-xs sm:text-sm font-body text-text-secondary leading-relaxed max-w-2xl">
                  {active.description}
                </p>
                <button
                  onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                  className={`px-3.5 py-1.5 rounded-xl border text-[11px] font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 self-start sm:self-auto ${
                    isDetailsOpen
                      ? "bg-accent/15 border-accent text-accent"
                      : "bg-bg-raised border-border-subtle text-text-secondary hover:border-border-base hover:text-text-primary"
                  }`}
                >
                  <Sparkles size={11} />
                  <span>{isDetailsOpen ? "Hide Breakdown" : "Inspect Operations"}</span>
                  <ChevronDown size={12} className={`transition-transform duration-200 ${isDetailsOpen ? "rotate-180" : ""}`} />
                </button>
              </div>

              {/* Progressive Disclosure: Operations & Impact Breakdown on Click */}
              <AnimatePresence>
                {isDetailsOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 bg-bg-raised/40 border-b border-border-subtle">
                      <div>
                        <p className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-accent mb-2 flex items-center gap-1.5">
                          <Terminal size={12} />
                          <span>// Technical Automation & Impact</span>
                        </p>
                        <ul className="space-y-1.5">
                          {(active.impact || []).map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-[11px] sm:text-xs font-mono text-text-secondary leading-snug">
                              <CheckCircle2 size={12} className="text-emerald-400 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-accent mb-2 flex items-center gap-1.5">
                          <Briefcase size={12} />
                          <span>// Operational Scope</span>
                        </p>
                        <ul className="space-y-1.5">
                          {(active.operations || []).map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-[11px] sm:text-xs font-mono text-text-muted leading-snug">
                              <CheckCircle2 size={12} className="text-accent shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom Status Bar */}
              <div className="px-4 sm:px-5 py-2 sm:py-2.5 border-t border-border-subtle bg-bg-raised/60 flex items-center justify-between text-[11px] sm:text-xs font-mono text-text-muted">
                <span>TIMELINE STAGE: <span className="text-emerald-400 font-bold">0{activeIndex + 1} of 0{items.length}</span></span>
                <span className="text-accent font-bold hidden sm:inline">SCROLL TO ADVANCE YEARS ↓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
