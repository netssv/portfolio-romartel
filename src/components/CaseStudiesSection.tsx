"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { SectionLabel } from "@/src/components/ui/SectionLabel";
import { CheckCircle2, Target } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";
import { CASE_STUDIES_EN, CASE_STUDIES_ES } from "@/src/data/i18n/caseStudies";

export const CaseStudiesSection: React.FC = () => {
  const { t, isSpanish } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);

  const caseStudies = isSpanish ? CASE_STUDIES_ES : CASE_STUDIES_EN;
  const cs = caseStudies[activeTab] || caseStudies[0];
  const ActiveIcon = cs.icon;

  return (
    <section id="case-studies" className="py-24 border-b border-border-subtle relative overflow-hidden bg-bg-base">
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <FadeIn>
          <SectionLabel
            eyebrow={t.caseStudies.eyebrow}
            heading={t.caseStudies.heading}
            description={t.caseStudies.description}
          />
        </FadeIn>

        {/* Tab Selector */}
        <div className="flex flex-wrap justify-start md:justify-center mb-10 gap-2" role="tablist" aria-label="Case Studies">
          {caseStudies.map((study, idx) => {
            const isActive = activeTab === idx;
            const Icon = study.icon;
            return (
              <button
                key={study.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-body font-medium transition-all duration-150 border cursor-pointer ${
                  isActive
                    ? "border-accent bg-accent text-white font-semibold shadow-xs"
                    : "border-border-subtle bg-bg-surface text-text-secondary hover:text-text-primary hover:border-border-base"
                }`}
              >
                <Icon size={13} />
                <span>{study.tag}</span>
              </button>
            );
          })}
        </div>

        {/* Bento Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${isSpanish ? "es" : "en"}-${activeTab}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch"
          >
            {/* Main Details Card */}
            <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-border-base bg-bg-surface shadow-sm">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-body font-semibold bg-accent/10 text-accent">
                    <ActiveIcon size={13} />
                    {cs.tag}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-body font-semibold bg-signal-success/10 text-emerald-text">
                    {cs.highlight}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-heading font-bold text-text-primary mb-1">
                  {cs.title}
                </h3>
                <p className="text-xs font-body text-accent mb-4 font-medium">{cs.subtitle}</p>

                <div className="p-4 rounded-xl bg-bg-raised/70 border border-border-subtle mb-4">
                  <span className="text-xs font-body font-bold uppercase text-accent tracking-wider block mb-1">
                    {isSpanish ? "Desafío" : "Challenge"}
                  </span>
                  <p className="text-xs font-body text-text-secondary leading-relaxed">{cs.challenge}</p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-body font-bold uppercase text-text-muted tracking-wider block mb-2">
                    {isSpanish ? "Pasos de Ejecución" : "Execution Steps"}
                  </span>
                  {cs.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs font-body text-text-secondary leading-relaxed">
                      <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div className="flex flex-wrap gap-1.5 pt-4 mt-5 border-t border-border-subtle">
                {cs.tools.map((tool) => (
                  <span key={tool} className="px-2.5 py-1 rounded-lg text-xs font-body bg-bg-raised border border-border-subtle text-text-secondary">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* KPI Cards Column */}
            <div className="lg:col-span-5 flex flex-col gap-3.5">
              {cs.kpis.map((kpi, idx) => (
                <div key={idx} className="flex-1 p-5 rounded-2xl border border-border-base bg-bg-surface flex flex-col justify-center shadow-sm">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <Target size={16} className="text-accent" />
                    <span className="text-2xl sm:text-3xl font-mono font-bold text-text-primary tracking-tight">{kpi.value}</span>
                  </div>
                  <span className="text-xs font-body text-text-secondary font-medium">{kpi.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
