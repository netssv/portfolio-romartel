"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface ScatterCharProps {
  char: string;
  index: number;
  scrollYProgress: MotionValue<number>;
  isMobile?: boolean;
}

// Deterministic pseudo-random helper for consistent SSR/client hydration
function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

function ScatterChar({ char, index, scrollYProgress, isMobile = false }: ScatterCharProps) {
  const seed = index + 1;
  const randX = (pseudoRandom(seed * 1.3) - 0.5) * 140;
  const randY = (pseudoRandom(seed * 2.7) - 0.5) * 150;
  const randRotate = (pseudoRandom(seed * 3.1) - 0.5) * 110;
  const randScale = 0.6 + pseudoRandom(seed * 4.9) * 0.8;
  const randBlur = isMobile ? 0 : 8 + pseudoRandom(seed * 5.3) * 10;

  // As the section scrolls from viewport entrance to center, assemble characters
  const x = useTransform(scrollYProgress, [0, 0.85], [randX, 0]);
  const y = useTransform(scrollYProgress, [0, 0.85], [randY, 0]);
  const rotate = useTransform(scrollYProgress, [0, 0.85], [randRotate, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.85], [randScale, 1]);
  const blurVal = useTransform(scrollYProgress, [0, 0.85], [randBlur, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.85], [0.3, 0.7, 1]);
  const filter = useTransform(blurVal, (b) => (isMobile ? "none" : `blur(${b.toFixed(1)}px)`));

  if (char === " ") {
    return <span className="inline-block w-[0.28em]">&nbsp;</span>;
  }

  return (
    <motion.span
      suppressHydrationWarning
      style={{
        display: "inline-block",
        x,
        y,
        rotate,
        scale,
        ...(isMobile ? {} : { filter }),
        opacity,
        willChange: isMobile ? "transform, opacity" : "transform, filter, opacity",
      }}
      className="select-none tracking-normal"
    >
      {char}
    </motion.span>
  );
}

interface ScatterTitleProps {
  text?: string;
  lines?: string[];
  as?: "h1" | "h2";
  className?: string;
}

export function ScatterTitle({ text, lines, as: Tag = "h1", className = "" }: ScatterTitleProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 95%", "center 50%"],
  });

  useEffect(() => {
    setIsMounted(true);
    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const lineArray = useMemo(() => {
    if (lines && lines.length > 0) return lines;
    if (text) return text.split("\n");
    return [];
  }, [lines, text]);

  let globalCharIndex = 0;

  return (
    <Tag
      ref={containerRef}
      suppressHydrationWarning
      className={`text-center font-heading font-black tracking-[-0.04em] uppercase leading-[0.92] sm:leading-[0.88] text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[8rem] text-text-primary px-2 overflow-visible ${className}`}
    >
      {isMounted
        ? lineArray.map((lineStr, lineIdx) => {
            const words = lineStr.split(" ");
            return (
              <span key={lineIdx} className="block">
                {words.map((word, wordIdx) => {
                  const chars = word.split("");
                  const wordChars = chars.map((char) => {
                    const idx = globalCharIndex++;
                    return (
                      <ScatterChar
                        key={idx}
                        char={char}
                        index={idx}
                        scrollYProgress={scrollYProgress}
                        isMobile={isMobile}
                      />
                    );
                  });

                  if (wordIdx < words.length - 1) {
                    globalCharIndex++;
                  }

                  return (
                    <React.Fragment key={wordIdx}>
                      <span className="inline-block whitespace-nowrap">
                        {wordChars}
                      </span>
                      {wordIdx < words.length - 1 && (
                        <span className="inline-block w-[0.28em]">&nbsp;</span>
                      )}
                    </React.Fragment>
                  );
                })}
              </span>
            );
          })
        : lineArray.map((lineStr, idx) => (
            <span key={idx} className="block">
              {lineStr}
            </span>
          ))}
    </Tag>
  );
}
