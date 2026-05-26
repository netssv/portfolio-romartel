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

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.85, y: 8 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 22 } },
};

const SkillPill: React.FC<{ skill: string }> = ({ skill }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.span
      variants={item}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative inline-flex items-center px-3.5 py-2 rounded-xl text-xs font-body font-medium cursor-default select-none overflow-hidden
                 border border-border-subtle text-text-secondary transition-colors duration-200
                 hover:text-text-primary hover:border-accent/40"
    >
      {/* Glow background on hover */}
      <motion.span
        className="absolute inset-0 rounded-xl bg-accent/8 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      <span className="relative z-10">{skill}</span>
    </motion.span>
  );
};

export const SkillsGrid: React.FC<{ skillsMatrix: SkillsMatrixData }> = ({ skillsMatrix }) => {
  const categories = Object.entries(skillsMatrix);
  const [activeKey, setActiveKey] = useState(categories[0][0]);

  const activeCategory = skillsMatrix[activeKey];

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

        <FadeIn delay={100}>
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 mt-12 mb-10">
            {categories.map(([key, cat]) => {
              const isActive = key === activeKey;
              return (
                <button
                  key={key}
                  onClick={() => setActiveKey(key)}
                  onMouseEnter={() => setActiveKey(key)}
                  className={`relative flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-sm font-body font-semibold
                              transition-all duration-300 focus:outline-none border overflow-hidden
                              ${isActive
                                ? "text-text-primary border-accent/50 shadow-[0_0_16px_rgba(255,149,0,0.15)]"
                                : "text-text-muted border-border-subtle hover:text-text-secondary hover:border-border-base"
                              }`}
                >
                  {/* Active tab fill */}
                  <motion.span
                    className="absolute inset-0 bg-accent/10 pointer-events-none"
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                  />
                  <span className="relative z-10 text-base leading-none">{cat.icon}</span>
                  <span className="relative z-10">{cat.title}</span>

                  {/* Active underline indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Skill Pills Panel */}
          <div className="relative min-h-[160px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeKey}
                variants={container}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                className="flex flex-wrap gap-3"
              >
                {activeCategory.skills.map((skill) => (
                  <SkillPill key={skill} skill={skill} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Skill count hint */}
          <p className="mt-8 text-xs font-body text-text-muted/50">
            {activeCategory.skills.length} capabilities in this domain
          </p>
        </FadeIn>
      </div>
    </section>
  );
};
