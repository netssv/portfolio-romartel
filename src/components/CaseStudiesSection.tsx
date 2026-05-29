"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { SectionLabel } from "@/src/components/ui/SectionLabel";
import { Check } from "lucide-react";

const CASE_STUDIES = [
  {
    id: "01",
    tag: "SEO",
    title: "Organic growth via SEO restructure",
    subtitle: "E-commerce · Latin American market",
    context: "A regional e-commerce client was generating traffic primarily through paid ads, with minimal organic presence. They had no defined keyword strategy and most product pages lacked basic on-page optimization. The goal was to reduce dependency on paid acquisition and build a sustainable organic channel.",
    actions: [
      "Conducted full keyword research audit segmented by search intent: informational, navigational, and transactional",
      "Restructured meta titles, H1s, and internal linking architecture across 40+ product and category pages",
      "Identified and resolved crawlability issues: duplicate content, missing canonical tags, and broken internal links",
      "Delivered a content brief template aligned to top-priority keyword clusters for ongoing execution",
    ],
    timeframe: "90 days post-implementation",
    metrics: [
      { target: 64, prefix: "+", suffix: "%", label: "Organic impressions" },
      { target: 38, prefix: "+", suffix: "%", label: "Organic sessions" },
      { target: 11, prefix: "", suffix: "", label: "New top-10 keywords" },
      { target: 22, prefix: "−", suffix: "%", label: "Paid traffic dependency" },
    ],
    tools: ["Google Search Console", "Ahrefs (free tier)", "Screaming Frog", "Google Analytics 4"],
  },
  {
    id: "02",
    tag: "CRO",
    title: "Landing page build & conversion optimization",
    subtitle: "B2B SaaS · Lead generation campaign",
    context: "A software client was running Google Ads campaigns driving traffic to their homepage. Without a dedicated landing page, paid traffic was dropping off without converting.",
    actions: [
      "Mapped the user journey from ad click to form submission and identified friction points",
      "Built a dedicated landing page with above-the-fold CTA, social proof section, and benefit-focused copy",
      "Set up GA4 event tracking for scroll depth, CTA clicks, and form completions",
      "Ran a two-variant test on headline copy: outcome variant won by 18%",
      "Optimized page load time by compressing assets and deferring non-critical scripts",
    ],
    timeframe: "60 days post-launch",
    metrics: [
      { target: 3.1, prefix: "", suffix: "%", label: "Conversion rate (from 0.7%)", decimals: 1 },
      { target: 55, prefix: "−", suffix: "%", label: "Bounce rate vs homepage" },
      { target: 18, prefix: "+", suffix: "%", label: "CVR lift from A/B test" },
      { target: 41, prefix: "−", suffix: "%", label: "Cost per lead (CPA)" },
    ],
    tools: ["WordPress + Elementor", "GA4 + GTM", "Google Ads", "Hotjar (heatmaps)"],
  },
  {
    id: "03",
    tag: "Content",
    title: "Content strategy & multi-platform execution",
    subtitle: "Professional services · Brand awareness",
    context: "A professional services firm had an inconsistent social media presence with no defined content calendar, mixed messaging, and low engagement.",
    actions: [
      "Audited 6 months of existing content to identify high and low performing formats",
      "Defined 3 content pillars: educational, trust-building, and social proof",
      "Built a 90-day editorial calendar with post formats, copy briefs, and hashtag strategy",
      "Produced and scheduled weekly content batches; introduced AI tools to accelerate copy drafting",
      "Delivered a monthly performance report template for internal visibility",
    ],
    timeframe: "90 days",
    metrics: [
      { target: 112, prefix: "+", suffix: "%", label: "LinkedIn impressions" },
      { target: 47, prefix: "+", suffix: "%", label: "Engagement rate" },
      { target: 290, prefix: "+", suffix: "", label: "New LinkedIn followers" },
      { target: 3, prefix: "", suffix: "x", label: "Content output multiplier" },
    ],
    tools: ["Meta Business Suite", "LinkedIn Analytics", "Notion", "Claude / ChatGPT", "Canva"],
  },
];

