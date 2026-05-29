"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useDragControls, AnimatePresence } from "framer-motion";
import { TerminalThemeSwitcher } from "./TerminalThemeSwitcher";

interface Section {
  id: string;
  label: string;
  cmd: string;
}

const sections: Section[] = [
  { id: "top",          label: "Home",         cmd: "cd ~"              },
  { id: "projects",     label: "Projects",     cmd: "ls ./projects"     },
  { id: "experience",   label: "Experience",   cmd: "cat ./experience"  },
  { id: "skills",       label: "Insights",     cmd: "sh ./insights"     },
  { id: "case-studies", label: "Case Studies", cmd: "grep -r 'impact'"  },
  { id: "contact",      label: "Contact",      cmd: "ping -c 1 contact" },
];

// ── Blinking cursor ────────────────────────────────────────────────────────────
const Cursor: React.FC = () => (
  <motion.span
    animate={{ opacity: [1, 0, 1] }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    className="inline-block w-[5px] h-[10px] bg-accent ml-0.5 align-middle"
  />
);

// ── Shared terminal body content ───────────────────────────────────────────────
const TerminalBody: React.FC<{
  activeSection: string;
  onNavigate: () => void;
}> = ({ activeSection, onNavigate }) => (
  <div className="flex flex-col gap-2">
    {sections.map((section) => {
      const isActive = activeSection === section.id;
      return (
        <a
          key={section.id}
          href={`#${section.id}`}
          onClick={onNavigate}
          className="group flex flex-col transition-all duration-200"
        >
          {isActive ? (
            <span className="text-accent font-bold leading-relaxed">
              <span className="opacity-50">romartel@portfolio:~$</span>{" "}
              <span className="text-text-primary underline decoration-accent/35 decoration-2">
                {section.cmd}
              </span>
              <Cursor />
            </span>
          ) : (
            <span className="text-text-muted group-hover:text-text-primary transition-colors duration-150">
              $ {section.cmd}
            </span>
          )}
        </a>
      );
    })}
  </div>
);

export const ScrollIndicator: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("top");
  const [isDragging, setIsDragging]       = useState(false);
  const [mobileOpen, setMobileOpen]       = useState(false);
  const dragControls = useDragControls();
  const desktopConstraintsRef = useRef<HTMLDivElement>(null);

  // ── Inject viewport constraint div for desktop drag ──────────────────────────
  useEffect(() => {
    const el = desktopConstraintsRef.current;
    if (!el) return;
    el.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:0";
    document.body.appendChild(el);
    return () => { if (el.parentNode) el.parentNode.removeChild(el); };
  }, []);

  // ── IntersectionObserver ─────────────────────────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.scrollSection ?? "top";
            setActiveSection(id);
          }
        });
      },
      { root: null, rootMargin: "-30% 0px -40% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = id === "top" ? document.body : document.getElementById(id);
      if (el) {
        (el as HTMLElement).dataset.scrollSection = id;
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, []);

  const activeCmd = sections.find((s) => s.id === activeSection)?.cmd ?? "cd ~";

  return (
    <>
      {/* ── Desktop: draggable terminal ──────────────────────────────────────── */}
      <div ref={desktopConstraintsRef} className="hidden lg:block" />
      <motion.div
        drag
        dragControls={dragControls}
        dragMomentum={false}
        dragElastic={0.06}
        dragConstraints={desktopConstraintsRef}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        className={`fixed left-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2.5
          font-mono text-[10px] select-none
          bg-bg-surface/90 border border-border-subtle p-4 rounded-2xl
          shadow-xl backdrop-blur-md w-[220px]
          transition-shadow duration-200
          ${isDragging ? "shadow-2xl border-accent/30" : ""}`}
        style={{ cursor: isDragging ? "grabbing" : "default" }}
      >
        {/* Header / drag handle */}
        <div
          onPointerDown={(e) => dragControls.start(e)}
          className="flex items-center justify-between border-b border-border-subtle pb-2 mb-1.5 cursor-grab active:cursor-grabbing"
        >
          <div className="flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500/70" />
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/70" />
            <span className="w-1.5 h-1.5 rounded-full bg-green-500/70" />
          </div>
          <span className="text-[8px] text-text-muted uppercase tracking-widest font-bold">
            bash · drag me
          </span>
        </div>

        <TerminalBody
          activeSection={activeSection}
          onNavigate={() => { /* no-op on desktop */ }}
        />

        <TerminalThemeSwitcher />
      </motion.div>

      {/* ── Mobile: collapsible draggable terminal pill ──────────────────────── */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.05}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        className="fixed bottom-6 left-4 z-50 flex lg:hidden flex-col font-mono select-none"
        style={{ touchAction: "none" }}
      >
        {/* Expanded panel — slides up */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-panel"
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="mb-2 bg-bg-surface/95 border border-border-subtle rounded-2xl p-4 shadow-2xl backdrop-blur-md text-[10.5px] w-[230px]"
            >
              <TerminalBody
                activeSection={activeSection}
                onNavigate={() => setMobileOpen(false)}
              />
              <TerminalThemeSwitcher />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsed pill — always visible */}
        <motion.button
          onClick={() => { if (!isDragging) setMobileOpen((o) => !o); }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2.5 px-4.5 py-2.5 rounded-xl border shadow-lg backdrop-blur-md text-[11.5px] font-mono transition-all duration-200
            ${mobileOpen
              ? "bg-accent text-bg-base border-accent"
              : "bg-bg-surface/90 border-border-subtle text-text-primary"
            }`}
        >
          {/* Dots */}
          <div className="flex gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${mobileOpen ? "bg-bg-base/60" : "bg-red-500/70"}`} />
            <span className={`w-1.5 h-1.5 rounded-full ${mobileOpen ? "bg-bg-base/60" : "bg-yellow-500/70"}`} />
            <span className={`w-1.5 h-1.5 rounded-full ${mobileOpen ? "bg-bg-base/60" : "bg-green-500/70"}`} />
          </div>
          <span className="truncate max-w-[135px]">
            $ {activeCmd}
          </span>
          {!mobileOpen && <Cursor />}
        </motion.button>
      </motion.div>
    </>
  );
};
