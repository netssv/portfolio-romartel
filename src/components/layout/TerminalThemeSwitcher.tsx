"use client";

import React, { useState, useEffect } from "react";
import { useDesign } from "@/src/context/DesignContext";

export const TerminalThemeSwitcher: React.FC = () => {
  const { design, setDesign } = useDesign();
  const [theme, setTheme] = useState<"day" | "night">("day");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("theme-dark");
    setTheme(isDark ? "night" : "day");
  }, []);

  const selectMode = (mode: "day" | "night" | "pcb") => {
    if (mode === "day") {
      setDesign("editorial");
      setTheme("day");
      document.documentElement.classList.remove("theme-dark");
      localStorage.setItem("theme-override", "day");
    } else if (mode === "night") {
      setDesign("editorial");
      setTheme("night");
      document.documentElement.classList.add("theme-dark");
      localStorage.setItem("theme-override", "night");
    } else if (mode === "pcb") {
      setDesign("pcb");
      setTheme("night");
      document.documentElement.classList.add("theme-dark");
      localStorage.setItem("theme-override", "night");
    }
  };

  const activeMode = design === "pcb" ? "pcb" : theme;

  return (
    <div className="mt-3 pt-3 border-t border-border-subtle flex flex-col gap-1 text-[10px] text-text-muted font-mono select-none">
      <div className="opacity-70"># select mode</div>
      <div className="flex items-center gap-1.5 mt-0.5">
        <span className="opacity-40">$</span>
        {(["day", "night", "pcb"] as const).map((m) => {
          const isActive = activeMode === m;
          return (
            <button
              key={m}
              onClick={() => selectMode(m)}
              className={`px-2 py-0.5 rounded text-[9px] cursor-pointer transition-all duration-150 capitalize ${
                isActive
                  ? "bg-accent text-bg-base font-bold"
                  : "bg-bg-raised hover:bg-bg-surface hover:text-text-primary text-text-muted border border-border-subtle"
              }`}
            >
              {m}
            </button>
          );
        })}
      </div>
    </div>
  );
};
