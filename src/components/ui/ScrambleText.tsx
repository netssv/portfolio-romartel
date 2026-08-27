"use client";

import React, { useState, useRef, useCallback } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleChars?: string;
  speed?: number; // interval in ms between frames
  triggerOnHover?: boolean;
}

const DEFAULT_CHARS = "0123456789ABCDEF!@#$%&*+=-_~";

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = "",
  scrambleChars = DEFAULT_CHARS,
  speed = 30,
  triggerOnHover = true,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startScramble = useCallback(() => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return scrambleChars[
              Math.floor(Math.random() * scrambleChars.length)
            ];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / 3;
    }, speed);
  }, [text, scrambleChars, speed]);

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      startScramble();
    }
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(text);
  };

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block select-none font-mono ${className}`}
      aria-label={text}
    >
      {displayText}
    </span>
  );
};
