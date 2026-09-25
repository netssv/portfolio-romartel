"use client";

import React, { useState } from "react";
import { Calendar, ArrowUpRight, MessageSquare, Check, Copy, Mail } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";

interface SocialLink {
  name: string;
  url: string;
  display: string;
}

interface ContactActionLinksProps {
  email: string;
  whatsappUrl?: string;
  social: SocialLink[];
}

// Inline SVG for GitHub to comply with Rule 2 (never import Github from lucide-react)
const GithubIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 14,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const ContactActionLinks: React.FC<ContactActionLinksProps> = ({
  email,
  whatsappUrl = "https://api.whatsapp.com/send/?phone=50378748247",
  social,
}) => {
  const { t, isSpanish } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenSchedule = () => {
    window.dispatchEvent(new CustomEvent("open-clippo-schedule"));
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-12 w-full max-w-2xl mx-auto">
      {/* High-Intent Direct Action Pairing (Rule 9) */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white font-body text-xs font-semibold hover:opacity-95 transition-all shadow-sm group"
        >
          <MessageSquare size={13} className="shrink-0" />
          <span>{t.contact.whatsappBtn}</span>
          <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>

        <button
          type="button"
          onClick={handleOpenSchedule}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border-base bg-bg-surface hover:bg-bg-raised text-text-primary font-body text-xs font-semibold transition-all shadow-xs group cursor-pointer"
        >
          <Calendar size={13} className="shrink-0 text-accent" />
          <span>{t.contact.scheduleBtn}</span>
          <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>

        {/* Direct Gmail Compose Link + Quick Copy */}
        <div className="inline-flex items-center rounded-full border border-border-subtle bg-bg-surface/60 hover:border-accent/40 transition-all text-xs font-mono">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=rop.martel@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 pl-4 pr-2.5 py-2.5 text-text-secondary hover:text-text-primary group"
            title={isSpanish ? "Abrir borrador en Gmail" : "Open compose in Gmail"}
          >
            <Mail size={13} className="text-accent shrink-0" />
            <span>{email}</span>
            <ArrowUpRight size={12} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>
          <div className="w-px h-4 bg-border-subtle" />
          <button
            type="button"
            onClick={handleCopyEmail}
            className="px-3 py-2.5 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
            title={isSpanish ? "Copiar dirección de correo" : "Copy email address"}
          >
            {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
          </button>
        </div>
      </div>

      {/* Social Verification Handles */}
      <div className="flex items-center justify-center gap-6 text-xs font-mono text-text-muted">
        {social.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-text-primary transition-colors py-1"
          >
            {link.name.toLowerCase().includes("github") && <GithubIcon size={12} />}
            <span>{link.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};
