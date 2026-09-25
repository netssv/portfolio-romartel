"use client";

import React from "react";
import { CaseStudy } from "@/src/data/i18n/caseStudies";

interface CaseStudyImpactPanelProps {
  study: CaseStudy;
  challengeLabel: string;
}

export const CaseStudyImpactPanel: React.FC<CaseStudyImpactPanelProps> = ({
  study,
  challengeLabel,
}) => {
  const primaryKpi = study.kpis[0];
  const secondaryKpis = study.kpis.slice(1);

  return (
    <div className="flex flex-col justify-between space-y-6">
      {/* Eyebrow & Title */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-accent font-semibold">
            {study.subtitle}
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-heading font-bold text-text-primary tracking-tight">
          {study.title}
        </h3>
      </div>

      {/* Monumental Hero KPI */}
      <div className="p-6 rounded-2xl bg-bg-raised/60 border border-border-subtle backdrop-blur-xs relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
          <span className="text-4xl sm:text-5xl lg:text-6xl font-mono font-black text-text-primary tracking-tight">
            {primaryKpi?.value || study.highlight}
          </span>
          <span className="text-sm font-body font-semibold text-accent uppercase tracking-wider">
            {study.highlight}
          </span>
        </div>
        <p className="text-xs font-body text-text-muted">
          {primaryKpi?.label}
        </p>
      </div>

      {/* Challenge Callout (The Context) */}
      <div className="border-l-2 border-accent/40 pl-4 py-1">
        <span className="text-[11px] font-mono uppercase tracking-widest text-text-muted block mb-1">
          {challengeLabel}
        </span>
        <p className="text-xs sm:text-sm font-body text-text-secondary leading-relaxed">
          {study.challenge}
        </p>
      </div>

      {/* Secondary Metrics */}
      {secondaryKpis.length > 0 && (
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border-subtle">
          {secondaryKpis.map((kpi, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-xl sm:text-2xl font-mono font-bold text-text-primary">
                {kpi.value}
              </span>
              <span className="text-xs font-body text-text-muted mt-0.5">
                {kpi.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
