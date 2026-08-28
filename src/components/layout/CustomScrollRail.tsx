"use client";

import React, { useEffect, useState } from "react";

interface SectionTick {
  id: string;
  label: string;
}

const SECTIONS: SectionTick[] = [
  { id: "top", label: "Top" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Insights" },
  { id: "architecture", label: "Architecture" },
  { id: "case-studies", label: "Case Studies" },
  { id: "contact", label: "Contact" },
];

export const CustomScrollRail: React.FC = () => {
  const [activeSection, setActiveSection] = useState("top");
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id || "top";
            setActiveSection(id);
          }
        });
      },
      { root: null, rootMargin: "-25% 0px -35% 0px", threshold: 0 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = id === "top" ? document.body : document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      aria-label="Section navigation"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed right-3 sm:right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-2 p-1.5 rounded-full bg-bg-surface/80 border border-border-subtle backdrop-blur-md shadow-2xl transition-all duration-300 group"
    >
      {SECTIONS.map((sec) => {
        const isActive = activeSection === sec.id;
        return (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            aria-label={`Scroll to ${sec.label}`}
            className="relative flex items-center justify-center p-1 cursor-pointer group/dot focus:outline-none"
          >
            {/* Minimalist Dot */}
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? "w-2.5 h-2.5 bg-accent shadow-[0_0_10px_rgba(255,149,0,0.9)] scale-110"
                  : "w-1.5 h-1.5 bg-border-base group-hover/dot:bg-text-primary group-hover/dot:scale-125"
              }`}
            />

            {/* Tooltip on Hover */}
            {hovered && (
              <span className="absolute right-7 px-2.5 py-1 rounded-md bg-bg-surface border border-border-subtle text-[10px] font-mono font-semibold text-text-primary whitespace-nowrap shadow-lg pointer-events-none transition-all">
                {sec.label}
              </span>
            )}
          </button>
        );
      })}
    </aside>
  );
};
