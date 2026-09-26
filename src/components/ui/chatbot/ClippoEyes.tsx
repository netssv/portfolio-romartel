"use client";

import React from "react";
import { motion } from "framer-motion";

interface ClippoEyesProps {
  isThinking: boolean;
  isMouseMoving: boolean;
  eyeOffset: { x: number; y: number };
}

export const ClippoEyes: React.FC<ClippoEyesProps> = ({
  isThinking,
  isMouseMoving,
  eyeOffset,
}) => {
  return (
    <>
      {/* Left Eyebrow */}
      <motion.path
        d="M 28 24 Q 38 15 48 22"
        stroke="#0F172A"
        strokeWidth="3.5"
        strokeLinecap="round"
        animate={
          isThinking
            ? { d: ["M 28 16 Q 38 8 48 18", "M 28 13 Q 38 6 48 16", "M 28 16 Q 38 8 48 18"] }
            : isMouseMoving
            ? { d: ["M 28 22 Q 38 13 48 20"] }
            : { d: ["M 28 24 Q 38 15 48 22", "M 28 21 Q 38 14 48 20", "M 28 24 Q 38 15 48 22"] }
        }
        transition={{ duration: isThinking ? 2 : 3, repeat: isMouseMoving ? 0 : Infinity, ease: "easeInOut" }}
      />

      {/* Right Eyebrow */}
      <motion.path
        d="M 64 22 Q 74 15 84 24"
        stroke="#0F172A"
        strokeWidth="3.5"
        strokeLinecap="round"
        animate={
          isThinking
            ? { d: ["M 64 25 Q 74 20 84 27", "M 64 27 Q 74 22 84 29", "M 64 25 Q 74 20 84 27"] }
            : isMouseMoving
            ? { d: ["M 64 20 Q 74 13 84 22"] }
            : { d: ["M 64 22 Q 74 15 84 24", "M 64 19 Q 74 12 84 22", "M 64 22 Q 74 15 84 24"] }
        }
        transition={{ duration: isThinking ? 2 : 3, repeat: isMouseMoving ? 0 : Infinity, ease: "easeInOut" }}
      />

      {/* Left Eye */}
      <ellipse cx="38" cy="38" rx="11" ry="14" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
      <motion.ellipse
        cx={38}
        cy={38}
        rx="5.5"
        ry="7"
        initial={{ cx: 38, cy: 38 }}
        fill="#0F172A"
        animate={
          isThinking
            ? { cx: [43, 44, 42, 43], cy: [33, 31, 33, 33], scaleY: 1 }
            : isMouseMoving
            ? { cx: 38 + eyeOffset.x, cy: 38 + eyeOffset.y, scaleY: 1 }
            : { scaleY: [1, 1, 0.08, 1], cx: [38, 41, 35, 38], cy: [38, 37, 39, 38] }
        }
        transition={
          isThinking
            ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
            : isMouseMoving
            ? { duration: 0.12, ease: "easeOut" }
            : { duration: 3.8, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <motion.circle
        cx={36}
        cy={34}
        r="2.2"
        initial={{ cx: 36, cy: 34 }}
        fill="#FFFFFF"
        animate={
          isThinking
            ? { cx: 40.5, cy: 30 }
            : isMouseMoving
            ? { cx: 36 + eyeOffset.x * 0.7, cy: 34 + eyeOffset.y * 0.7 }
            : { cx: 36, cy: 34 }
        }
        transition={{ duration: 0.15, ease: "easeOut" }}
      />
      <motion.circle
        cx={40}
        cy={41}
        r="1.1"
        initial={{ cx: 40, cy: 41 }}
        fill="#FFFFFF"
        animate={
          isThinking
            ? { cx: 44.5, cy: 36 }
            : isMouseMoving
            ? { cx: 40 + eyeOffset.x * 0.7, cy: 41 + eyeOffset.y * 0.7 }
            : { cx: 40, cy: 41 }
        }
        transition={{ duration: 0.15, ease: "easeOut" }}
      />

      {/* Right Eye */}
      <ellipse cx="72" cy="38" rx="11" ry="14" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
      <motion.ellipse
        cx={72}
        cy={38}
        rx="5.5"
        ry="7"
        initial={{ cx: 72, cy: 38 }}
        fill="#0F172A"
        animate={
          isThinking
            ? { cx: [77, 78, 76, 77], cy: [33, 31, 33, 33], scaleY: 1 }
            : isMouseMoving
            ? { cx: 72 + eyeOffset.x, cy: 38 + eyeOffset.y, scaleY: 1 }
            : { scaleY: [1, 1, 0.08, 1], cx: [72, 75, 69, 72], cy: [38, 37, 39, 38] }
        }
        transition={
          isThinking
            ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
            : isMouseMoving
            ? { duration: 0.12, ease: "easeOut" }
            : { duration: 3.8, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <motion.circle
        cx={70}
        cy={34}
        r="2.2"
        initial={{ cx: 70, cy: 34 }}
        fill="#FFFFFF"
        animate={
          isThinking
            ? { cx: 74.5, cy: 30 }
            : isMouseMoving
            ? { cx: 70 + eyeOffset.x * 0.7, cy: 34 + eyeOffset.y * 0.7 }
            : { cx: 70, cy: 34 }
        }
        transition={{ duration: 0.15, ease: "easeOut" }}
      />
      <motion.circle
        cx={74}
        cy={41}
        r="1.1"
        initial={{ cx: 74, cy: 41 }}
        fill="#FFFFFF"
        animate={
          isThinking
            ? { cx: 78.5, cy: 36 }
            : isMouseMoving
            ? { cx: 74 + eyeOffset.x * 0.7, cy: 41 + eyeOffset.y * 0.7 }
            : { cx: 74, cy: 41 }
        }
        transition={{ duration: 0.15, ease: "easeOut" }}
      />
    </>
  );
};
