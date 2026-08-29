"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronDown, Sparkles } from "lucide-react";

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
          <div className="relative mb-6">
            <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-border-base" />
            <motion.div
              className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 bg-accent transition-all duration-200"
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
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center border transition-all duration-200 ${
                        isActive
                          ? "bg-accent border-accent text-white scale-110 shadow-xs"
                          : isPast
                          ? "bg-bg-surface border-accent text-accent"
                          : "bg-bg-surface border-border-subtle text-text-muted group-hover:border-border-base"
                      }`}
                    >
                      <Briefcase size={12} className={isActive ? "text-white" : "text-current"} />
                    </div>

                    <span
                      className={`text-xs font-body font-semibold mt-2 transition-colors ${
                        isActive ? "text-accent" : isPast ? "text-text-primary" : "text-text-muted"
                      }`}
                    >
                      {startYear}
                    </span>
                    <span className="text-[11px] font-body text-text-muted hidden sm:block max-w-[90px] truncate">
                      {job.company}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── 2. Experience Card Stage ── */}
          <div className="relative w-full">
            <div
              key={activeIndex}
              className="bg-bg-surface border border-border-base rounded-2xl overflow-hidden shadow-xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 sm:px-6 py-3 border-b border-border-subtle bg-bg-raised/50">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <span className="text-xs font-body font-semibold text-text-secondary uppercase tracking-wider">
                    Milestone {activeIndex + 1} of {items.length}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-body text-accent font-semibold">
                  <Calendar size={12} />
                  <span>{active.period}</span>
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="p-5 sm:p-6 border-b border-border-subtle bg-bg-surface">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-text-primary tracking-tight leading-tight">
                      {active.role}
                    </h3>
                    <p className="text-sm sm:text-base font-body font-semibold text-accent mt-1">
                      {active.company}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-bg-raised border border-border-subtle text-xs font-body text-text-secondary self-start sm:self-auto">
                    <MapPin size={12} className="text-accent" />
                    <span>{active.location}</span>
                  </span>
                </div>
              </div>

              {/* Summary Narrative */}
              <div className="px-5 sm:px-6 py-4 border-b border-border-subtle bg-bg-surface/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs sm:text-sm font-body text-text-secondary leading-relaxed max-w-2xl">
                  {active.description}
                </p>
                <button
                  onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                  className={`px-4 py-2 rounded-xl border text-xs font-body font-medium flex items-center gap-1.5 transition-all cursor-pointer shrink-0 self-start sm:self-auto ${
                    isDetailsOpen
                      ? "bg-accent/10 border-accent text-accent"
                      : "bg-bg-raised border-border-subtle text-text-secondary hover:border-border-base hover:text-text-primary"
                  }`}
                >
                  <Sparkles size={12} className={isDetailsOpen ? "text-accent" : "text-text-muted"} />
                  <span>{isDetailsOpen ? "Hide Breakdown" : "Inspect Operations"}</span>
                  <ChevronDown size={13} className={`transition-transform duration-200 ${isDetailsOpen ? "rotate-180" : ""}`} />
                </button>
              </div>

              {/* Progressive Disclosure Breakdown */}
              <AnimatePresence>
                {isDetailsOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 bg-bg-raised/40 border-b border-border-subtle">
                      <div>
                        <p className="text-xs font-body font-bold uppercase tracking-wider text-accent mb-2.5 flex items-center gap-1.5">
                          <CheckCircle2 size={13} className="text-accent" />
                          <span>Key Technical Impact</span>
                        </p>
                        <ul className="space-y-2">
                          {(active.impact || []).map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs font-body text-text-secondary leading-relaxed">
                              <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="text-xs font-body font-bold uppercase tracking-wider text-text-primary mb-2.5 flex items-center gap-1.5">
                          <Briefcase size={13} className="text-accent" />
                          <span>Operational Scope</span>
                        </p>
                        <ul className="space-y-2">
                          {(active.operations || []).map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs font-body text-text-muted leading-relaxed">
                              <span className="h-1.5 w-1.5 rounded-full bg-border-base mt-1.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Footer */}
              <div className="px-5 sm:px-6 py-3 border-t border-border-subtle bg-bg-raised/30 flex items-center justify-between text-xs font-body text-text-muted">
                <span>Timeline Stage: <strong className="text-text-primary font-semibold">{activeIndex + 1} of {items.length}</strong></span>
                <span className="text-accent font-medium hidden sm:inline">Scroll to advance milestones</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
