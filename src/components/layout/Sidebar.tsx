"use client";

import React, { useEffect, useState } from "react";
import { Home, Briefcase, FolderGit2, Compass, Mail, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

interface SidebarProps {
  authorName: string;
}

const NAV_ITEMS = [
  { name: "Home", path: "#top", icon: Home },
  { name: "Projects", path: "#projects", icon: FolderGit2 },
  { name: "Experience", path: "#experience", icon: Briefcase },
  { name: "Insights", path: "#skills", icon: Compass },
  { name: "Contact", path: "#contact", icon: Mail },
];

export const Sidebar: React.FC<SidebarProps> = ({ authorName }) => {
  const [activeSection, setActiveSection] = useState("Home");
  const [theme, setTheme] = useState<"day" | "night">("day");

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => {
      const id = item.path.substring(1);
      return id === "top" ? document.body : document.getElementById(id);
    });

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id || "top";
          const match = NAV_ITEMS.find((item) => item.path === `#${id}`);
          if (match) {
            setActiveSection(match.name);
          }
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    // Detect initial theme on client mount
    const isDark = document.documentElement.classList.contains("theme-dark");
    setTimeout(() => {
      setTheme(isDark ? "night" : "day");
    }, 0);

    return () => observer.disconnect();
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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    const id = path.substring(1);
    const target = id === "top" ? document.body : document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ── Desktop Floating Sidebar (Fixed Left) ────────── */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-64 flex-col justify-between py-12 px-8 border-r border-border-subtle bg-bg-base/60 backdrop-blur-md z-40">
        <div>
          {/* Logo / Brand Name */}
          <a href="#top" onClick={(e) => handleClick(e, "#top")} className="group block mb-16">
            <h2 className="text-xl font-heading font-bold text-text-primary tracking-tight">
              {authorName}
            </h2>
            <span className="text-[10px] font-body tracking-[0.2em] uppercase text-text-accent font-semibold block mt-1">
              Technology Architecture
            </span>
          </a>

          {/* Nav Items */}
          <nav className="flex flex-col gap-6">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.name;

              return (
                <a
                  key={item.name}
                  href={item.path}
                  onClick={(e) => handleClick(e, item.path)}
                  className={`group relative flex items-center gap-4 py-2 text-sm font-body font-medium transition-colors duration-200 ${
                    isActive ? "text-text-primary" : "text-text-muted hover:text-text-secondary"
                  }`}
                >
                  <Icon
                    size={16}
                    className={`transition-colors duration-200 ${
                      isActive ? "text-text-accent" : "text-text-muted group-hover:text-text-secondary"
                    }`}
                  />
                  <span>{item.name}</span>
                  
                  {/* Subtle hover glow / active bar */}
                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-l-full bg-accent shadow-[0_0_12px_rgba(255,149,0,0.5)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Desktop Theme Switcher + Copyright bottom stack */}
        <div className="flex flex-col gap-6">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 text-xs font-body font-semibold text-text-secondary hover:text-text-primary transition-all duration-200 focus:outline-none text-left border border-border-base hover:border-border-subtle rounded-xl px-4 py-2.5 bg-bg-raised cursor-pointer"
          >
            {theme === "night" ? (
              <>
                <Sun size={14} className="text-accent" />
                <span>Day Light Theme</span>
              </>
            ) : (
              <>
                <Moon size={14} className="text-accent" />
                <span>Night Light Theme</span>
              </>
            )}
          </button>

          <div className="text-[11px] font-body text-text-muted">
            &copy; {new Date().getFullYear()} · Core Strategy
          </div>
        </div>
      </aside>

      {/* ── Mobile Floating Theme Toggle (Top Right) ─────── */}
      <button
        onClick={toggleTheme}
        className="lg:hidden fixed top-6 right-6 z-40 w-11 h-11 bg-bg-glass backdrop-blur-md border border-border-base rounded-xl flex items-center justify-center shadow-lg active:scale-95 cursor-pointer transition-all duration-200"
        aria-label="Toggle Theme"
      >
        {theme === "night" ? (
          <Sun size={16} className="text-accent" />
        ) : (
          <Moon size={16} className="text-accent" />
        )}
      </button>

      {/* ── Mobile Sticky Navigation Bar (Bottom Float) ──── */}
      <nav className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm h-14 bg-bg-glass backdrop-blur-lg border border-border-base rounded-2xl flex items-center justify-around px-4 shadow-[0_8px_32px_rgba(0,0,0,0.15)] z-40">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.name;

          return (
            <a
              key={item.name}
              href={item.path}
              onClick={(e) => handleClick(e, item.path)}
              className="relative flex flex-col items-center justify-center w-12 h-12 rounded-xl"
              aria-label={item.name}
            >
              <Icon
                size={20}
                className={`transition-colors duration-200 ${
                  isActive ? "text-text-accent" : "text-text-muted"
                }`}
              />
              
              {isActive && (
                <motion.span
                  layoutId="mobileActiveDot"
                  className="absolute bottom-1 w-1 h-1 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          );
        })}
      </nav>
    </>
  );
};
