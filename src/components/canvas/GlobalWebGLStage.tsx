"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { createInfiniteMirrorMaterial } from "./shaders/InfiniteMirrorGridShader";

const PALETTES = [
  { stop: 0.0, accent: "#FF9500", base: "#050505" }, // Hero (Amber)
  { stop: 0.25, accent: "#10B981", base: "#040A07" }, // Telemetry/Tech (Emerald)
  { stop: 0.55, accent: "#0EA5E9", base: "#040810" }, // Projects (Cyber Cyan)
  { stop: 0.8, accent: "#6366F1", base: "#070612" }, // Architecture (Indigo)
  { stop: 1.0, accent: "#FF9500", base: "#050505" }, // Contact/Footer (Amber)
];

export const GlobalWebGLStage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Renderer setup with optimized pixel ratio cap for 60fps performance
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
      precision: "mediump",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.2));
    renderer.domElement.setAttribute("role", "img");
    renderer.domElement.setAttribute(
      "aria-label",
      "Infinite 3D mirror perspective grid and ambient depth lighting"
    );
    containerRef.current.appendChild(renderer.domElement);

    // Full-screen Quad Scene
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = createInfiniteMirrorMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Cached layout metrics to prevent 60fps forced reflows
    let cachedScrollProgress = 0;
    const updateScrollMetrics = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset;
      cachedScrollProgress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;
    };
    updateScrollMetrics();
    window.addEventListener("scroll", updateScrollMetrics, { passive: true });

    // Cursor tracking with spring damping
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Resize handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      updateScrollMetrics();
    };
    window.addEventListener("resize", handleResize, { passive: true });

    let animationFrameId: number;
    let time = 0;
    let isTabVisible = !document.hidden;

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const render = () => {
      if (!isTabVisible) return;

      time += prefersReducedMotion ? 0.005 : 0.015;

      // Mouse damping
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      const scrollProgress = cachedScrollProgress;

      // Color stop interpolation
      let currentStop = PALETTES[0];
      let nextStop = PALETTES[1];
      let t = 0;

      for (let i = 0; i < PALETTES.length - 1; i++) {
        if (scrollProgress >= PALETTES[i].stop && scrollProgress <= PALETTES[i + 1].stop) {
          currentStop = PALETTES[i];
          nextStop = PALETTES[i + 1];
          const range = nextStop.stop - currentStop.stop;
          t = range > 0 ? (scrollProgress - currentStop.stop) / range : 0;
          break;
        }
      }

      const activeAccent = new THREE.Color(currentStop.accent).lerp(new THREE.Color(nextStop.accent), t);
      const activeBase = new THREE.Color(currentStop.base).lerp(new THREE.Color(nextStop.base), t);

      // Update shader uniforms
      material.uniforms.uTime.value = time;
      material.uniforms.uScroll.value = scrollProgress;
      material.uniforms.uMouse.value.set(mouse.x, mouse.y);
      material.uniforms.uColorAccent.value = activeAccent;
      material.uniforms.uColorBase.value = activeBase;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("scroll", updateScrollMetrics);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
