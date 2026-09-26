"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { CaseStudy } from "@/src/data/i18n/caseStudies";

interface CaseStudyStageProps {
  study: CaseStudy;
  beforeLabel: string;
  afterLabel: string;
  resultsLabel: string;
}

export const CaseStudyStage: React.FC<CaseStudyStageProps> = ({
  study,
  beforeLabel,
  afterLabel,
}) => {
  const primaryKpi = study.kpis[0];
  const secondaryKpis = study.kpis.slice(1);

  return (
    <motion.article
      key={study.id}
      itemScope
      itemType="https://schema.org/CreativeWork"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex flex-col space-y-6"
    >
      {/* ── Case Header: Domain Eyebrow & Title ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-accent font-semibold block mb-1.5">
            {study.subtitle}
          </span>
          <h3
            itemProp="name"
            className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-text-primary tracking-tight"
          >
            {study.title}
          </h3>
        </div>
      </div>

      {/* ── Monumental Metric Impact Banner (Visual "Wake Up" Anchor) ── */}
      <div className="rounded-2xl bg-gradient-to-r from-accent/15 via-accent/[0.07] to-bg-raised/50 border border-accent/25 p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
        {/* Subtle Ambient Light Ray */}
        <div className="absolute top-0 right-0 w-72 h-full bg-radial from-accent/15 to-transparent pointer-events-none blur-2xl" />

        {/* Primary Hero Metric */}
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-4 relative z-10">
          <span className="text-4xl sm:text-5xl font-mono font-black text-text-primary tracking-tight">
            {primaryKpi?.value}
          </span>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-heading font-bold uppercase tracking-wider text-accent">
              {primaryKpi?.label}
            </span>
            <span className="text-xs text-text-muted mt-0.5 font-medium">
              {study.highlight}
            </span>
          </div>
        </div>

        {/* Supporting Telemetry & Tools */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-border-subtle lg:pl-6 relative z-10">
          {secondaryKpis.map((kpi, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="font-mono text-base sm:text-lg font-bold text-text-primary tracking-tight">
                {kpi.value}
              </span>
              <span className="text-[11px] font-mono text-text-muted">{kpi.label}</span>
            </div>
          ))}

          <div className="flex flex-wrap items-center gap-1.5 pl-2 sm:pl-4 border-l border-border-subtle">
            {study.tools.map((tool) => (
              <span
                key={tool}
                className="px-2 py-0.5 rounded text-[11px] font-mono text-text-secondary bg-bg-surface/80 border border-border-subtle"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Symmetrical Transformation Grid: ANTES vs DESPUÉS ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch relative">
        {/* Central Directional Transformation Indicator (Desktop) */}
        <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-bg-surface border border-border-base items-center justify-center text-accent shadow-sm z-10">
          <ArrowRight size={14} />
        </div>

        {/* Antes: El Cuello de Botella */}
        <div className="p-5 sm:p-6 rounded-xl bg-bg-raised/40 border border-border-subtle flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2.5 text-red-600/90 dark:text-red-400 font-mono text-[11px] uppercase tracking-wider font-semibold">
              <AlertCircle size={14} className="shrink-0" />
              <span>{beforeLabel}</span>
            </div>
            <p
              itemProp="abstract"
              className="text-xs sm:text-sm font-body text-text-secondary leading-relaxed mb-4"
            >
              {study.challenge}
            </p>
          </div>

          <div className="space-y-2.5 pt-3 border-t border-border-subtle">
            {study.frictions.map((friction, idx) => {
              const parts = friction.split(": ");
              const lead = parts[0];
              const rest = parts.slice(1).join(": ");
              return (
                <div key={idx} className="flex items-start gap-2.5 text-xs font-body text-text-muted">
                  <span className="font-mono text-[10px] font-bold text-red-600/80 dark:text-red-400/80 px-1.5 py-0.5 rounded bg-red-500/10 border border-red-500/20 shrink-0 mt-0.5">
                    0{idx + 1}
                  </span>
                  <span className="leading-snug">
                    <strong className="text-text-primary font-semibold">{lead}:</strong> {rest}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Después: La Solución Implementada */}
        <div className="p-5 sm:p-6 rounded-xl bg-accent/[0.04] border border-accent/25 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2.5 text-accent font-mono text-[11px] uppercase tracking-wider font-semibold">
              <CheckCircle2 size={14} className="shrink-0" />
              <span>{afterLabel}</span>
            </div>
            <p className="text-xs sm:text-sm font-body text-text-primary font-medium leading-relaxed mb-4">
              {study.solution}
            </p>
          </div>

          <div className="space-y-2.5 pt-3 border-t border-accent/20">
            {study.steps.map((step, idx) => {
              const parts = step.split(": ");
              const lead = parts[0];
              const rest = parts.slice(1).join(": ");
              return (
                <div key={idx} className="flex items-start gap-2.5 text-xs font-body text-text-secondary">
                  <span className="font-mono text-[10px] font-bold text-accent px-1.5 py-0.5 rounded bg-accent/10 border border-accent/20 shrink-0 mt-0.5">
                    0{idx + 1}
                  </span>
                  <span className="leading-snug">
                    <strong className="text-text-primary font-semibold">{lead}:</strong> {rest}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.article>
  );
};
