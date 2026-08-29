"use client";

import React, { useEffect, useState } from "react";
import { Home, Briefcase, FolderGit2, Compass, Mail, Sun, Moon, Cpu } from "lucide-react";
import { MobileNav } from "./MobileNav";

import { useSmoothScroll } from "./SmoothScrollProvider";

interface SidebarProps {
  authorName: string;
}

const NAV_ITEMS = [
  { name: "Home", path: "#top", icon: Home },
  { name: "Projects", path: "#projects", icon: FolderGit2 },
  { name: "Experience", path: "#experience", icon: Briefcase },
  { name: "Insights", path: "#skills", icon: Compass },
  { name: "Architecture", path: "#architecture", icon: Cpu },
  { name: "Contact", path: "#contact", icon: Mail },
];

export const Sidebar: React.FC<SidebarProps> = ({ authorName }) => {
  const { getLenis } = useSmoothScroll();
  const [activeSection, setActiveSection] = useState("Home");
  const [theme, setTheme] = useState<"day" | "night">("day");

  useEffect(() => {
    const sections = NAV_ITEMS.map((i) =>
      i.path === "#top" ? document.body : document.getElementById(i.path.substring(1))
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id || "top";
            const match = NAV_ITEMS.find((item) => item.path === `#${id}`);
            if (match) setActiveSection(match.name);
          }
        });
      },
      { root: null, rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => section && observer.observe(section));

    setTimeout(
      () =>
        setTheme(
          document.documentElement.classList.contains("theme-dark") ? "night" : "day"
        ),
      0
    );
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const isNight = theme === "day";
    setTheme(isNight ? "night" : "day");
    document.documentElement.classList.toggle("theme-dark", isNight);
    localStorage.setItem("theme-override", isNight ? "night" : "day");
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    const targetId = path.startsWith("#") ? path.slice(1) : path;
    const lenis = getLenis();

    if (path === "/" || path === "#" || targetId === "top") {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    const target = document.getElementById(targetId) || document.querySelector(path);
    if (target) {
      if (lenis) {
        lenis.scrollTo(target as HTMLElement, { offset: -70, duration: 1.2 });
      } else {
        const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* ── Desktop Floating Sidebar (Fixed Left) ────────── */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-64 flex-col justify-between py-12 px-8 border-r border-border-subtle bg-bg-base/70 backdrop-blur-md z-40">
        <div>
          {/* Logo / Brand Name */}
          <a href="#top" onClick={(e) => handleClick(e, "#top")} className="group block mb-14">
            <div className="text-xl font-heading font-bold text-text-primary tracking-tight">
              {authorName}
            </div>
            <span className="text-xs font-body tracking-[0.14em] uppercase text-accent font-semibold block mt-1.5">
              Marketing &amp; Systems
            </span>
          </a>

          {/* Nav Items */}
          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.name;

              return (
                <a
                  key={item.name}
                  href={item.path}
                  onClick={(e) => handleClick(e, item.path)}
                  className={`group relative flex items-center gap-3.5 py-2 px-3 rounded-xl text-xs font-body font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white bg-accent font-semibold shadow-xs"
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-raised/70"
                  }`}
                >
                  <Icon
                    size={15}
                    className={`transition-colors duration-150 flex-shrink-0 ${
                      isActive ? "text-white" : "text-text-muted group-hover:text-text-secondary"
                    }`}
                  />
                  <span>{item.name}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Desktop Theme Switcher + Copyright bottom stack */}
        <div className="flex flex-col gap-5">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-between text-xs font-body font-medium text-text-secondary hover:text-text-primary transition-all duration-200 focus:outline-none text-left border border-border-subtle hover:border-border-base rounded-xl px-3.5 py-2.5 bg-bg-surface cursor-pointer shadow-xs"
          >
            <span>{theme === "night" ? "Day Light Mode" : "Dark Mode"}</span>
            {theme === "night" ? (
              <Sun size={14} className="text-accent" />
            ) : (
              <Moon size={14} className="text-accent" />
            )}
          </button>

          <div className="text-xs font-body text-text-muted">
            &copy; {new Date().getFullYear()} Rodrigo Martel
          </div>
        </div>
      </aside>

      {/* ── Mobile Floating Theme Toggle (Top Right) ─────── */}
      <button
        onClick={toggleTheme}
        className="lg:hidden fixed top-5 right-5 z-40 h-10 px-3.5 bg-bg-glass backdrop-blur-md border border-border-base rounded-xl flex items-center gap-2 shadow-md active:scale-95 cursor-pointer transition-all duration-200"
        aria-label="Toggle Theme"
      >
        {theme === "night" ? (
          <>
            <span className="text-xs font-medium text-text-secondary">Day</span>
            <Sun size={15} className="text-accent" />
          </>
        ) : (
          <>
            <span className="text-xs font-medium text-text-secondary">Night</span>
            <Moon size={15} className="text-accent" />
          </>
        )}
      </button>

      {/* ── Mobile Sticky Navigation Bar (Bottom Float) ──── */}
      <MobileNav navItems={NAV_ITEMS} activeSection={activeSection} onNavigate={handleClick} />
    </>
  );
};
