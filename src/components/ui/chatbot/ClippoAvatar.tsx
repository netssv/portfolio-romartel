"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ClippoEyes } from "./ClippoEyes";

interface ClippoAvatarProps {
  size?: number;
  className?: string;
  isThinking?: boolean;
  trackMouse?: boolean;
}

export function ClippoAvatar({
  size = 48,
  className = "",
  isThinking = false,
  trackMouse = true,
}: ClippoAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!trackMouse || isThinking) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.hypot(dx, dy);

      if (dist > 0) {
        const maxOffset = 3.5;
        const factor = Math.min(dist / 220, 1);
        const angle = Math.atan2(dy, dx);

        setEyeOffset({
          x: Math.cos(angle) * maxOffset * factor,
          y: Math.sin(angle) * maxOffset * factor,
        });
      }

      setIsMouseMoving(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsMouseMoving(false);
      }, 1400);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [trackMouse, isThinking]);

  return (
    <motion.div
      ref={containerRef}
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      animate={
        isThinking
          ? {
              y: [0, -5, -2, -6, 0],
              rotate: [0, -7, -4, -8, 0],
            }
          : {
              y: [0, -4, 0],
              rotate: [0, 2, -2, 0],
            }
      }
      transition={{
        duration: isThinking ? 2.2 : 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg
        viewBox="0 0 120 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-lg overflow-visible"
      >
        <defs>
          <linearGradient id="clippoWireGrad" x1="20" y1="10" x2="100" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="35%" stopColor="#CBD5E1" />
            <stop offset="70%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>
          <filter id="clippoGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Outer Wire Loop */}
        <motion.path
          d="M 60 115 C 32 115 18 96 18 70 L 18 36 C 18 18 34 6 56 6 C 78 6 94 18 94 36 L 94 85 C 94 98 84 106 72 106 C 60 106 50 98 50 85 L 50 42"
          stroke="url(#clippoWireGrad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#clippoGlow)"
        />
        <path
          d="M 60 115 C 32 115 18 96 18 70 L 18 36 C 18 18 34 6 56 6 C 78 6 94 18 94 36 L 94 85 C 94 98 84 106 72 106 C 60 106 50 98 50 85 L 50 42"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />

        {/* Dynamic Inner Wire Loop - Thinking Question/Curl */}
        <motion.path
          stroke="url(#clippoWireGrad)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={
            isThinking
              ? {
                  d: [
                    "M 50 42 C 54 26 76 16 88 24 C 98 32 94 52 82 66 L 78 75",
                    "M 50 42 C 58 20 84 18 92 30 C 98 40 92 58 79 69 L 78 75",
                    "M 50 42 C 54 26 76 16 88 24 C 98 32 94 52 82 66 L 78 75",
                  ],
                }
              : {
                  d: [
                    "M 50 42 C 50 34 56 28 64 28 C 72 28 78 34 78 42 L 78 75",
                    "M 50 42 C 52 30 68 22 78 26 C 88 30 90 42 86 55 L 78 75",
                    "M 50 42 C 50 34 56 28 64 28 C 72 28 78 34 78 42 L 78 75",
                  ],
                }
          }
          transition={{
            duration: isThinking ? 2.5 : 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Eyes and Eyebrows */}
        <ClippoEyes
          isThinking={isThinking}
          isMouseMoving={isMouseMoving}
          eyeOffset={eyeOffset}
        />
      </svg>
    </motion.div>
  );
}
