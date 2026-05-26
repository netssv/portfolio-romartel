"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const SpotlightCursor: React.FC = () => {
  // Motion values avoid React state re-renders for smooth 120Hz tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Easing spring configuration for heavy/expensive organic movement
  const springConfig = { damping: 35, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 175); // offset by half width (350/2)
      mouseY.set(e.clientY - 175);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 hidden lg:block"
      style={{
        // Use transform3d for hardware GPU acceleration
        x: cursorX,
        y: cursorY,
        width: 350,
        height: 350,
      }}
    >
      <div 
        className="w-full h-full rounded-full opacity-[0.08]"
        style={{
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
};
