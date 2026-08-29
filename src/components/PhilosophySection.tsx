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
    title: "Systems Reliability",
    description: "Deep server and web infrastructure understanding behind every marketing decision.",
    icon: Cpu,
  },
  {
    title: "Growth Telemetry",
    description: "Data-driven CRO, GA4 custom event tracking, and quantitative telemetry modeling.",
    icon: LineChart,
  },
  {
    title: "Pragmatic Automation",
    description: "Building Python, webhook, and serverless tools that eliminate friction and speed up execution.",
    icon: Workflow,
  },
];

export const PhilosophySection: React.FC<PhilosophyProps> = ({ quote }) => {
  return (
    <section id="philosophy" className="py-24 border-b border-border-subtle relative overflow-hidden bg-bg-surface">
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <FadeIn>
          <div className="mb-12 max-w-3xl">
            <span className="text-xs font-body font-semibold uppercase tracking-[0.18em] text-accent block mb-3">
              Strategic Approach
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-text-primary leading-snug">
              &ldquo;{quote}&rdquo;
            </h2>
          </div>

          {/* 3 Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((p, idx) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  className="p-6 rounded-2xl border border-border-base bg-bg-raised/40 flex flex-col justify-between hover:border-accent hover:bg-bg-surface shadow-xs transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors mb-5">
                    <Icon size={18} />
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
