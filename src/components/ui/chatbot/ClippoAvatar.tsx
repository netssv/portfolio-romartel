"use client";

import React from "react";
import { motion } from "framer-motion";

interface ClippoAvatarProps {
  size?: number;
  className?: string;
  isThinking?: boolean;
}

export function ClippoAvatar({
  size = 48,
  className = "",
  isThinking = false,
}: ClippoAvatarProps) {
  return (
    <motion.div
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

        {/* Left Eyebrow - Arched high in curiosity during thinking */}
        <motion.path
          stroke="#0F172A"
          strokeWidth="3.5"
          strokeLinecap="round"
          animate={
            isThinking
              ? { d: ["M 28 16 Q 38 8 48 18", "M 28 13 Q 38 6 48 16", "M 28 16 Q 38 8 48 18"] }
              : { d: ["M 28 24 Q 38 15 48 22", "M 28 21 Q 38 14 48 20", "M 28 24 Q 38 15 48 22"] }
          }
          transition={{ duration: isThinking ? 2 : 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Right Eyebrow - Furrowed inquisitively during thinking */}
        <motion.path
          stroke="#0F172A"
          strokeWidth="3.5"
          strokeLinecap="round"
          animate={
            isThinking
              ? { d: ["M 64 25 Q 74 20 84 27", "M 64 27 Q 74 22 84 29", "M 64 25 Q 74 20 84 27"] }
              : { d: ["M 64 22 Q 74 15 84 24", "M 64 19 Q 74 12 84 22", "M 64 22 Q 74 15 84 24"] }
          }
          transition={{ duration: isThinking ? 2 : 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Left Eye */}
        <ellipse cx="38" cy="38" rx="11" ry="14" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
        <motion.ellipse
          cx="40"
          cy="38"
          rx="5.5"
          ry="7"
          fill="#0F172A"
          animate={
            isThinking
              ? { cx: [43, 44, 42, 43], cy: [33, 31, 33, 33] }
              : { scaleY: [1, 1, 0.08, 1], cx: [40, 42, 38, 40], cy: [38, 38, 38, 38] }
          }
          transition={{ duration: isThinking ? 2.5 : 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx="37.5" cy="34" r="2.2" fill="#FFFFFF" />
        <circle cx="41.5" cy="41" r="1.1" fill="#FFFFFF" />

        {/* Right Eye */}
        <ellipse cx="72" cy="38" rx="11" ry="14" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
        <motion.ellipse
          cx="74"
          cy="38"
          rx="5.5"
          ry="7"
          fill="#0F172A"
          animate={
            isThinking
              ? { cx: [77, 78, 76, 77], cy: [33, 31, 33, 33] }
              : { scaleY: [1, 1, 0.08, 1], cx: [74, 76, 72, 74], cy: [38, 38, 38, 38] }
          }
          transition={{ duration: isThinking ? 2.5 : 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx="71.5" cy="34" r="2.2" fill="#FFFFFF" />
        <circle cx="75.5" cy="41" r="1.1" fill="#FFFFFF" />
      </svg>
    </motion.div>
  );
}
