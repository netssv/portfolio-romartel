"use client";

import React, { useEffect, useState, useRef } from "react";
import { Zap, Activity, Cpu, Layers } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { FadeIn } from "@/src/components/ui/FadeIn";

interface Metric {
  value: string;
  label: string;
}

interface MetricsSectionProps {
  metrics: Metric[];
}

const AnimatedCounter: React.FC<{ value: string }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(() => {
    const match = value.match(/^([+-]?\d+)(.*)$/);
    return match ? "0" : value;
  });
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    const match = value.match(/^([+-]?\d+)(.*)$/);
    if (!match) return;

    const targetNum = parseInt(match[1], 10);
    const suffix = match[2] || "";

    const duration = 1400; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out quad
      const easeProgress = progress * (2 - progress);
      const currentVal = Math.floor(easeProgress * targetNum);

      setDisplayValue(`${currentVal}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(animate);
  }, [value, isInView]);

  return <span ref={ref}>{displayValue}</span>;
};

const ICONS = [Zap, Activity, Cpu, Layers];

export const MetricsSection: React.FC<MetricsSectionProps> = ({ metrics }) => {
  return (
    <section className="py-20 border-b border-border-subtle relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <div className="relative backdrop-blur-lg bg-bg-glass border border-border-base shadow-[0_24px_50px_rgba(0,0,0,0.06)] rounded-2xl p-10 sm:p-12 flex flex-col md:flex-row items-center justify-around gap-12 md:gap-8">
            
            {/* Ambient orange highlight inside the glass container */}
            <div className="pointer-events-none absolute -bottom-12 left-1/4 w-72 h-72 rounded-full bg-accent/5 blur-[80px]" />

            {metrics.map((m, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <React.Fragment key={i}>
                  <motion.div
                    className="flex flex-col items-center text-center max-w-[220px]"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Icon size={20} className="text-accent opacity-90" />
                      <span className="text-4xl sm:text-5xl font-heading font-extrabold text-text-primary tracking-tight">
                        <AnimatedCounter value={m.value} />
                      </span>
                    </div>
                    <span className="text-sm font-body font-semibold text-text-secondary leading-snug">
                      {m.label}
                    </span>
                  </motion.div>

                  {/* Vertical dividers between elements (Desktop only) */}
                  {i < metrics.length - 1 && (
                    <div className="hidden md:block h-16 w-px bg-border-base shrink-0" aria-hidden="true" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

