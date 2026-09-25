"use client";

import React from "react";
import { ScatterTitle } from "./ui/ScatterTitle";
import { useLanguage } from "@/src/context/LanguageContext";

const ACCREDITED_PARTNERS = [
  { name: "Google", roleEn: "Data Analytics Certified", roleEs: "Data Analytics Certified" },
  { name: "Microsoft", roleEn: "Power BI Data Analyst", roleEs: "Power BI Data Analyst" },
  { name: "HubSpot", roleEn: "Inbound & CRM Automation", roleEs: "Inbound & CRM Automation" },
  { name: "CertiProf", roleEn: "Scrum Product Owner", roleEs: "Scrum Product Owner" },
  { name: "Python Institute", roleEn: "Automation & Scripting", roleEs: "Automatización & Scripting" },
];

export function CertificationsSection() {
  const { t, isSpanish, data } = useLanguage();
  const archiveUrl =
    data.credentials?.archiveUrl ||
    "https://onedrive.live.com/?id=%2Fpersonal%2Fc9136ada8a51a610%2FDocuments%2FDocumentos%2FRO%2FCurriculums%2Fcertificates&listurl=%2Fpersonal%2Fc9136ada8a51a610%2FDocuments&ithint=folder&e=AdFVPs&migratedtospo=true&redeem=aHR0cHM6Ly8xZHJ2Lm1zL2YvYy9jOTEzNmFkYThhNTFhNjEwL0lnQVFwbEdLMm1vVElJREpKS3NBQUFBQUFkOW5pMl83MHc5LXEwMGE0TWFqYnFrP2U9QWRGVlBz&ga=1";

  const titleLines = [
    t.certifications?.titleLine1 || (isSpanish ? "Certificaciones" : "Certifications"),
    t.certifications?.titleLine2 || (isSpanish ? "& Credenciales" : "& Credentials"),
  ];

  return (
    <section
      id="certifications"
      className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-center items-center py-20 sm:py-28 bg-bg-surface border-t border-b border-border-subtle overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 w-full flex flex-col items-center justify-center">
        {/* Index Eyebrow Tag */}
        <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-accent/10 border border-accent/20 text-xs font-mono font-bold text-accent tracking-tighter shadow-xs">
            [04]
          </span>
          <span className="text-xs font-mono tracking-widest uppercase font-semibold text-text-muted">
            {t.certifications?.eyebrow || (isSpanish ? "Credenciales & Stack" : "Credentials & Stack")}
          </span>
        </div>

        {/* Monumental Interactive Title (H1) */}
        <div className="w-full max-w-5xl mb-6 sm:mb-8 flex justify-center">
          <ScatterTitle as="h1" lines={titleLines} />
        </div>

        {/* Narrative Subtitle */}
        <p className="text-sm sm:text-base md:text-lg font-body text-text-secondary leading-relaxed max-w-2xl text-center mb-12 sm:mb-16 px-4">
          {t.certifications?.subtitle ||
            (isSpanish
              ? "Estrategia comercial y automatización respaldadas por certificaciones técnicas en analítica, BI y sistemas web."
              : "Commercial strategy and workflow automation backed by accredited certifications across analytics, BI, and web systems.")}
        </p>

        {/* Accredited Organizations & Keywords Row */}
        <div className="w-full max-w-4xl pt-8 pb-10 border-t border-border-subtle/80 flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16">
          {ACCREDITED_PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="flex flex-col items-center sm:items-start text-center sm:text-left transition-transform duration-200 hover:-translate-y-0.5"
            >
              <span className="font-heading font-black text-lg sm:text-xl tracking-tight text-text-primary">
                {partner.name}
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] tracking-wider uppercase text-text-muted mt-0.5">
                {isSpanish ? partner.roleEs : partner.roleEn}
              </span>
            </div>
          ))}
        </div>

        {/* Access All Credentials CTA (Strictly No Emojis, No Icons) */}
        <div className="pt-4 flex justify-center">
          <a
            href={archiveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-text-primary text-bg-base hover:bg-accent hover:text-white transition-all duration-300 text-xs font-mono uppercase tracking-widest font-bold shadow-sm hover:shadow-md"
          >
            {t.certifications?.archiveBtn ||
              (isSpanish ? "Acceder a todas las credenciales" : "View All Verified Credentials")}
          </a>
        </div>
      </div>
    </section>
  );
}
