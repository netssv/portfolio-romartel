"use client";

import React, { useState } from "react";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, Cpu, Network, Sparkles, Workflow } from "lucide-react";

interface TrustedStackProps {
  stack: string[];
}

const getTechIcon = (tech: string) => {
  const name = tech.toLowerCase();
  if (name.includes("seo") || name.includes("cro") || name.includes("content") || name.includes("search")) {
    return <Network size={13} className="text-accent" />;
  }
  if (name.includes("analytics") || name.includes("clarity") || name.includes("ga4") || name.includes("power bi")) {
    return <BarChart3 size={13} className="text-accent" />;
  }
  if (name.includes("python") || name.includes("zapier") || name.includes("make") || name.includes("webhook")) {
    return <Workflow size={13} className="text-accent" />;
  }
  if (name.includes("ai") || name.includes("claude") || name.includes("gemini")) {
    return <Sparkles size={13} className="text-accent" />;
  }
  return <Cpu size={13} className="text-accent" />;
};

const TechTag: React.FC<{ tech: string }> = ({ tech }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-body font-medium text-text-secondary bg-bg-surface border border-border-subtle hover:border-accent hover:text-text-primary transition-all duration-150 cursor-default select-none shadow-xs"
    >
      <AnimatePresence initial={false}>
        {hovered && (
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="flex items-center shrink-0 mr-1 overflow-hidden"
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
  <section className="py-12 border-b border-border-subtle bg-bg-base">
    <div className="mx-auto max-w-6xl px-6">
      <FadeIn>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <span className="text-xs font-body font-semibold uppercase tracking-[0.16em] text-accent shrink-0">
            Core Toolkit
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
