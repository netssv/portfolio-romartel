"use client";

import React from "react";
import { motion } from "framer-motion";

interface PCBSectionProps {
  id?: string;
  eyebrow: string;
  heading: string;
  children: React.ReactNode;
}

const PCBSection: React.FC<PCBSectionProps> = ({ id, eyebrow, heading, children }) => (
  <section id={id} className="py-16 border-b border-green-500/10">
    <div className="max-w-5xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xs font-mono text-green-500/80 uppercase tracking-[0.18em] mb-1 font-bold">{"// "}{eyebrow}</p>
        <h2 className="text-3xl font-heading font-bold text-white mb-8 tracking-tight">{heading}</h2>
      </motion.div>
      {children}
    </div>
  </section>
);

interface PCBContentProps {
  sideProjects: { id: string; title: string; subtitle: string; description: string; category: string; links: { github: string } }[];
  experience: { company: string; role: string; period: string; description: string }[];
  skills: string[];
  contact: { email: string; location: string };
}

export const PCBContentSections: React.FC<PCBContentProps> = ({
  sideProjects, experience, skills, contact,
}) => (
  <>
    {/* Projects */}
    <PCBSection id="projects" eyebrow="PROJECTS_MODULE" heading="Featured Projects">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sideProjects.slice(0, 3).map((p, i) => (
          <motion.a
            key={p.id} href={p.links.github} target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group block p-4 bg-slate-900 border border-green-500/30 rounded-sm hover:border-green-400 transition-all duration-200 relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "radial-gradient(circle at 50% 0%, rgba(34,197,94,0.1), transparent 70%)" }} />
            <p className="text-xs font-mono text-emerald-300 tracking-wider mb-2 font-bold">{p.category}</p>
            <h3 className="text-base font-mono font-bold text-green-400 group-hover:text-white transition-colors mb-1">{p.title}</h3>
            <p className="text-xs font-mono text-emerald-300/80">{p.subtitle}</p>
            <p className="text-sm font-mono text-gray-100 mt-2 leading-relaxed line-clamp-2">{p.description}</p>
          </motion.a>
        ))}
      </div>
    </PCBSection>

    {/* Experience */}
    <PCBSection id="experience" eyebrow="PROCESS_LOG" heading="Work Experience">
      <div className="flex flex-col gap-4">
        {experience.map((job, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-4 p-4 bg-slate-900 border border-green-500/20 rounded-sm"
          >
            <div className="w-1 flex-none bg-green-500 rounded-full" />
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-base font-mono font-bold text-green-400">{job.role}</h3>
                <span className="text-xs font-mono text-emerald-300 font-bold border border-green-500/40 px-2 py-0.5 rounded-sm">{job.period}</span>
              </div>
              <p className="text-sm font-mono text-green-400 font-bold mb-1">{job.company}</p>
              <p className="text-sm font-mono text-gray-100 leading-relaxed">{job.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </PCBSection>

    {/* Skills */}
    <PCBSection id="skills" eyebrow="STACK_REGISTRY" heading="Technical Stack">
      <div className="flex flex-wrap gap-3">
        {skills.map((s, i) => (
          <motion.span key={s}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="px-4 py-2 bg-slate-900 border border-green-500/40 text-sm font-mono text-white font-bold rounded-sm hover:border-green-400 hover:text-green-400 transition-all cursor-default"
          >
            {s}
          </motion.span>
        ))}
      </div>
    </PCBSection>

    {/* Contact */}
    <PCBSection id="contact" eyebrow="HANDSHAKE_INIT" heading="Connect">
      <div className="flex flex-col gap-4 font-mono">
        <p className="text-lg text-emerald-100">
          <span className="text-green-500 font-bold">$ ping </span>
          <a href={`mailto:${contact.email}`} className="text-white hover:text-green-400 transition-colors underline decoration-green-500/40 underline-offset-4">{contact.email}</a>
        </p>
        <p className="text-lg text-emerald-100">
          <span className="text-green-500 font-bold">$ locate </span>
          <span className="text-white">{contact.location}</span>
        </p>
      </div>
    </PCBSection>
  </>
);
