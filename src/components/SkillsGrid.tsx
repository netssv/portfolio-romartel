"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { SectionLabel } from "@/src/components/ui/SectionLabel";
import { Target, BarChart3, Cpu, LucideIcon } from "lucide-react";

interface SkillCategory {
  title: string;
  icon?: string;
  skills: string[];
}
interface SkillsMatrixData {
  [key: string]: SkillCategory;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Target,
  BarChart3,
  Cpu,
};

const PROFICIENCY: Record<string, { label: string }> = {
  businessCore: { label: "Core Competency" },
  dataIntelligence: { label: "Advanced Analytics" },
  technicalTooling: { label: "Production Tooling" },
};

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, type: "spring" as const, stiffness: 200, damping: 22 },
  }),
};

const SkillCard: React.FC<{ catKey: string; cat: SkillCategory; index: number }> = ({
  catKey,
  cat,
  index,
}) => {
  const [hovered, setHovered] = useState(false);
  const meta = PROFICIENCY[catKey] ?? { label: "Capability" };
  const IconComponent = cat.icon ? ICON_MAP[cat.icon] ?? Cpu : Cpu;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="initial"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group flex flex-col justify-between gap-5 p-6 rounded-2xl border border-border-base bg-bg-surface overflow-hidden hover:border-accent hover:shadow-lg transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-4 relative z-10">
        <div>
          <div className="p-2.5 rounded-xl bg-accent/10 w-fit text-accent">
            <IconComponent size={20} />
          </div>
          <h3 className="text-base font-heading font-bold text-text-primary mt-3.5 leading-tight">
            {cat.title}
          </h3>
          <p className="text-xs font-body text-text-muted mt-0.5">
            {cat.skills.length} capabilities
          </p>
        </div>
        <span className="shrink-0 px-2.5 py-1 rounded-full text-xs font-body font-semibold border bg-bg-raised text-accent border-border-subtle">
          {meta.label}
        </span>
      </div>

      <div className="relative z-10 min-h-[70px]">
        <AnimatePresence mode="wait">
          {hovered ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-wrap gap-1.5"
            >
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-lg text-xs font-body text-text-primary border border-border-subtle bg-bg-raised"
                >
                  {skill}
                </span>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-wrap gap-1.5"
            >
              {cat.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-lg text-xs font-body text-text-secondary border border-border-subtle bg-bg-surface"
                >
                  {skill}
                </span>
              ))}
              {cat.skills.length > 3 && (
                <span className="px-2.5 py-1 rounded-lg text-xs font-body text-text-muted border border-dashed border-border-subtle">
                  +{cat.skills.length - 3} more
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const SkillsGrid: React.FC<{ skillsMatrix: SkillsMatrixData }> = ({ skillsMatrix }) => {
  const categories = Object.entries(skillsMatrix);

  return (
    <section id="skills" className="py-24 border-b border-border-subtle bg-bg-base">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <SectionLabel
            eyebrow="Capabilities"
            heading="Technical Tooling &amp; Strategy Matrix"
            description="A disciplined toolkit across workflow automation, data intelligence, CRM architecture, and growth operations."
          />
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map(([key, cat], index) => (
            <SkillCard key={key} catKey={key} cat={cat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
