"use client";

import React from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { SectionLabel } from "@/src/components/ui/SectionLabel";
import { Target, BarChart3, Cpu, LucideIcon, CheckCircle2 } from "lucide-react";

import { useLanguage } from "@/src/context/LanguageContext";

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

const cardVariants = {
  initial: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, type: "spring" as const, stiffness: 200, damping: 22 },
  }),
};

const SkillCard: React.FC<{ catKey: string; cat: SkillCategory; index: number }> = ({
  catKey,
  cat,
  index,
}) => {
  const { isSpanish } = useLanguage();
  const metaLabels: Record<string, string> = isSpanish
    ? {
        businessCore: "Operaciones Clave",
        dataIntelligence: "Datos y BI",
        technicalTooling: "Herramientas e Infra",
      }
    : {
        businessCore: "Core Operations",
        dataIntelligence: "Data & BI",
        technicalTooling: "Tooling & Infra",
      };

  const label = metaLabels[catKey] || (isSpanish ? "Capacidad" : "Capability");
  const IconComponent = cat.icon ? ICON_MAP[cat.icon] ?? Cpu : Cpu;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="initial"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="relative flex flex-col justify-between p-6 rounded-2xl border border-border-base bg-bg-surface hover:border-accent transition-all duration-200 shadow-xs h-full"
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-accent/10 text-accent">
            <IconComponent size={20} />
          </div>
          <span className="shrink-0 px-2.5 py-1 rounded-full text-xs font-body font-semibold border bg-bg-raised text-accent border-border-subtle">
            {label}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-heading font-bold text-text-primary leading-snug mb-1">
          {cat.title}
        </h3>
        <p className="text-xs font-body text-text-muted mb-4">
          {isSpanish ? `${cat.skills.length} capacidades clave` : `${cat.skills.length} core capabilities`}
        </p>

        {/* Capability Items */}
        <ul className="space-y-2">
          {cat.skills.map((skill) => (
            <li
              key={skill}
              className="flex items-start gap-2 text-xs font-body text-text-secondary leading-relaxed p-1.5 rounded-lg hover:bg-bg-raised/70 transition-colors"
            >
              <CheckCircle2 size={13} className="text-accent shrink-0 mt-0.5" />
              <span>{skill}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export const SkillsGrid: React.FC<{ skillsMatrix: SkillsMatrixData }> = ({ skillsMatrix }) => {
  const { t } = useLanguage();
  const categories = Object.entries(skillsMatrix);

  return (
    <section id="skills" className="py-24 border-b border-border-subtle bg-bg-base">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <SectionLabel
            eyebrow={t.skills.eyebrow}
            heading={t.skills.heading}
            description={t.skills.description}
          />
        </FadeIn>

        {/* Stable 3-column grid without orphan cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {categories.map(([key, cat], index) => (
            <SkillCard key={key} catKey={key} cat={cat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
