"use client";

import React from "react";
import { motion } from "framer-motion";

interface PCBInfoPanelProps {
  name: string;
  title: string;
  bio: string;
  email: string;
  location: string;
  github: string;
  linkedin: string;
}

export const PCBInfoPanel: React.FC<PCBInfoPanelProps> = ({
  name, title, bio, email, location, github, linkedin,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="flex flex-col gap-4 max-w-sm"
    >
      {/* Status */}
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff41] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff41]" />
        </span>
        <span className="text-xs font-body font-bold uppercase tracking-[0.18em] text-[#00ff41]/80">
          System Online · Available
        </span>
      </div>

      {/* Name */}
      <div>
        <p className="text-xs font-mono text-[#00ff41]/40 mb-1 tracking-widest">{"// OPERATOR_ID"}</p>
        <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-[#00ff41] tracking-tight leading-[1.05]"
          style={{ textShadow: "0 0 20px rgba(0,255,65,0.4)" }}
        >
          {name}
        </h1>
      </div>

      {/* Role chip */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#00ff41]/10 border border-[#00ff41]/40 rounded-sm w-fit">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00ff41]" />
        <span className="text-sm font-mono text-[#f4fbf7] font-bold">{title}</span>
      </div>

      {/* Bio */}
      <p className="text-sm font-mono text-[#a9e2c1] leading-relaxed border-l-2 border-[#00ff41]/40 pl-3">
        {bio}
      </p>

      {/* Data rows */}
      <div className="flex flex-col gap-1.5 font-mono text-sm">
        <div className="flex items-center gap-2 text-[#a9e2c1]">
          <span className="text-[#00ff41]/80 font-bold">LOC:</span>
          <span className="text-[#f4fbf7]">{location}</span>
        </div>
        <div className="flex items-center gap-2 text-[#a9e2c1]">
          <span className="text-[#00ff41]/80 font-bold">NET:</span>
          <a href={`mailto:${email}`} className="text-[#f4fbf7] hover:text-[#00ff41] transition-colors underline decoration-[#00ff41]/30">{email}</a>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap gap-3 mt-2">
        <a
          href="#projects"
          className="px-5 py-2 bg-[#00ff41] text-[#0a1628] text-sm font-mono font-bold rounded-sm hover:bg-[#00ff41]/90 transition-colors shadow-[0_0_16px_rgba(0,255,65,0.3)]"
        >
          ./explore_projects
        </a>
        <a
          href={github} target="_blank" rel="noopener noreferrer"
          className="px-5 py-2 border border-[#00ff41]/60 text-[#f4fbf7] text-sm font-mono font-bold hover:border-[#00ff41] hover:text-[#00ff41] transition-colors rounded-sm bg-[#0d1f30]/40"
        >
          github/
        </a>
        <a
          href={linkedin} target="_blank" rel="noopener noreferrer"
          className="px-5 py-2 border border-[#00ff41]/60 text-[#f4fbf7] text-sm font-mono font-bold hover:border-[#00ff41] hover:text-[#00ff41] transition-colors rounded-sm bg-[#0d1f30]/40"
        >
          linkedin/
        </a>
      </div>
    </motion.div>
  );
};
