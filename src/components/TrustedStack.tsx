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
  if (name.includes("python")) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#3776AB] fill-current" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h2v2h-2v-2zm0-10h2v8h-2V6z" />
      </svg>
    );
  }
  if (name.includes("sql")) {
    return <Database size={14} className="text-[#00758F]" />;
  }
  if (name.includes("power bi")) {
    return <BarChart3 size={14} className="text-[#F2C811]" />;
  }
  if (name.includes("bash")) {
    return <Terminal size={14} className="text-[#4EAA25]" />;
  }
  if (name.includes("android") || name.includes("kotlin")) {
    return <Binary size={14} className="text-[#7F52FF]" />;
  }
  if (name.includes("next.js") || name.includes("next")) {
    return <Cpu size={14} className="text-text-primary" />;
  }
  if (name.includes("data engineering")) {
    return <Network size={14} className="text-[#00A4EF]" />;
  }
  if (name.includes("ai tools") || name.includes("ai")) {
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

