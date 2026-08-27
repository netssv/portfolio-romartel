"use client";

import React from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { Cpu, LineChart, Workflow, LucideIcon } from "lucide-react";

interface PhilosophyProps {
  quote: string;
  focus: string[];
}

interface Pillar {
  title: string;
  description: string;
  icon: LucideIcon;
}

const PILLARS: Pillar[] = [
  {
    title: "Engineering Rigor",
    description: "Deep server and web infrastructure understanding behind every marketing decision.",
    icon: Cpu,
  },
  {
    title: "Growth Telemetry",
    description: "Data-driven CRO, GA4 custom event tracking, and quantitative modeling.",
    icon: LineChart,
  },
  {
    title: "Practical Automation",
    description: "Building Python and POSIX tools that eliminate friction and speed up execution.",
    icon: Workflow,
  },
];

export const PhilosophySection: React.FC<PhilosophyProps> = ({ quote }) => {
  return (
    <section className="py-24 border-b border-border-subtle relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <FadeIn>
          <div className="mb-14 max-w-3xl">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.14em] text-text-accent block mb-3">
              Strategic Vision
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-text-primary leading-snug">
              &ldquo;{quote}&rdquo;
            </h2>
          </div>

          {/* 3 Visual Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((p, idx) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.35, delay: idx * 0.1 }}
                  className="p-6 rounded-2xl border border-border-base bg-bg-surface flex flex-col justify-between hover:border-accent shadow-sm transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-colors">
                      <Icon size={18} />
                    </div>
                    <span className="text-xs font-mono text-text-muted">0{idx + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-heading font-bold text-text-primary mb-1.5 group-hover:text-accent transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs font-body text-text-secondary leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

