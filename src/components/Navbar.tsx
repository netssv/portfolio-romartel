"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X, Sun, Moon } from "lucide-react";

interface NavItem {
  name: string;
  path: string;
}

interface NavbarProps {
  navItems: NavItem[];
  authorName: string;
}

export const Navbar: React.FC<NavbarProps> = ({ navItems, authorName }) => {
  const { scrollY } = useScroll();
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

  const scrollToPath = (path: string) => {
    setMobileMenuOpen(false);
    if (path === "/" || path === "#" || path === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(path);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

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
        {/* Brand */}
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

        {/* Desktop Navigation (Visible exclusively on 1024px+ to avoid collision) */}
        <nav className="hidden lg:flex items-center gap-1 bg-bg-raised/70 p-1 rounded-xl border border-border-subtle" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = activeSection === item.name;
            return (
              <a
                key={item.name}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToPath(item.path);
                }}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-all duration-150 ${
                  isActive
                    ? "text-white bg-accent font-semibold shadow-xs"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-surface/80"
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark/light theme"
            className="h-9 w-9 flex items-center justify-center rounded-xl border border-border-subtle bg-bg-surface text-text-secondary hover:text-text-primary hover:border-accent transition-colors cursor-pointer shadow-xs"
          >
            {theme === "night" ? (
              <Sun size={14} className="text-accent" />
            ) : (
              <Moon size={14} className="text-accent" />
            )}
          </button>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToPath("#contact");
            }}
            className="hidden sm:inline-flex h-9 px-3.5 items-center gap-1.5 rounded-xl text-xs font-body font-semibold text-white bg-accent hover:bg-accent-hover transition-colors shadow-xs"
          >
            <span>Let&apos;s Connect</span>
            <ArrowUpRight size={13} />
          </a>

          {/* Mobile Menu Toggle */}
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

      {/* Mobile Slide-down Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-b border-border-subtle bg-bg-surface/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-2 shadow-xl"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.name;
              return (
                <a
                  key={item.name}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToPath(item.path);
                  }}
                  className={`px-3 py-2.5 rounded-xl text-xs font-body font-medium transition-all ${
                    isActive
                      ? "text-white bg-accent font-semibold shadow-xs"
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-raised"
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToPath("#contact");
              }}
              className="sm:hidden mt-2 h-10 flex items-center justify-center gap-1.5 rounded-xl text-xs font-body font-semibold text-white bg-accent hover:bg-accent-hover transition-colors shadow-xs"
            >
              <span>Let&apos;s Connect</span>
              <ArrowUpRight size={13} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
