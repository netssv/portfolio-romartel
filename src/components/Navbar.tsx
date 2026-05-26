"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

interface NavItem { name: string; path: string; }
interface NavbarProps { navItems: NavItem[]; authorName: string; }

export const Navbar: React.FC<NavbarProps> = ({ navItems, authorName }) => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    // Add background blur when scrolled down a bit
    setScrolled(latest > 32);

    // Hide navbar if scrolling down and past the header height
    if (latest > previous && latest > 150) {
      setHidden(true);
    } 
    // Show navbar if scrolling up
    else if (latest < previous) {
      setHidden(false);
    }
  });

  useEffect(() => {
    const sections = navItems.map((item) => {
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
          const match = navItems.find((item) => item.path === `#${id}`);
          if (match) {
            setActiveSection(match.name);
          }
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [navItems]);

  // Initials from "Rodrigo Martel" → "RM"
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
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled
          ? "bg-bg-base/90 backdrop-blur-md border-b border-border-subtle"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <a
          href="#"
          aria-label="Home"
          className="flex items-center gap-2.5 group"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-black text-xs font-heading font-bold tracking-tight">
            {initials}
          </span>
          <span className="text-sm font-body font-medium text-text-primary hidden sm:block">
            {authorName}
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = activeSection === item.name;
            return (
              <a
                key={item.name}
                href={item.path}
                className={`relative px-4 py-2 text-sm font-body transition-colors duration-200 ${
                  isActive ? "text-text-primary font-medium" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.span
                    layoutId="navIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent rounded-t-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className="h-9 px-4 flex items-center rounded-md text-sm font-body font-medium text-text-primary border border-border-base hover:border-accent/40 hover:text-accent transition-all duration-200"
        >
          Get in touch
        </a>
      </div>
    </motion.header>
  );
};
