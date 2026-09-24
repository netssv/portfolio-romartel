"use client";

import React from "react";
import { Award, ArrowUpRight, BarChart3, Database, ShieldCheck } from "lucide-react";
import { ScatterTitle } from "./ui/ScatterTitle";
import { useLanguage } from "@/src/context/LanguageContext";

interface CredentialCard {
  id: string;
  issuer: string;
  name: string;
  skills: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accentColor: string;
}

const FEATURED_CREDENTIALS: CredentialCard[] = [
  {
    id: "google-analytics",
    issuer: "Google Career Certificates",
    name: "Google Data Analytics Professional Certificate",
    skills: "SQL • R Studio • Data Wrangling • Tableau • Statistical Rigor",
    icon: Database,
    accentColor: "text-accent",
  },
  {
    id: "microsoft-powerbi",
    issuer: "Microsoft Certified",
    name: "Power BI Data Analyst Associate",
    skills: "DAX Modeling • Power Query • Enterprise BI Pipelines • Executive Dashboards",
    icon: BarChart3,
    accentColor: "text-accent",
  },
  {
    id: "hubspot-inbound",
    issuer: "HubSpot Academy",
    name: "HubSpot Inbound Marketing & Automation",
    skills: "Lead Nurturing • CRM Workflows • Full-Funnel Inbound • Email Automation",
    icon: Award,
    accentColor: "text-accent",
  },
  {
    id: "scrum-product-owner",
    issuer: "CertiProf International",
    name: "Scrum Product Owner Professional (SPOP)",
    skills: "Agile Leadership • Sprint Planning • Backlog Architecture • Systems Delivery",
    icon: ShieldCheck,
    accentColor: "text-accent",
  },
];

export function CertificationsSection() {
  const { t, isSpanish, data } = useLanguage();
  const archiveUrl = data.credentials?.archiveUrl || "https://1drv.ms/f/c/c9136ada8a51a610/IgAQplGK2moTIIDJJKsAAAAAAd9ni2_70w9-q00a4Majbqk?e=AdFVPs";

  return (
    <section id="certifications" className="py-24 sm:py-32 relative overflow-hidden bg-bg-surface border-t border-b border-border-subtle">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col items-center">
        {/* Index Eyebrow Tag */}
        <div className="flex items-center gap-2 mb-6">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-accent/10 border border-accent/20 text-xs font-mono font-bold text-accent tracking-tighter shadow-xs">
            [04]
          </span>
          <span className="text-xs font-mono tracking-widest uppercase font-semibold text-text-muted">
            {t.certifications?.eyebrow || "Verified Credentials"}
          </span>
        </div>

        {/* Scattered Bokeh Blur Big Headline */}
        <div className="w-full max-w-4xl mb-8 flex justify-center">
          <ScatterTitle
            text={isSpanish ? "Certificaciones & Credenciales" : "Certifications & Credentials"}
          />
        </div>

        {/* Narrative Subtitle matching reference */}
        <p className="text-sm sm:text-base font-body text-text-secondary leading-relaxed max-w-2xl text-center mb-14">
          {t.certifications?.subtitle ||
            "Google Data Analytics & Microsoft Power BI Certified with 103 audited technical credentials. Continuous learning applied directly to production pipelines, predictive ML, and high-reliability systems."}
        </p>

        {/* 4 Featured Credential Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full max-w-4xl mb-12">
          {FEATURED_CREDENTIALS.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={archiveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-6 rounded-2xl bg-bg-base border border-border-base hover:border-accent hover:bg-bg-surface transition-all duration-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase font-semibold bg-bg-surface border border-border-subtle text-text-muted group-hover:border-accent group-hover:text-accent transition-colors">
                      <Icon size={12} className={item.accentColor} />
                      {item.issuer}
                    </span>
                    <ArrowUpRight size={14} className="text-text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h3 className="font-heading font-semibold text-base text-text-primary group-hover:text-accent transition-colors mb-2">
                    {item.name}
                  </h3>
                </div>
                <p className="font-mono text-[11px] text-text-muted tracking-tight border-t border-border-subtle/70 pt-3 mt-2">
                  {item.skills}
                </p>
              </a>
            );
          })}
        </div>

        {/* Global Archive CTA Button */}
        <a
          href={archiveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white text-xs font-body font-semibold hover:bg-accent-hover transition-colors shadow-sm group"
        >
          <Award size={14} className="shrink-0" />
          <span>{t.certifications?.archiveBtn || "Explore All 103 Credentials in Verified Archive"}</span>
          <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </section>
  );
}
