"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";
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
  resultsLabel,
}) => {
  const primaryKpi = study.kpis[0];
  const secondaryKpis = study.kpis.slice(1);

  return (
    <motion.article
      key={study.id}
      itemScope
      itemType="https://schema.org/CreativeWork"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex flex-col space-y-6"
    >
      {/* ── Case Header: Domain & Title ── */}
      <div>
        <span className="text-[11px] font-mono uppercase tracking-widest text-accent font-semibold block mb-1">
          {study.subtitle}
        </span>
        <h3
          itemProp="name"
          className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-text-primary tracking-tight"
        >
          {study.title}
        </h3>
      </div>

      {/* ── Side-by-Side: ANTES vs DESPUÉS ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Antes: El Problema */}
        <div className="p-4 sm:p-5 rounded-xl bg-bg-raised/50 border border-border-subtle flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-2 mb-2 text-amber-500/90 font-mono text-[11px] uppercase tracking-wider font-semibold">
              <AlertCircle size={14} className="shrink-0" />
              <span>{beforeLabel}</span>
            </div>
            <p
              itemProp="abstract"
              className="text-xs sm:text-sm font-body text-text-secondary leading-relaxed"
            >
              {study.challenge}
            </p>
          </div>
          <div className="text-[10px] font-mono text-text-muted pt-2 border-t border-border-subtle/50">
            Fricción operativa o cuello de botella resuelto
          </div>
        </div>

        {/* Después: La Solución Implementada */}
        <div className="p-4 sm:p-5 rounded-xl bg-accent/5 border border-accent/20 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-2 mb-2 text-accent font-mono text-[11px] uppercase tracking-wider font-semibold">
              <CheckCircle2 size={14} className="shrink-0" />
              <span>{afterLabel}</span>
            </div>
            <p className="text-xs sm:text-sm font-body text-text-primary font-medium leading-relaxed mb-3">
              {study.solution}
            </p>
            <div className="space-y-1.5 pt-1 border-t border-border-subtle/40">
              {study.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs font-body text-text-secondary">
                  <span className="font-mono text-[10px] font-bold text-accent px-1.5 py-0.2 rounded bg-accent/10 shrink-0 mt-0.5">
                    0{idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Resultado Clave & Herramientas Aplicadas ── */}
      <div className="p-4 sm:p-5 rounded-xl bg-bg-raised/80 border border-border-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Metric Anchor */}
        <div className="flex items-center gap-4">
          <div className="flex items-baseline gap-2.5">
            <span className="text-3xl sm:text-4xl font-mono font-black text-text-primary tracking-tight">
              {primaryKpi?.value}
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent px-2 py-0.5 rounded-md bg-accent/10 border border-accent/20">
              {study.highlight}
            </span>
          </div>

          {secondaryKpis.length > 0 && (
            <div className="hidden lg:flex items-center gap-3 pl-4 border-l border-border-subtle text-xs font-mono text-text-muted">
              {secondaryKpis.map((kpi, idx) => (
                <span key={idx} className="flex items-center gap-1.5">
                  <strong className="font-bold text-text-primary">{kpi.value}</strong>
                  <span>{kpi.label}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Tools Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          {study.tools.map((tool) => (
            <span
              key={tool}
              className="px-2.5 py-0.5 rounded-md text-[11px] font-mono text-text-muted bg-bg-surface border border-border-subtle hover:border-accent/30 transition-colors"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};
