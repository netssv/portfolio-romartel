"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export const DesignSelector = () => {
  const [theme, setTheme] = useState<"day" | "night">("night");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("theme-dark");
    setTheme(isDark ? "night" : "day");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "day" ? "night" : "day";
    setTheme(nextTheme);
    if (nextTheme === "night") {
      document.documentElement.classList.add("theme-dark");
      localStorage.setItem("theme-override", "night");
    } else {
      document.documentElement.classList.remove("theme-dark");
      localStorage.setItem("theme-override", "day");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleTheme}
        className="h-11 px-4 rounded-xl bg-bg-surface/90 backdrop-blur-md border border-border-base shadow-xl flex items-center gap-2.5 hover:border-accent/40 transition-all duration-200 cursor-pointer text-text-primary"
        aria-label="Toggle day and night mode"
      >
        {theme === "night" ? (
          <Moon size={16} className="text-accent" />
        ) : (
          <Sun size={16} className="text-accent" />
        )}
        <span className="text-xs font-mono font-medium tracking-wide">
          {theme === "night" ? "Night Mode" : "Day Mode"}
        </span>
      </button>
    </div>
  );
};
