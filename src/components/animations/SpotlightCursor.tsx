"use client";

import React, { useEffect, useState } from "react";

/**
 * Subtle, restrained architectural spotlight that avoids generic neon/electric glows
 * and replaces heavy spring physics with lightweight passive mouse tracking.
 */
export const SpotlightCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      data-testid="spotlight-cursor"
      className="pointer-events-none fixed inset-0 z-30 hidden lg:block overflow-hidden"
      style={{
        background: `radial-gradient(350px circle at ${pos.x}px ${pos.y}px, rgba(255, 255, 255, 0.02), transparent 70%)`,
      }}
      aria-hidden="true"
    />
  );
};
