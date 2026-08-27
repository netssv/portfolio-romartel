"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface KineticTextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  delay?: number;
  stagger?: number;
  splitBy?: "letter" | "word";
}

/**
 * Kinetic typography reveal with micro-staggered character animations
 * matching the editorial technical precision of vanlent.dev.
 */
export const KineticTextReveal: React.FC<KineticTextRevealProps> = ({
  text,
  className = "",
  as: Component = "span",
  delay = 0,
  stagger = 0.015,
  splitBy = "letter",
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  if (splitBy === "word") {
    const words = text.split(" ");
    return (
      <Component ref={ref as React.RefObject<HTMLHeadingElement>} className={`inline-flex flex-wrap gap-x-2 ${className}`}>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: "100%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
                delay: delay + i * stagger * 3,
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Component>
    );
  }

  const characters = text.split("");
  return (
    <Component ref={ref as React.RefObject<HTMLHeadingElement>} className={`inline-block ${className}`}>
      {characters.map((char, i) => (
        <span
          key={i}
          className={`inline-block overflow-hidden ${char === " " ? "w-2" : ""}`}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * stagger,
            }}
          >
            {char}
          </motion.span>
        </span>
      ))}
    </Component>
  );
};
