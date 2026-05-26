"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const Github = ({ size = 13, className = "" }: { size?: number; className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2.25"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export interface ProjectCardProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  status: string;
  links: { github: string; demo: string; preview?: string };
}

const PROJECT_META: Record<
  string,
  { valueProp: string; outcome: string; stack: string[] }
> = {
  webaudit: {
    valueProp: "Instant on-page SEO and HTML audits without leaving the browser.",
    outcome: "Saves developers 15–20 min per diagnostic session.",
    stack: ["JavaScript", "Chrome Extension API", "DOM Parser"],
  },
  whathappened: {
    valueProp: "Linux-style terminal for deep frontend diagnostics inside Chrome.",
    outcome: "Enables T2/T3 engineers to audit web apps via CLI commands.",
    stack: ["TypeScript", "Xterm.js", "Chrome Extension API"],
  },
  rebusca: {
    valueProp: "Semantic price comparison across Salvadoran supermarkets.",
    outcome: "Helps families identify the cheapest basket in real time.",
    stack: ["Kotlin", "Jetpack Compose", "Hilt DI", "Web Scraping"],
  },
};

const isReleased = (status: string) => status === "Production";

export const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  subtitle,
  category,
  status,
  links,
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const meta = PROJECT_META[id] ?? {
    valueProp: "Custom tool built to solve operational problems.",
    outcome: "Delivered measurable efficiency improvements.",
    stack: ["Next.js", "TypeScript"],
  };

  const released = isReleased(status);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    setCoords({ x: e.clientX - left, y: e.clientY - top });
  };

  return (
    <motion.article
      className="group relative flex flex-col p-6 rounded-2xl border border-border-base overflow-hidden transition-colors duration-300 hover:border-accent"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: `radial-gradient(300px circle at ${coords.x}px ${coords.y}px, rgba(255, 149, 0, 0.04), transparent 80%), var(--bg-surface)`,
      }}
    >
      {/* Spotlight Border illumination overlay (highly subtle) */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl opacity-100 transition-opacity duration-300"
          style={{
            border: "1.5px solid transparent",
            background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, rgba(255, 149, 0, 0.3), transparent 70%)`,
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}

      {/* Background Media Preview (if available) */}
      {links.preview && (
        <img
          src={links.preview}
          alt={`Preview of ${title}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 pointer-events-none z-0 ${
            isHovered ? "opacity-[0.12]" : "opacity-0"
          }`}
        />
      )}

      {/* Content wrapper to stay above the background video */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Eyebrow details */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <span className="text-[9px] font-body font-bold uppercase tracking-wider text-text-muted">
              {category}
            </span>
            <h3 className="text-lg font-heading font-bold text-text-primary group-hover:text-accent transition-colors duration-200 mt-1">
              {title}
            </h3>
            <p className="text-xs font-body text-text-muted mt-0.5">{subtitle}</p>
          </div>
          <span
            className={`shrink-0 mt-0.5 px-2.5 py-0.5 rounded-full text-[10px] font-body font-semibold tracking-wide border ${
              released
                ? "bg-emerald-500/5 text-emerald-400 border-emerald-500/10"
                : "bg-accent/5 text-accent border-accent/10"
            }`}
          >
            {released ? "Live" : "Beta"}
          </span>
        </div>

        {/* Value proposition */}
        <p className="text-sm font-body text-text-secondary leading-relaxed mb-3">
          {meta.valueProp}
        </p>

        {/* Highlighted Outcome */}
        <p className="text-xs font-body font-semibold text-text-primary mb-6 flex items-center gap-1.5">
          <span className="text-accent">→</span>
          <span>{meta.outcome}</span>
        </p>

        {/* Technology chips */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {meta.stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md text-[10px] font-body text-text-muted bg-bg-raised border border-border-subtle"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer dynamic links */}
        <div className="mt-auto flex items-center gap-4 pt-4 border-t border-border-subtle">
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-body font-semibold text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            <Github size={13} className="text-text-muted" />
            <span>GitHub</span>
          </a>
          <a
            href={links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex items-center gap-1 text-xs font-body font-semibold text-accent hover:text-amber-400 transition-colors duration-200 ml-auto"
          >
            <span>Explore info</span>
            <ArrowUpRight
              size={13}
              className="text-accent group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200"
            />
          </a>
        </div>
      </div>
    </motion.article>
  );
};
