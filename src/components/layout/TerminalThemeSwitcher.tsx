"use client";

import React, { useState, useEffect } from "react";

export const TerminalThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<"day" | "night">("day");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("theme-dark");
    setTheme(isDark ? "night" : "day");
  }, []);

  const selectMode = (mode: "day" | "night") => {
    setTheme(mode);
    if (mode === "night") {
      document.documentElement.classList.add("theme-dark");
      localStorage.setItem("theme-override", "night");
    } else {
      document.documentElement.classList.remove("theme-dark");
      localStorage.setItem("theme-override", "day");
    }
  };

  return (
    <div className="mt-3 pt-3 border-t border-border-subtle flex flex-col gap-1 text-xs text-text-muted font-mono select-none">
      <div className="opacity-70"># theme mode</div>
      <div className="flex items-center gap-1.5 mt-0.5">
        <span className="opacity-40">$</span>
        {(["day", "night"] as const).map((m) => {
          const isActive = theme === m;
          return (
            <button
              key={m}
              onClick={() => selectMode(m)}
              className={`px-2 py-0.5 rounded text-xs cursor-pointer transition-all duration-150 capitalize ${
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
