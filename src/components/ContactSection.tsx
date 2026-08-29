"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { SectionLabel } from "@/src/components/ui/SectionLabel";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Clarity from "@microsoft/clarity";

interface SocialLink {
  name: string;
  url: string;
  display: string;
}
interface ContactData {
  title: string;
  description: string;
  email: string;
  location: string;
  social: SocialLink[];
}

export const ContactSection: React.FC<{ contact: ContactData }> = ({ contact }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ purpose: "", name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => setStep((s) => s + 1);
  const handlePrev = () => setStep((s) => Math.max(0, s - 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step !== 3) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setIsSubmitting(false);
        alert("There was a problem sending your message. Please try again.");
        return;
      }
    } catch {
      setIsSubmitting(false);
      alert("Connection error. Please try again later.");
      return;
    }

    try {
      Clarity.event("contact_funnel_completed");
    } catch {}

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const purposes = ["Technical Automation", "Marketing Operations", "Consulting Audit", "General Inquiry"];

  return (
    <section id="contact" className="py-24 bg-bg-base border-t border-border-subtle">
      <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Info Column */}
        <div className="lg:col-span-5">
          <FadeIn>
            <SectionLabel
              eyebrow="Get In Touch"
              heading="Let's Discuss Systems &amp; Strategy"
              description={contact.description}
            />

            <div className="space-y-4 mt-4">
              <a
                href={`mailto:${contact.email}`}
                className="block text-sm font-body font-semibold text-accent hover:underline"
              >
                {contact.email}
              </a>
              <p className="text-xs font-body text-text-muted">{contact.location}</p>

              <div className="pt-4 flex flex-col gap-2.5">
                {contact.social.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-xs font-body text-text-secondary hover:text-text-primary transition-colors py-1"
                  >
                    <span>{link.name}</span>
                    <span className="text-text-muted text-[11px]">
                      {link.display} ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right Interactive Funnel */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <FadeIn delay={100} className="h-full">
            <div className="w-full bg-bg-surface border border-border-base rounded-3xl p-6 sm:p-9 shadow-sm">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-signal-success/10 flex items-center justify-center text-emerald-text mb-4">
                      <CheckCircle2 size={28} />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-text-primary mb-1.5">Message Sent</h3>
                    <p className="text-text-secondary text-xs font-body max-w-sm mx-auto">
                      Thank you for reaching out. I will respond to your inquiry within 24 business hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {/* Progress Bar */}
                    <div className="w-full bg-bg-raised h-1.5 rounded-full mb-8 overflow-hidden">
                      <motion.div
                        className="h-full bg-accent"
                        initial={{ width: 0 }}
                        animate={{ width: `${((step + 1) / 4) * 100}%` }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>

                    <form onSubmit={handleSubmit} className="min-h-[220px] flex flex-col">
                      <AnimatePresence mode="wait">
                        {step === 0 && (
                          <motion.div key="step0" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} className="flex-1">
                            <h4 className="text-base font-heading font-bold text-text-primary mb-4">What type of engagement are you exploring?</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {purposes.map((p) => (
                                <button
                                  key={p}
                                  type="button"
                                  onClick={() => {
                                    setFormData({ ...formData, purpose: p });
                                    handleNext();
                                  }}
                                  className="p-3.5 rounded-xl border border-border-subtle bg-bg-raised/40 text-xs font-body font-medium text-text-secondary hover:border-accent hover:text-accent hover:bg-accent/5 text-left transition-all cursor-pointer"
                                >
                                  {p}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {step === 1 && (
                          <motion.div key="step1" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} className="flex-1">
                            <h4 className="text-base font-heading font-bold text-text-primary mb-1">What is your name?</h4>
                            <p className="text-xs text-text-muted mb-4">Please share your name or organization.</p>
                            <input
                              type="text"
                              autoFocus
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="Jane Doe"
                              className="w-full bg-bg-raised border border-border-base rounded-xl px-4 py-2.5 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-all"
                            />
                            <div className="mt-6 flex gap-2.5">
                              <button type="button" onClick={handlePrev} className="px-4 py-2 rounded-xl border border-border-base text-text-secondary text-xs font-body hover:bg-bg-raised transition-colors cursor-pointer">Back</button>
                              <button type="button" onClick={handleNext} disabled={!formData.name} className="px-5 py-2 rounded-xl bg-accent text-white text-xs font-body font-semibold hover:bg-accent-hover disabled:opacity-50 transition-colors cursor-pointer">Continue</button>
                            </div>
                          </motion.div>
                        )}

                        {step === 2 && (
                          <motion.div key="step2" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} className="flex-1">
                            <h4 className="text-base font-heading font-bold text-text-primary mb-1">How can I reply to you?</h4>
                            <p className="text-xs text-text-muted mb-4">We will use this email address for direct follow-up.</p>
                            <input
                              type="email"
                              autoFocus
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="jane@company.com"
                              className="w-full bg-bg-raised border border-border-base rounded-xl px-4 py-2.5 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-all"
                            />
                            <div className="mt-6 flex gap-2.5">
                              <button type="button" onClick={handlePrev} className="px-4 py-2 rounded-xl border border-border-base text-text-secondary text-xs font-body hover:bg-bg-raised transition-colors cursor-pointer">Back</button>
                              <button type="button" onClick={handleNext} disabled={!formData.email || !/\S+@\S+\.\S+/.test(formData.email)} className="px-5 py-2 rounded-xl bg-accent text-white text-xs font-body font-semibold hover:bg-accent-hover disabled:opacity-50 transition-colors cursor-pointer">Continue</button>
                            </div>
                          </motion.div>
                        )}

                        {step === 3 && (
                          <motion.div key="step3" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} className="flex-1 flex flex-col">
                            <h4 className="text-base font-heading font-bold text-text-primary mb-1">Project Details &amp; Objectives</h4>
                            <p className="text-xs text-text-muted mb-3">Briefly describe the systems or challenge you wish to solve.</p>
                            <textarea
                              autoFocus
                              required
                              rows={3}
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              placeholder="We are looking to streamline our operations..."
                              className="w-full bg-bg-raised border border-border-base rounded-xl px-4 py-2.5 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-all resize-none flex-1"
                            />
                            <div className="mt-5 flex gap-2.5">
                              <button type="button" onClick={handlePrev} className="px-4 py-2 rounded-xl border border-border-base text-text-secondary text-xs font-body hover:bg-bg-raised transition-colors cursor-pointer">Back</button>
                              <button type="submit" disabled={!formData.message || isSubmitting} className="px-6 py-2 rounded-xl bg-accent text-white text-xs font-body font-semibold hover:bg-accent-hover disabled:opacity-50 transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer">
                                <span>{isSubmitting ? "Sending..." : "Submit Inquiry"}</span>
                                <ArrowRight size={13} />
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
