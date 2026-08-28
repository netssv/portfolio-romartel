"use client";

import { useState, useEffect } from "react";

export type SectionId =
  | "top"
  | "projects"
  | "experience"
  | "skills"
  | "architecture"
  | "case-studies"
  | "philosophy"
  | "contact";

const SECTION_IDS: SectionId[] = [
  "top",
  "projects",
  "experience",
  "skills",
  "architecture",
  "case-studies",
  "philosophy",
  "contact",
];

export function useActiveSection(): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>("top");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const id = SECTION_IDS[i];
        const el = id === "top" ? document.getElementById("top") || document.body : document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          if (scrollPosition >= top) {
            setActiveSection(id);
            return;
          }
        }
      }
      setActiveSection("top");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return activeSection;
}
