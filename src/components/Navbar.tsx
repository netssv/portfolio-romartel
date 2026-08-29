"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

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

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    setScrolled(latest > 32);

    if (latest > previous && latest > 150) {
      setHidden(true);
    } else if (latest < previous) {
      setHidden(false);
    }
  });

  const scrollToPath = (path: string) => {
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
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "bg-bg-glass backdrop-blur-md border-b border-border-subtle shadow-xs"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollToPath("#top");
          }}
          aria-label="Home"
          className="flex items-center gap-3 group"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-white text-xs font-heading font-bold tracking-tight shadow-xs">
            {initials}
          </span>
          <span className="text-sm font-heading font-bold text-text-primary tracking-tight">
            {authorName}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-bg-raised/60 p-1 rounded-xl border border-border-subtle" aria-label="Main navigation">
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
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-body font-medium transition-all duration-150 ${
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

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToPath("#contact");
            }}
            className="h-9 px-4 flex items-center gap-1.5 rounded-xl text-xs font-body font-semibold text-white bg-accent hover:bg-accent-hover transition-colors shadow-xs"
          >
            <span>Let&apos;s Connect</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </motion.header>
  );
};
