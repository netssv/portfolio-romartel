"use client";

import React from "react";
import { CaseStudy } from "@/src/data/i18n/caseStudies";

interface CaseStudyPlaybookPanelProps {
  study: CaseStudy;
  playbookLabel: string;
  toolsLabel: string;
}

export const CaseStudyPlaybookPanel: React.FC<CaseStudyPlaybookPanelProps> = ({
  study,
  playbookLabel,
  toolsLabel,
}) => {
  return (
    <div className="flex flex-col justify-between space-y-6 lg:border-l lg:border-border-subtle lg:pl-10">
      <div>
        {/* Playbook Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[11px] font-mono uppercase tracking-widest text-text-muted font-medium">
            {playbookLabel}
          </span>
          <div className="flex-1 h-px bg-border-subtle" />
        </div>

        {/* Numbered Steps */}
        <div className="space-y-4">
          {study.steps.map((step, idx) => {
            const stepNum = String(idx + 1).padStart(2, "0");
            return (
              <div
                key={idx}
                className="group flex items-start gap-4 p-3.5 rounded-xl transition-colors duration-150 hover:bg-bg-raised/40"
              >
                <span className="font-mono text-xs font-bold text-accent px-2 py-0.5 rounded-md bg-accent/10 shrink-0 mt-0.5">
                  {stepNum}
                </span>
                <p className="text-xs sm:text-sm font-body text-text-secondary leading-relaxed group-hover:text-text-primary transition-colors">
                  {step}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Applied Tools */}
      <div className="pt-6 border-t border-border-subtle">
        <span className="text-[11px] font-mono uppercase tracking-widest text-text-muted block mb-3">
          {toolsLabel}
        </span>
        <div className="flex flex-wrap gap-2">
          {study.tools.map((tool) => (
            <span
              key={tool}
              className="px-3 py-1.5 rounded-lg text-xs font-mono text-text-secondary bg-bg-surface border border-border-subtle hover:border-accent/40 transition-colors"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
