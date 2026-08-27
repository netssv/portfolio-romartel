"use client";

import React, { useEffect, useRef } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
  ox: number;
  oy: number;
  oz: number;
}

export const TelemetryMeshCanvas: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isVisibleRef = useRef(true);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isDown: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Grid config
    const cols = 18;
    const rows = 18;
    const spacing = 28;
    const points: Point3D[] = [];

    // Generate 3D cylindrical/plane point cloud
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = (i - cols / 2) * spacing;
        const y = (j - rows / 2) * spacing;
        const dist = Math.sqrt(x * x + y * y);
        const z = Math.sin(dist * 0.04) * 35;
        points.push({ x, y, z, ox: x, oy: y, oz: z });
      }
    }

    let animationFrameId: number;
    let angleX = 0.45;
    let angleY = 0.3;
    let time = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      mouseRef.current.targetX = nx * 0.8;
      mouseRef.current.targetY = ny * 0.8;
    };

    const handleMouseDown = () => { mouseRef.current.isDown = true; };
    const handleMouseUp = () => { mouseRef.current.isDown = false; };

    container.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    const fov = 350;

    const render = () => {
      if (isVisibleRef.current) {
        time += 0.02;

        // Smooth mouse damping
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

        angleY += 0.003 + mouseRef.current.x * 0.02;
        angleX = 0.45 + mouseRef.current.y * 0.3;

        const rect = container.getBoundingClientRect();
        const cx = rect.width / 2;
        const cy = rect.height / 2;

        ctx.clearRect(0, 0, rect.width, rect.height);

        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);

        // Project and draw particles
        for (let i = 0; i < points.length; i++) {
          const p = points[i];

          // Dynamic wave displacement
          const wave = Math.sin(time + (p.ox + p.oy) * 0.02) * 12;
          const curZ = p.oz + wave;

          // 3D Rotation
          const x1 = p.ox * cosY - curZ * sinY;
          const z1 = curZ * cosY + p.ox * sinY;
          const y1 = p.oy * cosX - z1 * sinX;
          const z2 = z1 * cosX + p.oy * sinX + 400;

          if (z2 > 10) {
            const scale = fov / z2;
            const px = cx + x1 * scale;
            const py = cy + y1 * scale;
            const size = Math.max(1, 2.2 * scale);
            const alpha = Math.min(0.85, Math.max(0.12, (scale - 0.4) * 1.5));

            // Orange accent highlights on crests
            const isAccent = wave > 6;
            ctx.fillStyle = isAccent
              ? `rgba(255, 149, 0, ${alpha})`
              : `rgba(160, 160, 170, ${alpha * 0.45})`;

            ctx.fillRect(px - size / 2, py - size / 2, size, size);
          }
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
