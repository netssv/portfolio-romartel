"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { splitIntoBalancedPhrases, renderFormattedPhrase } from "@/src/lib/phraseSplitter";

interface PhraseProps {
  phrase: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  range: [number, number];
  isLast: boolean;
  isMobile: boolean;
}

function IlluminatedPhrase({
  phrase,
  index,
  total,
  scrollYProgress,
  range,
  isLast,
  isMobile,
}: PhraseProps) {
  const [pStart, pEnd] = range;
  const pSpan = pEnd - pStart;
  const start = pStart + (index / Math.max(1, total)) * pSpan * 0.88;
  const end = Math.min(pEnd, start + (1.3 / Math.max(1, total)) * pSpan);

  // Pure functional interpolation (Rule 21: WAAPI-safe) with calibrated WCAG contrast
  const opacity = useTransform(scrollYProgress, (s) => {
    if (s <= start) return 0.52;
    if (s >= end) return 1.0;
    const progress = (s - start) / (end - start);
    return 0.52 + progress * 0.48;
  });

  const textShadow = useTransform(scrollYProgress, (s) => {
    if (isMobile || s <= start || s >= end) return "none";
    const progress = (s - start) / (end - start);
    const intensity = Math.sin(progress * Math.PI);
    if (intensity < 0.08) return "none";
    return `0 0 ${Math.round(intensity * 12)}px rgba(147, 197, 253, ${Number((intensity * 0.45).toFixed(2))})`;
  });

  const color = useTransform(scrollYProgress, (s) => {
    if (s <= start) return "var(--color-text-secondary)";
    return "var(--color-text-primary)";
  });

  return (
    <motion.span
      style={{
        opacity,
        color,
        textShadow,
        willChange: "opacity, color",
      }}
      className="inline transition-colors duration-150"
    >
      {renderFormattedPhrase(phrase)}
      {isLast ? "" : " "}
    </motion.span>
  );
}

interface ScrollIlluminatedParagraphProps {
  text: string;
  index?: number;
  className?: string;
  scrollYProgress?: MotionValue<number>;
  range?: [number, number];
}

export const ScrollIlluminatedParagraph: React.FC<ScrollIlluminatedParagraphProps> = ({
  text,
  className = "",
  scrollYProgress: externalProgress,
  range = [0, 1],
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  // Local fallback scroll tracking if no external pinned progress is provided
  const { scrollYProgress: localProgress } = useScroll({
    target: paragraphRef,
    offset: ["start 88%", "start 42%"],
  });

  const activeProgress = externalProgress || localProgress;

  useEffect(() => {
    setIsMounted(true);
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const phrases = useMemo(() => splitIntoBalancedPhrases(text), [text]);

  // SSR and initial hydration fallback for zero-delta DOM matching & SEO (Rule 15)
  if (!isMounted) {
    return (
      <p ref={paragraphRef} className={`font-normal leading-relaxed text-text-secondary ${className}`}>
        {renderFormattedPhrase(text)}
      </p>
    );
  }

  return (
    <p
      ref={paragraphRef}
      className={`font-normal leading-relaxed text-text-secondary selection:bg-accent/20 ${className}`}
    >
      {phrases.map((phrase, idx) => (
        <IlluminatedPhrase
          key={idx}
          phrase={phrase}
          index={idx}
          total={phrases.length}
          scrollYProgress={activeProgress}
          range={range}
          isLast={idx === phrases.length - 1}
          isMobile={isMobile}
        />
      ))}
    </p>
  );
};
