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
  <section id={id} className="py-16 border-b border-[#00ff41]/10">
    <div className="max-w-5xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xs font-mono text-[#00ff41]/40 uppercase tracking-[0.18em] mb-1">{"// "}{eyebrow}</p>
        <h2 className="text-2xl font-heading font-bold text-[#00ff41] mb-8 tracking-tight">{heading}</h2>
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
            className="group block p-4 bg-[#0d1f30] border border-[#00ff41]/30 rounded-sm hover:border-[#00ff41] transition-all duration-200 relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "radial-gradient(circle at 50% 0%, rgba(0,255,65,0.08), transparent 70%)" }} />
            <p className="text-xs font-mono text-[#a9e2c1] tracking-wider mb-2 font-bold">{p.category}</p>
            <h3 className="text-base font-mono font-bold text-[#00ff41] group-hover:text-[#f4fbf7] transition-colors mb-1">{p.title}</h3>
            <p className="text-xs font-mono text-[#a9e2c1]/80">{p.subtitle}</p>
            <p className="text-sm font-mono text-[#f4fbf7]/90 mt-2 leading-relaxed line-clamp-2">{p.description}</p>
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
            className="flex gap-4 p-4 bg-[#0d1f30] border border-[#00ff41]/20 rounded-sm"
          >
            <div className="w-1 flex-none bg-[#00ff41] rounded-full" />
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-base font-mono font-bold text-[#00ff41]">{job.role}</h3>
                <span className="text-xs font-mono text-[#a9e2c1] font-bold border border-[#00ff41]/40 px-2 py-0.5 rounded-sm">{job.period}</span>
              </div>
              <p className="text-sm font-mono text-[#00ff41] font-bold mb-1">{job.company}</p>
              <p className="text-sm font-mono text-[#f4fbf7]/90 leading-relaxed">{job.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </PCBSection>

    {/* Skills */}
    <PCBSection id="skills" eyebrow="STACK_REGISTRY" heading="Technical Stack">
      <div className="flex flex-wrap gap-2">
        {skills.map((s, i) => (
          <motion.span key={s}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="px-3 py-1 bg-[#0d1f30] border border-[#00ff41]/40 text-sm font-mono text-[#f4fbf7] font-bold rounded-sm hover:border-[#00ff41] hover:text-[#00ff41] transition-all cursor-default"
          >
            {s}
          </motion.span>
        ))}
      </div>
    </PCBSection>

    {/* Contact */}
    <PCBSection id="contact" eyebrow="HANDSHAKE_INIT" heading="Connect">
      <div className="flex flex-col gap-3 font-mono">
        <p className="text-base text-[#a9e2c1]">
          <span className="text-[#00ff41]/60">$ ping </span>
          <a href={`mailto:${contact.email}`} className="text-[#f4fbf7] hover:text-[#00ff41] transition-colors underline decoration-[#00ff41]/30">{contact.email}</a>
        </p>
        <p className="text-base text-[#a9e2c1]">
          <span className="text-[#00ff41]/60">$ locate </span>
          <span className="text-[#f4fbf7]">{contact.location}</span>
        </p>
      </div>
    </PCBSection>
  </>
);