const MetricCounter: React.FC<{
  target: number;
  prefix: string;
  suffix: string;
  label: string;
  decimals?: number;
}> = ({ target, prefix, suffix, label, decimals = 0 }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuad = (t: number) => t * (2 - t);
      const currentVal = easeOutQuad(progress) * target;
      setValue(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setValue(target);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [target]);

  return (
    <div className="p-4 rounded-xl border border-border-subtle bg-bg-surface/50 backdrop-blur-xs flex flex-col justify-center min-h-[96px] relative overflow-hidden transition-all duration-300 hover:border-accent/40 group">
      <div className="absolute inset-0 bg-accent/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="text-2xl sm:text-3xl font-mono font-bold text-accent tracking-tight">
        {prefix}
        {value.toFixed(decimals)}
        {suffix}
      </span>
      <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted mt-1 leading-snug">
        {label}
      </span>
    </div>
  );
};

export const CaseStudiesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const cs = CASE_STUDIES[activeTab];

  return (
    <section id="case-studies" className="py-24 border-b border-border-subtle relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <FadeIn>
          <SectionLabel
            eyebrow="Case Studies"
            heading="Real-World Impact"
            description="Deep dives into SEO restructuring, conversion optimization, and brand content strategies with tangible business metrics."
          />
        </FadeIn>

        {/* Tab Selector */}
        <div className="flex justify-start md:justify-center mb-10 overflow-x-auto pb-2 scrollbar-none gap-2">
          {CASE_STUDIES.map((study, idx) => (
            <button
              key={study.id}
              onClick={() => setActiveTab(idx)}
              className={`relative px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 border focus:outline-hidden ${
                activeTab === idx
                  ? "border-accent text-bg-base bg-accent z-10"
                  : "border-border-subtle text-text-muted hover:text-text-primary hover:border-border-base bg-bg-surface/30"
              }`}
            >
              {study.id} · {study.tag}
            </button>
          ))}
        </div>

        {/* Case Study Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left Column: Context & What I Did */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/4 text-[10px] font-mono font-bold tracking-wider text-accent uppercase mb-3">
                  Case Study {cs.id}
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-text-primary leading-tight tracking-tight">
                  {cs.title}
                </h3>
                <p className="text-xs font-mono text-text-muted mt-1 uppercase tracking-wider">
                  {cs.subtitle}
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl border border-border-subtle bg-bg-surface/30 backdrop-blur-xs">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-text-primary mb-3">
                  Context &amp; Challenge
                </h4>
                <p className="text-sm font-body text-text-secondary leading-relaxed">
                  {cs.context}
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl border border-border-subtle bg-bg-surface/30 backdrop-blur-xs">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-text-primary mb-4">
                  What I Did
                </h4>
                <ul className="flex flex-col gap-3.5">
                  {cs.actions.map((action, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 + 0.1, duration: 0.3 }}
                      className="flex items-start gap-3 text-xs sm:text-sm font-body text-text-secondary leading-relaxed"
                    >
                      <div className="mt-0.5 w-4 h-4 sm:w-5 sm:h-5 rounded-md border border-accent/20 bg-accent/5 flex items-center justify-center flex-shrink-0 text-accent">
                        <Check size={11} className="stroke-[3]" />
                      </div>
                      <span>{action}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Metrics & Stack */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Metrics Card */}
              <div className="p-5 sm:p-6 rounded-2xl border border-border-subtle bg-bg-surface/30 backdrop-blur-xs relative overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-text-primary">
                    Performance Metrics
                  </h4>
                  <span className="text-[10px] font-mono text-text-muted px-2 py-0.5 rounded-sm bg-bg-raised">
                    {cs.timeframe}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {cs.metrics.map((m, i) => (
                    <MetricCounter key={i} {...m} />
                  ))}
                </div>
              </div>

              {/* Tools Card */}
              <div className="p-5 sm:p-6 rounded-2xl border border-border-subtle bg-bg-surface/30 backdrop-blur-xs">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-text-primary mb-3.5">
                  Tools &amp; Infrastructure
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cs.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1.5 rounded-lg border border-border-subtle bg-bg-surface text-xs font-mono font-bold text-text-secondary transition-colors duration-200 hover:border-accent hover:text-accent"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
