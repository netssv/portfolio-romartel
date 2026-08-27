"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { SectionLabel } from "@/src/components/ui/SectionLabel";
import { Search, TrendingUp, BarChart3, CheckCircle2, Zap, Target, LucideIcon } from "lucide-react";

interface CaseStudy {
  id: string;
  tag: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  highlight: string;
  challenge: string;
  kpis: { value: string; label: string }[];
  steps: string[];
  tools: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "01",
    tag: "SEO Restructure",
    icon: Search,
    title: "Organic Search & Technical Indexing",
    subtitle: "E-commerce · Latin American Market",
    highlight: "+40% Crawl Efficiency",
    challenge: "High reliance on paid search with zero organic visibility across 40+ category lines.",
    kpis: [
      { value: "40+", label: "Pages Restructured" },
      { value: "100%", label: "Crawl Issues Resolved" },
      { value: "3x", label: "Intent Keyword Clusters" },
    ],
    steps: [
      "Audited search intent across informational and transactional queries.",
      "Fixed duplicate meta tags, canonicals, and broken internal links.",
      "Delivered structured schema templates for ongoing editorial teams.",
    ],
    tools: ["Google Search Console", "Screaming Frog", "GA4"],
  },
  {
    id: "02",
    tag: "CRO & Performance",
    icon: TrendingUp,
    title: "Landing Page Architecture & CRO",
    subtitle: "B2B SaaS · Paid Acquisition Funnel",
    highlight: "+18% Form Conversion Lift",
    challenge: "High ad traffic bounce rate due to generic homepage routing without intent match.",
    kpis: [
      { value: "+18%", label: "Conversion Lift" },
      { value: "5", label: "GA4 Custom Telemetry Events" },
      { value: "3x", label: "Asset Speed Optimizations" },
    ],
    steps: [
      "Built dedicated modular landing page with above-the-fold CTA.",
      "Configured GA4 scroll depth and form interaction telemetry.",
      "A/B tested outcome-led value propositions against feature lists.",
    ],
    tools: ["GA4", "Google Tag Manager", "Microsoft Clarity"],
  },
  {
    id: "03",
    tag: "Content Strategy",
    icon: BarChart3,
    title: "Multi-Platform Content Automation",
    subtitle: "Professional Services · Brand Scaling",
    highlight: "90+ Content Assets Produced",
    challenge: "Fragmented social scheduling and lack of structured editorial pipelines.",
    kpis: [
      { value: "90+", label: "Assets Published" },
      { value: "3", label: "Core Content Pillars" },
      { value: "90d", label: "Sustained Execution" },
    ],
    steps: [
      "Audited engagement metrics and established 3 core content pillars.",
      "Created structured 90-day calendar and automated AI research workflows.",
      "Implemented monthly stakeholder reporting dashboard.",
    ],
    tools: ["LinkedIn Analytics", "Claude CLI", "Notion"],
  },
];

export const CaseStudiesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const cs = CASE_STUDIES[activeTab];
  const ActiveIcon = cs.icon;

  return (
    <section id="case-studies" className="py-24 border-b border-border-subtle relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <FadeIn>
          <SectionLabel
            index="03"
            eyebrow="Case Studies"
            heading="Real-World Impact"
            description="Proven business outcomes across technical SEO restructuring, conversion optimization, and automated content operations."
          />
        </FadeIn>

        {/* Tab Selector with Icons */}
        <div className="flex flex-wrap justify-start md:justify-center mb-10 gap-2.5" role="tablist" aria-label="Case Studies">
          {CASE_STUDIES.map((study, idx) => {
            const isActive = activeTab === idx;
            const Icon = study.icon;
            return (
              <button
                key={study.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-200 border cursor-pointer ${
                  isActive
                    ? "border-accent bg-accent text-black font-bold shadow-md shadow-accent/20"
                    : "border-border-base bg-bg-surface text-text-muted hover:text-text-primary hover:border-border-subtle"
                }`}
              >
                <Icon size={14} />
                <span>{study.id} · {study.tag}</span>
              </button>
            );
          })}
        </div>

        {/* Bento Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
          >
            {/* Main Bento Hero Card */}
            <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-3xl border border-border-base bg-bg-surface shadow-lg">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-accent/10 border border-accent/20 text-accent">
                    <ActiveIcon size={13} />
                    {cs.tag}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                    {cs.highlight}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-heading font-bold text-text-primary mb-1">
                  {cs.title}
                </h3>
                <p className="text-xs font-mono text-text-muted mb-5">{cs.subtitle}</p>

                <div className="p-4 rounded-xl bg-bg-base/60 border border-border-subtle mb-6">
                  <span className="text-[11px] font-mono font-bold uppercase text-accent tracking-wider block mb-1">Challenge</span>
                  <p className="text-xs font-body text-text-secondary leading-relaxed">{cs.challenge}</p>
                </div>

                <div className="space-y-2.5">
                  <span className="text-[11px] font-mono font-bold uppercase text-text-muted tracking-wider block mb-2">Key Execution Steps</span>
                  {cs.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs font-body text-text-secondary">
                      <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools tags */}
              <div className="flex flex-wrap gap-1.5 pt-6 mt-6 border-t border-border-subtle">
                {cs.tools.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-bg-raised border border-border-subtle text-text-secondary">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* KPI Cards Column */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {cs.kpis.map((kpi, idx) => (
                <div key={idx} className="flex-1 p-6 rounded-2xl border border-border-base bg-bg-surface flex flex-col justify-center shadow-sm hover:border-accent transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <Target size={16} className="text-accent" />
                    <span className="text-3xl sm:text-4xl font-mono font-bold text-text-primary tracking-tight">{kpi.value}</span>
                  </div>
                  <span className="text-xs font-mono text-text-secondary uppercase tracking-wider">{kpi.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

