"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDesign, DesignTheme } from "@/src/context/DesignContext";

const DESIGNS: { id: DesignTheme; label: string; desc: string; preview: string }[] = [
  {
    id: "editorial",
    label: "Editorial",
    desc: "Clean, professional — Vercel-inspired minimal layout",
    preview: "editorial",
  },
  {
    id: "pcb",
    label: "PCB Motherboard",
    desc: "Cinematic circuit board — photo as hub, animated traces",
    preview: "pcb",
  },
];

const EditorialPreview = () => (
  <div className="w-full h-20 bg-white rounded-md border border-zinc-200 overflow-hidden flex gap-2 p-2">
    <div className="w-8 bg-zinc-100 rounded-sm flex-none" />
    <div className="flex-1 flex flex-col gap-1.5 pt-1">
      <div className="h-2 bg-zinc-800 rounded-full w-3/4" />
      <div className="h-1.5 bg-zinc-400 rounded-full w-1/2" />
      <div className="h-1.5 bg-zinc-200 rounded-full w-full" />
      <div className="h-1.5 bg-zinc-200 rounded-full w-4/5" />
    </div>
  </div>
);

const PCBPreview = () => (
  <div className="w-full h-20 bg-[#0a1628] rounded-md overflow-hidden relative">
    <div className="absolute inset-0 opacity-30"
      style={{ backgroundImage: "linear-gradient(#00ff4120 1px,transparent 1px),linear-gradient(90deg,#00ff4120 1px,transparent 1px)", backgroundSize: "8px 8px" }} />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full bg-[#0a1628] border-2 border-[#00ff41] shadow-[0_0_8px_#00ff41]" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <svg key={deg} className="absolute" width="60" height="60" style={{ transform: `rotate(${deg}deg)` }}>
          <line x1="30" y1="30" x2="60" y2="30" stroke="#00ff41" strokeWidth="0.8" opacity="0.6" />
          <circle cx="60" cy="30" r="2" fill="#00ff41" opacity="0.8" />
        </svg>
      ))}
    </div>
  </div>
);

export const DesignSelector = () => {
  const { design, setDesign } = useDesign();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-4 lg:bottom-8 lg:right-6 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="w-11 h-11 rounded-xl bg-bg-surface border border-border-base shadow-lg flex items-center justify-center hover:border-accent/40 transition-all duration-200 cursor-pointer"
        aria-label="Select design theme"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-secondary">
          <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-14 right-0 w-72 bg-bg-surface border border-border-base rounded-2xl shadow-2xl p-4"
          >
            <p className="text-xs font-body font-bold uppercase tracking-wider text-text-muted mb-3">Select Design</p>
            <div className="flex flex-col gap-3">
              {DESIGNS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => { setDesign(d.id); setOpen(false); }}
                  className={`text-left rounded-xl border p-3 transition-all duration-200 cursor-pointer ${
                    design === d.id
                      ? "border-accent bg-accent/5"
                      : "border-border-subtle hover:border-border-base"
                  }`}
                >
                  {d.id === "editorial" ? <EditorialPreview /> : <PCBPreview />}
                  <div className="mt-2">
                    <p className={`text-sm font-body font-bold ${design === d.id ? "text-accent" : "text-text-primary"}`}>{d.label}</p>
                    <p className="text-[11px] text-text-muted font-body mt-0.5">{d.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
