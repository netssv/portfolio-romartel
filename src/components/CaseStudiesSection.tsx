"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { SectionLabel } from "@/src/components/ui/SectionLabel";
import { useLanguage } from "@/src/context/LanguageContext";
import { CASE_STUDIES_EN, CASE_STUDIES_ES } from "@/src/data/i18n/caseStudies";
import { CaseStudyStage } from "./case-studies/CaseStudyStage";

export const CaseStudiesSection: React.FC = () => {
  const { t, isSpanish } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);

  const caseStudies = isSpanish ? CASE_STUDIES_ES : CASE_STUDIES_EN;
  const activeStudy = caseStudies[activeTab] || caseStudies[0];

  return (
    <section
      id="case-studies"
      className="py-24 border-b border-border-subtle relative overflow-hidden bg-bg-base"
    >
      {/* ── Atmospheric Radial Spotlight & Architectural Watermark Grid ── */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[450px] bg-accent/12 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border-subtle)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-subtle)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black_30%,transparent_80%)] pointer-events-none opacity-40 dark:opacity-20" />

      <div className="mx-auto max-w-5xl px-6 relative z-10">
        <FadeIn>
          <SectionLabel
            index="05"
            eyebrow={t.caseStudies.eyebrow}
            heading={t.caseStudies.heading}
            description={t.caseStudies.description}
          />
        </FadeIn>

        {/* ── Interactive Tactile Button Selector ── */}
        <div
          className="flex flex-wrap items-center justify-start sm:justify-center gap-2 mb-8"
          role="tablist"
          aria-label="Case Studies Telemetry Selector"
        >
          {caseStudies.map((study, idx) => {
            const isActive = activeTab === idx;
            const Icon = study.icon;
            const indexStr = String(idx + 1).padStart(2, "0");

            return (
              <button
                key={study.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(idx)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-text-secondary hover:text-text-primary bg-bg-surface/60 border border-border-subtle hover:border-border-base"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-case-study-pill"
                    className="absolute inset-0 rounded-xl bg-accent shadow-xs"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 opacity-70">[{indexStr}]</span>
                <Icon size={13} className="relative z-10" />
                <span className="relative z-10 font-body font-medium">{study.tag}</span>
              </button>
            );
          })}
        </div>

        {/* ── Visual Antes vs Después Stage with Highlight Accent ── */}
        <div className="rounded-3xl border border-border-base/70 bg-bg-surface/85 dark:bg-bg-surface/60 p-6 sm:p-9 backdrop-blur-md shadow-2xl relative overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-accent/40 before:to-transparent">
          <AnimatePresence mode="wait">
            <CaseStudyStage
              key={`${isSpanish ? "es" : "en"}-${activeStudy.id}`}
              study={activeStudy}
              beforeLabel={t.caseStudies.beforeLabel}
              afterLabel={t.caseStudies.afterLabel}
              resultsLabel={t.caseStudies.resultsLabel}
            />
          </AnimatePresence>
        </div>

        {/* ── 100% SEO Crawlability: Semantic Invisible Pre-rendering ── */}
        <div className="sr-only" aria-hidden="true">
          {caseStudies.map((study) => (
            <article key={`seo-${study.id}`} itemScope itemType="https://schema.org/CreativeWork">
              <h3 itemProp="name">{study.title}</h3>
              <p itemProp="abstract">{study.challenge}</p>
              <ul>
                {study.frictions.map((friction, idx) => (
                  <li key={`friction-${idx}`}>{friction}</li>
                ))}
              </ul>
              <ul>
                {study.steps.map((step, idx) => (
                  <li key={`step-${idx}`}>{step}</li>
                ))}
              </ul>
              <span>{study.highlight}</span>
              <span>{study.tools.join(", ")}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
