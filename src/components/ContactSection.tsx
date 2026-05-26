"use client";

import React from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { SectionLabel } from "@/src/components/ui/SectionLabel";

interface SocialLink { name: string; url: string; display: string; }
interface ContactData {
  title: string;
  description: string;
  email: string;
  location: string;
  social: SocialLink[];
}

export const ContactSection: React.FC<{ contact: ContactData }> = ({ contact }) => (
  <section id="contact" className="py-24">
    <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
      {/* Left */}
      <div className="lg:col-span-4">
        <FadeIn>
          <SectionLabel
            eyebrow={contact.title}
            heading="Let's Connect"
            description={contact.description}
          />

          <div className="space-y-4 mt-2">
            <a
              href={`mailto:${contact.email}`}
              className="block text-sm font-body font-medium text-text-primary hover:text-accent transition-colors duration-150"
            >
              {contact.email}
            </a>
            <p className="text-sm font-body text-text-muted">{contact.location}</p>

            <div className="pt-4 flex flex-col gap-3">
              {contact.social.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-sm font-body text-text-secondary hover:text-text-primary transition-colors duration-150 group"
                >
                  <span>{link.name}</span>
                  <span className="text-text-muted group-hover:text-accent text-xs transition-colors duration-150">
                    {link.display} ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Right — Form */}
      <div className="lg:col-span-8">
        <FadeIn delay={100} className="h-full">
          <motion.div 
            whileHover={{ y: -4 }}
            className="h-full min-h-[320px] flex flex-col justify-center items-center bg-bg-surface border border-border-subtle hover:border-accent/30 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500"
          >
            {/* Ambient hover glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/0 group-hover:bg-accent/5 blur-[80px] rounded-full pointer-events-none transition-colors duration-700" />
            
            {/* Mail Icon */}
            <div className="w-16 h-16 rounded-2xl bg-bg-raised border border-border-base flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-accent/40 group-hover:text-accent transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>

            <h3 className="relative z-10 text-2xl font-heading font-semibold text-text-primary mb-2">
              {contact.email}
            </h3>
            <p className="relative z-10 text-sm font-body text-text-muted mb-8 max-w-sm mx-auto">
              Skip the forms. Drop me a line directly. I usually respond within 24 hours.
            </p>
            
            <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <motion.a
                whileTap={{ scale: 0.96 }}
                href={`mailto:${contact.email}`}
                className="h-12 px-8 flex items-center justify-center gap-2 rounded-xl bg-text-primary text-bg-base text-sm font-body font-bold hover:bg-accent hover:text-black transition-colors duration-200 shadow-md"
              >
                <span>Write Email</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </motion.a>
              
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={(e) => {
                  navigator.clipboard.writeText(contact.email);
                  const target = e.currentTarget;
                  const span = target.querySelector("span");
                  if (span) {
                    const originalText = span.innerText;
                    span.innerText = "Copied!";
                    target.classList.add("border-accent", "text-accent", "bg-accent/10");
                    setTimeout(() => {
                      span.innerText = originalText;
                      target.classList.remove("border-accent", "text-accent", "bg-accent/10");
                    }, 2000);
                  }
                }}
                className="h-12 px-8 flex items-center justify-center gap-2 rounded-xl bg-bg-raised border border-border-base text-text-primary text-sm font-body font-medium hover:bg-bg-surface transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                <span>Copy</span>
              </motion.button>
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </div>
  </section>
);
