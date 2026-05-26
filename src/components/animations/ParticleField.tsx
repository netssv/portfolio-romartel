"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  speedMultiplier: number;
}

export const ParticleField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Particle[] = [];
    const particleCount = 24;

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      canvas.width = rect?.width || 400;
      canvas.height = rect?.height || 400;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initial particle generation
    for (let i = 0; i < particleCount; i++) {
      const alpha = Math.random() * 0.4 + 0.1;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        radius: Math.random() * 1.5 + 0.5,
        alpha,
        baseAlpha: alpha,
        speedMultiplier: Math.random() * 0.5 + 0.5,
      });
    }

    let pulseTime = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pulseTime += 0.005;

      particles.forEach((p) => {
        // Move particle
        p.x += p.vx * p.speedMultiplier;
        p.y += p.vy * p.speedMultiplier;

        // Wrap around boundaries
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Add subtle natural brightness pulsing
        const pulse = Math.sin(pulseTime + p.x * 0.01) * 0.05;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 149, 0, ${Math.max(0.02, Math.min(p.baseAlpha + pulse, 0.65))})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full"
      aria-hidden="true"
    />
  );
};
