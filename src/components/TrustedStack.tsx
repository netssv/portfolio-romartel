"use client";

import React, { useState } from "react";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { motion, AnimatePresence } from "framer-motion";
import { Database, BarChart3, Terminal, Cpu, Network, Sparkles, Binary } from "lucide-react";

interface TrustedStackProps {
  stack: string[];
}

const getTechIcon = (tech: string) => {
  const name = tech.toLowerCase();
  if (name.includes("seo") || name.includes("cro") || name.includes("content") || name.includes("search console")) {
    return <Network size={14} className="text-[#00A4EF]" />;
  }
  if (name.includes("analytics") || name.includes("clarity") || name.includes("ga4") || name.includes("power bi") || name.includes("testing")) {
    return <BarChart3 size={14} className="text-[#F2C811]" />;
  }
  if (name.includes("bash") || name.includes("cli") || name.includes("terminal")) {
    return <Terminal size={14} className="text-[#4EAA25]" />;
  }
  if (name.includes("next.js") || name.includes("next")) {
    return <Cpu size={14} className="text-text-primary" />;
  }
  if (name.includes("ai") || name.includes("claude") || name.includes("antigravity")) {
    return <Sparkles size={14} className="text-[#A259FF]" />;
  }
  return <Cpu size={14} className="text-text-muted" />;
};

const TechTag: React.FC<{ tech: string }> = ({ tech }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-body font-semibold text-text-secondary bg-bg-surface border border-border-subtle hover:border-accent hover:text-text-primary transition-all duration-150 cursor-default select-none relative overflow-hidden h-7"
    >
      <AnimatePresence initial={false}>
        {hovered && (
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeInOut" }}
            className="flex items-center shrink-0 mr-0.5 overflow-hidden"
          >
            {getTechIcon(tech)}
          </motion.span>
        )}
      </AnimatePresence>
      <span>{tech}</span>
    </span>
  );
};

export const TrustedStack: React.FC<TrustedStackProps> = ({ stack }) => (
  <section className="py-12 border-b border-border-subtle">
    <div className="mx-auto max-w-6xl px-6">
      <FadeIn>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="text-[11px] font-body font-semibold uppercase tracking-[0.12em] text-text-muted shrink-0">
            Tech stack
          </span>
          <div className="h-px flex-1 bg-border-subtle hidden sm:block" />
          <div className="flex flex-wrap gap-2">
            {stack.map((tech) => (
              <TechTag key={tech} tech={tech} />
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);

