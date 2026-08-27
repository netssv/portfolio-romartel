"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { SectionLabel } from "@/src/components/ui/SectionLabel";
import { Terminal, Briefcase, CheckCircle2 } from "lucide-react";

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

const TerminalText: React.FC<{ text: string; speed?: number }> = ({ text, speed = 18 }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return <span>{displayed}</span>;
};

const BulletList: React.FC<{ items: string[]; label: string }> = ({ items, label }) => (
  <div className="flex-1">
    <p className="text-xs font-mono font-bold uppercase tracking-wider text-accent mb-3">
      {"// "}{label}
    </p>
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-xs font-mono text-text-secondary leading-relaxed">
          <CheckCircle2 size={13} className="text-accent shrink-0 mt-0.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export const ExperienceTimeline: React.FC<{ items: ExperienceItem[] }> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex];

  return (
    <section id="experience" className="py-24 border-b border-border-subtle relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 relative">
        <FadeIn>
          <SectionLabel
            index="04"
            eyebrow="Employment History"
            heading="Work Experience"
            description="Professional track record across web hosting infrastructure, quantitative systems, and operations."
          />
        </FadeIn>

        {/* Timeline Nav Bar */}
        <div className="flex justify-start md:justify-center overflow-x-auto pb-4 mb-8 gap-2.5 scrollbar-none" role="tablist" aria-label="Career Timeline">
          {items.map((job, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveIndex(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 border cursor-pointer ${
                  isActive
                    ? "border-accent bg-accent text-black font-bold shadow-md shadow-accent/20"
                    : "border-border-base bg-bg-surface text-text-muted hover:text-text-primary hover:border-border-subtle"
                }`}
              >
                <Briefcase size={13} />
                <span>{job.company}</span>
                <span className="opacity-70 text-[10px]">({job.period.split(" - ")[0]})</span>
              </button>
            );
          })}
        </div>

        {/* Active Terminal Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-bg-raised border border-border-base rounded-2xl overflow-hidden shadow-xl"
          >
            {/* Window bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border-subtle bg-bg-surface">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs font-mono text-text-muted uppercase font-semibold">
                  experience.log · record {activeIndex + 1}/{items.length}
                </span>
              </div>
              <span className="text-xs font-mono text-accent font-semibold">{active.period}</span>
            </div>

            {/* Content header */}
            <div className="px-6 pt-5 pb-4 border-b border-border-subtle/50">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <h3 className="text-xl font-mono font-bold text-text-primary">
                    <TerminalText key={`role-${activeIndex}`} text={active.role} speed={20} />
                  </h3>
                  <p className="text-sm font-mono font-semibold text-accent mt-0.5">@ {active.company}</p>
                </div>
                <span className="text-xs font-mono text-text-muted">{active.location}</span>
              </div>
            </div>

            {/* Summary */}
            <div className="px-6 py-4 border-b border-border-subtle/50 bg-bg-surface/30">
              <p className="text-xs font-mono text-text-secondary leading-relaxed">{active.description}</p>
            </div>

            {/* Bullets */}
            <div className="px-6 py-6 flex flex-col md:flex-row gap-8">
              <BulletList items={active.impact || []} label="Impact & Automation" />
              <div className="hidden md:block w-[1px] bg-border-subtle self-stretch" />
              <BulletList items={active.operations || []} label="Core Operations" />
            </div>

            {/* Footer Status */}
            <div className="px-5 py-2.5 border-t border-border-subtle bg-bg-surface/60 flex items-center justify-between text-xs font-mono text-text-muted">
              <span>STATUS: <span className="text-emerald-500 font-bold">ACTIVE</span></span>
              <span>{(active.impact?.length || 0) + (active.operations?.length || 0)} ENTRIES</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

