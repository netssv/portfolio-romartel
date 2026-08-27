"use client";

import React, { useEffect, useState, useRef } from "react";
import { Zap, ShieldCheck, Layers, Terminal, ChevronDown, Sparkles } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { CornerReticle } from "@/src/components/ui/CornerReticle";

export interface MetricItem {
  value: string;
  label: string;
  subtitle?: string;
  details?: string;
}

interface MetricsSectionProps {
  metrics: MetricItem[];
}

const AnimatedCounter: React.FC<{ value: string }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(() => {
    const match = value.match(/^([+-]?\d+)(.*)$/);
    return match ? "0" : value;
  });
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  useEffect(() => {
    const match = value.match(/^([+-]?\d+)(.*)$/);
    if (!isInView) {
      if (match) setDisplayValue("0");
      return;
    }
    if (!match) return;

    const targetNum = parseInt(match[1], 10);
    const suffix = match[2] || "";
    const duration = 1200;
    const startTime = performance.now();
    let frameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress * (2 - progress);
      const currentVal = Math.floor(easeProgress * targetNum);
      setDisplayValue(`${currentVal}${suffix}`);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [value, isInView]);

  return <span ref={ref}>{displayValue}</span>;
};

const ICONS = [Zap, ShieldCheck, Layers, Terminal];

export const MetricsSection: React.FC<MetricsSectionProps> = ({ metrics }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (i: number) => {
    setExpandedIndex(expandedIndex === i ? null : i);
  };

  return (
    <section className="py-20 border-b border-border-subtle relative overflow-hidden z-10">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-white/15 via-zinc-800/40 to-zinc-900/80 shadow-[0_25px_60px_rgba(0,0,0,0.9)] mirror-reflect-base">
            <div className="relative rounded-[23px] overflow-hidden bg-zinc-950/90 backdrop-blur-xl p-6 sm:p-8">
              <CornerReticle size={8} color="rgba(255, 149, 0, 0.5)" />

              {/* ── 4 Main Metric Cards Grid ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {metrics.map((m, i) => {
                  const Icon = ICONS[i % ICONS.length];
                  const isExpanded = expandedIndex === i;

                  return (
                    <motion.div
                      key={i}
                      onClick={() => toggleExpand(i)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative flex flex-col p-5 rounded-2xl border transition-all duration-200 cursor-pointer group select-none ${
                        isExpanded
                          ? "bg-zinc-900/90 border-accent shadow-[0_0_20px_rgba(255,149,0,0.25)]"
                          : "bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/60"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="p-2 rounded-xl bg-accent/10 border border-accent/20 text-accent group-hover:scale-110 transition-transform">
                          <Icon size={16} />
                        </span>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400 flex items-center gap-1">
                          <span>Details</span>
                          <ChevronDown size={11} className={`transition-transform duration-200 ${isExpanded ? "rotate-180 text-accent" : ""}`} />
                        </span>
                      </div>

                      <div className="text-3.5xl sm:text-4xl lg:text-4.5xl font-heading font-black text-white tracking-tight leading-none mb-1.5">
                        <AnimatedCounter value={m.value} />
                      </div>

                      <span className="text-sm font-body font-bold text-zinc-100 mb-0.5">
                        {m.label}
                      </span>
                      <span className="text-xs font-mono text-accent font-medium">
                        {m.subtitle}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* ── Progressive Disclosure Drawer (On-Demand Context) ── */}
              <AnimatePresence>
                {expandedIndex !== null && metrics[expandedIndex] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 sm:p-5 rounded-xl border border-zinc-700/80 bg-zinc-900/90 shadow-inner flex items-start gap-3">
                      <Sparkles className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                          Operational Insight: {metrics[expandedIndex].label} ({metrics[expandedIndex].value})
                        </span>
                        <p className="text-xs sm:text-sm font-body text-zinc-300 leading-relaxed mt-1">
                          {metrics[expandedIndex].details}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
