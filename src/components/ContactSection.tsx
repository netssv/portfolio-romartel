"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { SectionLabel } from "@/src/components/ui/SectionLabel";
import Clarity from "@microsoft/clarity";

interface SocialLink { name: string; url: string; display: string; }
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
    
    // Prevent submission if user hits Enter on earlier steps
    if (step !== 3) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error?.message || errorData.error || "Unknown error";
        console.error("Failed to send message:", errorMessage);
        alert(`Oops! There was a problem sending your message.\nError: ${errorMessage}\n\nPlease check the API configuration or try again later.`);
        setIsSubmitting(false);
        return;
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Connection error. Please try again later.");
      setIsSubmitting(false);
      return;
    }
    
    // Log conversion to Clarity
    try {
      Clarity.event("contact_funnel_completed");
    } catch (e) {}

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const purposes = ["Job Opportunity", "Freelance Project", "Consulting", "Just saying hi"];

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left */}
        <div className="lg:col-span-5">
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

        {/* Right — Funnel */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <FadeIn delay={100} className="h-full">
            <div className="w-full bg-bg-surface border border-border-subtle rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-sm">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-10"
                  >
                    <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/></svg>
                    </div>
                    <h3 className="text-2xl font-heading font-semibold text-text-primary mb-2">Message Sent!</h3>
                    <p className="text-text-muted text-sm font-body">Thank you for reaching out. I'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Progress Bar */}
                    <div className="w-full bg-bg-raised h-1.5 rounded-full mb-8 overflow-hidden">
                      <motion.div 
                        className="h-full bg-accent"
                        initial={{ width: 0 }}
                        animate={{ width: `${((step + 1) / 4) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    <form onSubmit={handleSubmit} className="min-h-[240px] flex flex-col">
                      <AnimatePresence mode="wait">
                        {step === 0 && (
                          <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                            <h4 className="text-xl font-heading font-semibold text-text-primary mb-6">What brings you here today?</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {purposes.map((p) => (
                                <button
                                  key={p}
                                  type="button"
                                  onClick={() => {
                                    setFormData({ ...formData, purpose: p });
                                    try { Clarity.event(`funnel_purpose_${p.replace(/\s+/g, '_')}`); } catch (e) {}
                                    handleNext();
                                  }}
                                  className="p-4 rounded-xl border border-border-base text-sm font-body font-medium text-text-secondary hover:border-accent hover:text-accent hover:bg-accent/5 text-left transition-all duration-200"
                                >
                                  {p}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {step === 1 && (
                          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                            <h4 className="text-xl font-heading font-semibold text-text-primary mb-2">Great! What's your name?</h4>
                            <p className="text-sm text-text-muted mb-6">Let's keep it friendly.</p>
                            <input
                              type="text"
                              autoFocus
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  if (formData.name) handleNext();
                                }
                              }}
                              placeholder="Jane Doe"
                              className="w-full bg-bg-raised border border-border-base rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                            />
                            <div className="mt-8 flex gap-3">
                              <button type="button" onClick={handlePrev} className="px-6 py-2.5 rounded-lg border border-border-base text-text-secondary text-sm font-body hover:bg-bg-raised transition-colors">Back</button>
                              <button type="button" onClick={handleNext} disabled={!formData.name} className="px-6 py-2.5 rounded-lg bg-text-primary text-bg-base text-sm font-body font-bold hover:bg-accent disabled:opacity-50 transition-colors">Continue</button>
                            </div>
                          </motion.div>
                        )}

                        {step === 2 && (
                          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                            <h4 className="text-xl font-heading font-semibold text-text-primary mb-2">How can I reach you?</h4>
                            <p className="text-sm text-text-muted mb-6">I'll use this to reply back.</p>
                            <input
                              type="email"
                              autoFocus
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  if (formData.email && /\S+@\S+\.\S+/.test(formData.email)) handleNext();
                                }
                              }}
                              placeholder="jane@company.com"
                              className="w-full bg-bg-raised border border-border-base rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                            />
                            <div className="mt-8 flex gap-3">
                              <button type="button" onClick={handlePrev} className="px-6 py-2.5 rounded-lg border border-border-base text-text-secondary text-sm font-body hover:bg-bg-raised transition-colors">Back</button>
                              <button type="button" onClick={handleNext} disabled={!formData.email || !/\S+@\S+\.\S+/.test(formData.email)} className="px-6 py-2.5 rounded-lg bg-text-primary text-bg-base text-sm font-body font-bold hover:bg-accent disabled:opacity-50 transition-colors">Continue</button>
                            </div>
                          </motion.div>
                        )}

                        {step === 3 && (
                          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col">
                            <h4 className="text-xl font-heading font-semibold text-text-primary mb-2">Tell me more</h4>
                            <p className="text-sm text-text-muted mb-4">Any specific details I should know before we talk?</p>
                            <textarea
                              autoFocus
                              required
                              rows={4}
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              placeholder="I'm looking for someone to help with..."
                              className="w-full bg-bg-raised border border-border-base rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none flex-1"
                            />
                            <div className="mt-6 flex gap-3">
                              <button type="button" onClick={handlePrev} className="px-6 py-2.5 rounded-lg border border-border-base text-text-secondary text-sm font-body hover:bg-bg-raised transition-colors">Back</button>
                              <button type="submit" disabled={!formData.message || isSubmitting} className="px-8 py-2.5 rounded-lg bg-accent text-black text-sm font-body font-bold hover:bg-accent/90 disabled:opacity-50 transition-colors shadow-lg shadow-accent/20">
                                {isSubmitting ? "Sending..." : "Send Message"}
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
