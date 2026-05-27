"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { SectionLabel } from "@/src/components/ui/SectionLabel";

interface SkillCategory {
  title: string;
  icon?: string;
  skills: string[];
}
interface SkillsMatrixData { [key: string]: SkillCategory; }

const PROFICIENCY: Record<string, { level: number; label: string; color: string }> = {
  businessCore:    { level: 92, label: "Expert",       color: "#FF9500" },
  dataIntelligence:{ level: 80, label: "Advanced",     color: "#34d399" },
  technicalTooling:{ level: 72, label: "Proficient",   color: "#60a5fa" },
};

const cardVariants = {
  initial: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, type: "spring" as const, stiffness: 200, damping: 22 } }),
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: (i: number) => ({ opacity: 1, scale: 1, transition: { delay: i * 0.04, type: "spring" as const, stiffness: 280, damping: 20 } }),
  exit:   { opacity: 0, scale: 0.85, transition: { duration: 0.1 } },
};

const SkillCard: React.FC<{ catKey: string; cat: SkillCategory; index: number }> = ({ catKey, cat, index }) => {
  const [hovered, setHovered] = useState(false);
  const meta = PROFICIENCY[catKey] ?? { level: 70, label: "Proficient", color: "#FF9500" };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="initial"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group flex flex-col gap-5 p-6 rounded-2xl border border-border-subtle bg-bg-surface overflow-hidden cursor-default
                 hover:border-accent/40 hover:shadow-[0_0_32px_rgba(255,149,0,0.08)] transition-all duration-300"
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: `radial-gradient(280px circle at 50% 0%, ${meta.color}10, transparent 70%)` }}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-4 relative z-10">
        <div>
          <span className="text-2xl leading-none">{cat.icon}</span>
          <h3 className="text-sm font-heading font-bold text-text-primary mt-2 leading-tight">{cat.title}</h3>
          <p className="text-[10px] font-body text-text-muted mt-0.5">{cat.skills.length} capabilities</p>
        </div>
        {/* Level badge */}
        <span
          className="shrink-0 px-2.5 py-1 rounded-full text-[10px] font-body font-bold tracking-wide border"
          style={{ color: meta.color, borderColor: `${meta.color}30`, background: `${meta.color}0D` }}
        >
          {meta.label}
        </span>
      </div>

      {/* Proficiency bar */}
      <div className="relative z-10 flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-body text-text-muted uppercase tracking-widest">Proficiency</span>
          <span className="text-[11px] font-body font-bold" style={{ color: meta.color }}>{meta.level}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-bg-raised overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${meta.color}CC, ${meta.color})` }}
            initial={{ width: 0 }}
            whileInView={{ width: `${meta.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.15 + 0.3, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Expandable Skill Pills */}
      <div className="relative z-10 min-h-[60px]">
        <AnimatePresence mode="wait">
          {hovered ? (
            <motion.div key="expanded" className="flex flex-wrap gap-1.5">
              {cat.skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  custom={i}
                  variants={pillVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="px-2.5 py-1 rounded-lg text-[10px] font-body text-text-secondary border border-border-subtle bg-bg-raised"
                >
                  {skill}
                </motion.span>
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
              {cat.skills.slice(0, 2).map((skill) => (
                <span key={skill} className="px-2.5 py-1 rounded-lg text-[10px] font-body text-text-muted border border-border-subtle bg-bg-raised">
                  {skill}
                </span>
              ))}
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-body text-text-muted/60 border border-dashed border-border-subtle">
                +{cat.skills.length - 2} more — hover to expand
              </span>
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
    <section id="skills" className="py-24 border-b border-border-subtle bg-bg-surface">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <SectionLabel
            eyebrow="Expertise"
            heading="Technical Skills"
            description="A curated toolkit across technical support, data intelligence, and digital operations — refined through years of cross-functional collaboration."
          />
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map(([key, cat], index) => (
            <SkillCard key={key} catKey={key} cat={cat} index={index} />
          ))}
        </div>

        {/* Footer hint */}
        <FadeIn delay={400}>
          <p className="mt-8 text-xs font-body text-text-muted/40 text-center">
            Hover each card to explore all capabilities in that domain
          </p>
        </FadeIn>
      </div>
    </section>
  );
};
