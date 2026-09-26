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
                    : "text-text-secondary hover:text-text-primary bg-bg-surface/50 border border-border-subtle hover:border-border-base"
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

        {/* ── Visual Antes vs Después Stage ── */}
        <div className="rounded-2xl border border-border-subtle bg-bg-surface/50 p-6 sm:p-8 backdrop-blur-xs relative overflow-hidden">
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
                {study.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
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

