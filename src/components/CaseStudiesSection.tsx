"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { SectionLabel } from "@/src/components/ui/SectionLabel";
import { useLanguage } from "@/src/context/LanguageContext";
import { CASE_STUDIES_EN, CASE_STUDIES_ES } from "@/src/data/i18n/caseStudies";
import { CaseStudyTabs } from "./case-studies/CaseStudyTabs";
import { CaseStudyImpactPanel } from "./case-studies/CaseStudyImpactPanel";
import { CaseStudyPlaybookPanel } from "./case-studies/CaseStudyPlaybookPanel";

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
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <FadeIn>
          <SectionLabel
            index="05"
            eyebrow={t.caseStudies.eyebrow}
            heading={t.caseStudies.heading}
            description={t.caseStudies.description}
          />
        </FadeIn>

        {/* Minimalist Tabs */}
        <CaseStudyTabs
          items={caseStudies}
          activeIndex={activeTab}
          onSelect={setActiveTab}
        />

        {/* Minimalist Split Stage */}
        <div className="rounded-3xl border border-border-subtle bg-bg-surface/50 p-6 sm:p-10 shadow-xs backdrop-blur-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${isSpanish ? "es" : "en"}-${activeStudy.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch"
            >
              {/* Left Column: Hero KPI & Commercial Impact */}
              <CaseStudyImpactPanel
                study={activeStudy}
                challengeLabel={t.caseStudies.challengeLabel}
              />

              {/* Right Column: 3-Step Playbook & Applied Toolkit */}
              <CaseStudyPlaybookPanel
                study={activeStudy}
                playbookLabel={t.caseStudies.playbookLabel}
                toolsLabel={t.caseStudies.toolsLabel}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
