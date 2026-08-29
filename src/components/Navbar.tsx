"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X, Sun, Moon } from "lucide-react";
import { useSmoothScroll } from "./layout/SmoothScrollProvider";
import { DesktopNav } from "./layout/DesktopNav";
import { MobileMenuDropdown } from "./layout/MobileMenuDropdown";
import { LanguageToggle } from "./ui/LanguageToggle";
import { useLanguage } from "@/src/context/LanguageContext";

interface NavItem {
  name: string;
  path: string;
}

interface NavbarProps {
  navItems: NavItem[];
  authorName: string;
}

export const Navbar: React.FC<NavbarProps> = ({ navItems, authorName }) => {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const { getLenis } = useSmoothScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"day" | "night">("day");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("theme-dark");
    if (isDark) {
      const frame = requestAnimationFrame(() => setTheme("night"));
      return () => cancelAnimationFrame(frame);
    }
  }, []);

  const toggleTheme = () => {
    const isNight = theme === "day";
    setTheme(isNight ? "night" : "day");
    document.documentElement.classList.toggle("theme-dark", isNight);
    localStorage.setItem("theme-override", isNight ? "night" : "day");
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    setScrolled(latest > 24);

    if (latest > previous && latest > 150 && !mobileMenuOpen) {
      setHidden(true);
    } else if (latest < previous) {
      setHidden(false);
    }
  });

  const scrollToPath = useCallback(
    (path: string) => {
      setMobileMenuOpen(false);
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

      const targetEl = document.getElementById(targetId) || document.querySelector(path);
      if (targetEl) {
        if (lenis) {
          lenis.scrollTo(targetEl as HTMLElement, { offset: -70, duration: 1.2 });
        } else {
          const top = (targetEl as HTMLElement).getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    },
    [getLenis]
  );

  useEffect(() => {
    const sections = navItems.map((item) => {
      const id = item.path.substring(1);
      return id === "top" ? document.body : document.getElementById(id);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id || "top";
            const match = navItems.find((item) => item.path === `#${id}`);
            if (match) setActiveSection(match.name);
          }
        });
      },
      { root: null, rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [navItems]);

  const initials = authorName
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className={`fixed top-0 z-50 w-full transition-colors duration-200 ${
        scrolled || mobileMenuOpen
          ? "bg-bg-surface/90 backdrop-blur-md border-b border-border-subtle shadow-xs"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollToPath("#top");
          }}
          aria-label="Home"
          className="flex items-center gap-2.5 shrink-0"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-white text-xs font-heading font-bold shadow-xs">
            {initials}
          </span>
          <span className="text-sm font-heading font-bold text-text-primary tracking-tight truncate max-w-[140px] sm:max-w-none">
            {authorName}
          </span>
        </a>

        <DesktopNav
          navItems={navItems}
          activeSection={activeSection}
          onNavigate={scrollToPath}
        />

        <div className="flex items-center gap-2 shrink-0">
          <LanguageToggle />

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark/light theme"
            className="h-9 w-9 flex items-center justify-center rounded-xl border border-border-subtle bg-bg-surface text-text-secondary hover:text-text-primary hover:border-accent transition-colors cursor-pointer shadow-xs"
          >
            {theme === "night" ? <Sun size={14} className="text-accent" /> : <Moon size={14} className="text-accent" />}
          </button>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToPath("#contact");
            }}
            className="hidden sm:inline-flex h-9 px-3.5 items-center gap-1.5 rounded-xl text-xs font-body font-semibold text-white bg-accent hover:bg-accent-hover transition-colors shadow-xs"
          >
            <span>{t.nav.contact}</span>
            <ArrowUpRight size={13} />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden h-9 w-9 flex items-center justify-center rounded-xl border border-border-subtle bg-bg-surface text-text-primary hover:border-accent transition-colors cursor-pointer shadow-xs"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenuDropdown
            navItems={navItems}
            activeSection={activeSection}
            onNavigate={scrollToPath}
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
};
