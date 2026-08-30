"use client";

import React, { useEffect, useState, useRef } from "react";
import { Zap, ShieldCheck, Layers, Cpu, ChevronDown, Sparkles } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/src/components/ui/FadeIn";

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
    if (!isInView || !match) return;

    const targetNum = parseInt(match[1], 10);
    const suffix = match[2] || "";
    const duration = 1000;
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

const ICONS = [Zap, ShieldCheck, Layers, Cpu];

import { useLanguage } from "@/src/context/LanguageContext";

export const MetricsSection: React.FC<MetricsSectionProps> = ({ metrics }) => {
  const { isSpanish } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (i: number) => {
    setExpandedIndex(expandedIndex === i ? null : i);
  };

  return (
    <section id="metrics" className="py-20 border-b border-border-subtle relative overflow-hidden z-10 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <div className="rounded-3xl border border-border-base bg-bg-surface p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {metrics.map((m, i) => {
                const Icon = ICONS[i % ICONS.length];
                const isExpanded = expandedIndex === i;

                return (
                  <motion.div
                    key={i}
                    onClick={() => toggleExpand(i)}
                    whileHover={{ y: -2 }}
                    className={`relative flex flex-col justify-between p-5 rounded-2xl border transition-all duration-200 cursor-pointer group select-none ${
                      isExpanded
                        ? "bg-bg-raised border-accent shadow-xs"
                        : "bg-bg-surface border-border-subtle hover:border-border-base hover:bg-bg-raised/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="p-2 rounded-xl bg-accent/10 text-accent">
                        <Icon size={16} />
                      </span>
                      <span className="text-[11px] font-body text-text-muted flex items-center gap-1 font-medium">
                        <span>{isSpanish ? "Contexto" : "Context"}</span>
                        <ChevronDown size={11} className={`transition-transform duration-200 ${isExpanded ? "rotate-180 text-accent" : ""}`} />
                      </span>
                    </div>

                    <div className="text-3xl sm:text-4xl font-heading font-extrabold text-text-primary tracking-tight leading-none mb-1.5">
                      <AnimatedCounter value={m.value} />
                    </div>

                    <span className="text-sm font-body font-semibold text-text-primary mb-0.5">
                      {m.label}
                    </span>
                    <span className="text-xs font-body text-accent font-medium">
                      {m.subtitle}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Context Drawer */}
            <AnimatePresence>
              {expandedIndex !== null && metrics[expandedIndex] && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-4 sm:p-5 rounded-xl border border-border-subtle bg-bg-raised/70 flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-body font-bold text-text-primary uppercase tracking-wider">
                        {isSpanish ? "Contexto Operativo: " : "Operational Context: "}
                        {metrics[expandedIndex].label}
                      </span>
                      <p className="text-xs sm:text-sm font-body text-text-secondary leading-relaxed mt-1">
                        {metrics[expandedIndex].details}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
