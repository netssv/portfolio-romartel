"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Briefcase, Calendar, MapPin, CheckCircle2, Terminal } from "lucide-react";
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

  const active = items[activeIndex] || items[0];

  return (
    <div ref={containerRef} className="relative h-[380vh] w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-20 px-6 py-8">
        <div className="mx-auto max-w-5xl w-full flex flex-col justify-center">
          
          {/* ── 1. Chronological Timeline Ribbon ── */}
          <div className="relative mb-6">
            {/* Background Line */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-zinc-800" />
            {/* Active Progress Fill */}
            <motion.div
              className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 bg-accent shadow-[0_0_12px_rgba(255,149,0,0.8)] transition-all duration-300"
              style={{ width: `${(activeIndex / (items.length - 1)) * 100}%` }}
            />

            {/* Timeline Year Nodes */}
            <div className="relative flex justify-between items-center z-10">
              {items.map((job, idx) => {
                const isActive = idx === activeIndex;
                const isPast = idx <= activeIndex;
                const startYear = job.period.split(" - ")[0].trim();

                return (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className="flex flex-col items-center group cursor-pointer focus:outline-none"
                    aria-label={`Jump to ${job.company} (${startYear})`}
                  >
                    {/* Node Dot */}
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                        isActive
                          ? "bg-accent border-accent text-black scale-110 shadow-[0_0_18px_rgba(255,149,0,0.7)]"
                          : isPast
                          ? "bg-zinc-900 border-accent/60 text-accent"
                          : "bg-zinc-950 border-zinc-800 text-zinc-600 group-hover:border-zinc-700"
                      }`}
                    >
                      <Briefcase size={12} className={isActive ? "text-black" : "text-current"} />
                    </div>

                    {/* Year Label */}
                    <span
                      className={`text-[10px] sm:text-xs font-mono font-bold mt-2 transition-colors duration-200 ${
                        isActive
                          ? "text-accent drop-shadow-[0_0_8px_rgba(255,149,0,0.5)]"
                          : isPast
                          ? "text-zinc-300"
                          : "text-zinc-600"
                      }`}
                    >
                      {startYear}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-500 hidden sm:block max-w-[80px] truncate">
                      {job.company}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── 2. Cinematic Terminal Experience Stage ── */}
          <div className="relative w-full" style={{ perspective: "1000px" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 16, rotateX: 2 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -16, rotateX: -2 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="bg-zinc-950/90 border border-zinc-800/90 rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl mirror-reflect-base"
              >
                <CornerReticle size={8} color="rgba(255, 149, 0, 0.5)" />

                {/* Window Header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800 bg-zinc-900/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-xs font-mono text-zinc-400 font-semibold uppercase tracking-wider">
                      career_record_{String(activeIndex + 1).padStart(2, "0")}.sh
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-accent font-bold">
                    <Calendar size={12} />
                    <span>{active.period}</span>
                  </div>
                </div>

                {/* Title & Metadata */}
                <div className="p-6 sm:p-7 border-b border-zinc-800/60 bg-gradient-to-r from-zinc-950 via-zinc-900/30 to-zinc-950">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-tight leading-tight">
                        {active.role}
                      </h3>
                      <p className="text-base font-mono font-bold text-accent mt-1 flex items-center gap-1.5">
                        <span>@ {active.company}</span>
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 self-start sm:self-auto">
                      <MapPin size={11} className="text-accent" />
                      <span>{active.location}</span>
                    </span>
                  </div>
                </div>

                {/* Narrative Summary */}
                <div className="px-6 py-4 border-b border-zinc-800/40 bg-zinc-950/40">
                  <p className="text-xs sm:text-sm font-body text-zinc-300 leading-relaxed">
                    {active.description}
                  </p>
                </div>

                {/* Operations & Impact Grid */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-mono font-bold uppercase tracking-wider text-accent mb-3 flex items-center gap-1.5">
                      <Terminal size={12} />
                      <span>// Impact & Technical Automation</span>
                    </p>
                    <ul className="space-y-2">
                      {(active.impact || []).map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs font-mono text-zinc-300 leading-relaxed">
                          <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-mono font-bold uppercase tracking-wider text-accent mb-3 flex items-center gap-1.5">
                      <Briefcase size={12} />
                      <span>// Operational Scope</span>
                    </p>
                    <ul className="space-y-2">
                      {(active.operations || []).map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs font-mono text-zinc-400 leading-relaxed">
                          <CheckCircle2 size={13} className="text-accent shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Status Bar */}
                <div className="px-5 py-2.5 border-t border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>TIMELINE STAGE: <span className="text-emerald-400 font-bold">{activeIndex + 1} of {items.length}</span></span>
                  <span className="text-accent font-bold">SCROLL TO ADVANCE YEARS ↓</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
