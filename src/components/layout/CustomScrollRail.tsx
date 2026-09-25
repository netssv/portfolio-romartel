"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useLanguage } from "@/src/context/LanguageContext";
import { useSmoothScroll } from "./SmoothScrollProvider";
import { useDarkBackground } from "@/src/lib/useDarkBackground";

interface SectionConfig {
  id: string;
  getLabel: (t: ReturnType<typeof useLanguage>["t"]) => string;
}

const SECTIONS: SectionConfig[] = [
  { id: "top", getLabel: (t) => t.nav.home },
  { id: "about", getLabel: (t) => t.nav.about },
  { id: "projects", getLabel: (t) => t.nav.projects },
  { id: "experience", getLabel: (t) => t.nav.experience },
  { id: "certifications", getLabel: (t) => t.nav.credentials },
  { id: "case-studies", getLabel: (t) => t.nav.caseStudies },
  { id: "contact", getLabel: (t) => t.nav.contact },
];

export const CustomScrollRail: React.FC = () => {
  const { t } = useLanguage();
  const { getLenis } = useSmoothScroll();
  const [activeSection, setActiveSection] = useState("top");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const isDarkBg = useDarkBackground(() => window.innerHeight / 2);

  // Sync active section based on proximity to viewport center
  const updateActiveSection = useCallback(() => {
    if (typeof window === "undefined") return;

    const sampleY = window.innerHeight * 0.45;
    for (let i = SECTIONS.length - 1; i >= 0; i--) {
      const sec = SECTIONS[i];
      const el = document.getElementById(sec.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= sampleY) {
          setActiveSection(sec.id);
          return;
        }
      }
    }
    setActiveSection("top");
  }, []);

  useEffect(() => {
    updateActiveSection();

    let rAFId: number | null = null;
    const onScrollOrResize = () => {
      if (rAFId) cancelAnimationFrame(rAFId);
      rAFId = requestAnimationFrame(updateActiveSection);
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      if (rAFId) cancelAnimationFrame(rAFId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [updateActiveSection]);

  const scrollToSection = (id: string) => {
    const lenis = getLenis();
    if (id === "top") {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      if (lenis) {
        lenis.scrollTo(el, { offset: -30, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <aside
      aria-label="Section navigation"
      className={`fixed right-3 sm:right-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-2.5 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
        isDarkBg
          ? "bg-black/30 border border-white/20 shadow-[0_4px_24px_rgba(0,0,0,0.35)] opacity-85 hover:opacity-100"
          : "bg-white/90 border border-slate-300/80 shadow-[0_4px_16px_rgba(0,0,0,0.08)] opacity-85 hover:opacity-100"
      }`}
    >
      {SECTIONS.map((sec) => {
        const isActive = activeSection === sec.id;
        const isHovered = hoveredId === sec.id;
        const label = sec.getLabel(t);

        return (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            onMouseEnter={() => setHoveredId(sec.id)}
            onMouseLeave={() => setHoveredId(null)}
            aria-label={`Scroll to ${label}`}
            className="relative flex items-center justify-center p-1 cursor-pointer focus:outline-none"
          >
            {/* Dot indicator with adaptive contrast */}
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? isDarkBg
                    ? "w-2.5 h-2.5 bg-white scale-110 ring-2 ring-white/40 shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                    : "w-2.5 h-2.5 bg-[#21426E] scale-110 ring-2 ring-[#21426E]/30 shadow-xs"
                  : isDarkBg
                  ? "w-1.5 h-1.5 bg-white/40 hover:bg-white/90 hover:scale-125"
                  : "w-1.5 h-1.5 bg-slate-400 hover:bg-slate-700 hover:scale-125"
              }`}
            />

            {/* Individual Tooltip on Hover */}
            {isHovered && (
              <span
                className={`absolute right-8 px-2.5 py-1 rounded-lg text-[11px] font-body font-medium whitespace-nowrap pointer-events-none z-50 animate-in fade-in duration-150 ${
                  isDarkBg
                    ? "bg-[#0D1522]/95 text-white border border-white/20 shadow-xl"
                    : "bg-white/95 text-slate-900 border border-slate-200/90 shadow-lg"
                }`}
              >
                {label}
              </span>
            )}
          </button>
        );
      })}
    </aside>
  );
};
