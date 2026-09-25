"use client";

import React, { useState, useEffect, useRef } from "react";
import { Zap, ShieldCheck, Layers, Cpu, ChevronDown, Sparkles } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useLanguage } from "@/src/context/LanguageContext";

export interface MetricItem {
  value: string;
  label: string;
  subtitle?: string;
  details?: string;
}

interface SloganMetricsGridProps {
  metrics: MetricItem[];
}

const ICONS = [Zap, ShieldCheck, Layers, Cpu];

const AnimatedCounter: React.FC<{ value: string }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(() => {
    const match = value.match(/^([+-]?\d+)(.*)$/);
    return match ? "0" : value;
  });
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-20px" });

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

export const SloganMetricsGrid: React.FC<SloganMetricsGridProps> = ({ metrics }) => {
  const { isSpanish } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (i: number) => {
    setExpandedIndex(expandedIndex === i ? null : i);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-6 sm:mt-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {metrics.map((m, i) => {
          const Icon = ICONS[i % ICONS.length];
          const isExpanded = expandedIndex === i;

          return (
            <motion.div
              key={i}
              onClick={() => toggleExpand(i)}
              whileHover={{ y: -2 }}
              className={`relative flex flex-col justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-200 cursor-pointer select-none text-left ${
                isExpanded
                  ? "bg-white/15 border-white/40 shadow-md"
                  : "bg-white/[0.07] border-white/15 hover:border-white/30 hover:bg-white/[0.12]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="p-1.5 rounded-lg bg-white/10 text-[#93C5FD]">
                  <Icon size={14} />
                </span>
                <span className="text-[10px] sm:text-[11px] font-body text-white/70 flex items-center gap-1 font-medium">
                  <span>{isSpanish ? "Contexto" : "Context"}</span>
                  <ChevronDown
                    size={10}
                    className={`transition-transform duration-200 ${
                      isExpanded ? "rotate-180 text-white" : ""
                    }`}
                  />
                </span>
              </div>

              <div className="text-2xl sm:text-3xl font-heading font-black !text-white tracking-tight leading-none mb-1">
                <AnimatedCounter value={m.value} />
              </div>

              <span className="text-xs sm:text-sm font-body font-semibold text-white leading-tight">
                {m.label}
              </span>
              <span className="text-[10px] sm:text-xs font-mono text-[#93C5FD] font-medium leading-tight mt-0.5">
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
            animate={{ opacity: 1, height: "auto", marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="p-3.5 sm:p-4 rounded-xl border border-white/20 bg-black/25 backdrop-blur-md flex items-start gap-2.5 text-left">
              <Sparkles className="w-3.5 h-3.5 text-[#93C5FD] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] sm:text-xs font-body font-bold text-white uppercase tracking-wider">
                  {isSpanish ? "Detalle: " : "Details: "}
                  {metrics[expandedIndex].label}
                </span>
                <p className="text-xs sm:text-sm font-body text-white/85 leading-relaxed mt-0.5">
                  {metrics[expandedIndex].details}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
