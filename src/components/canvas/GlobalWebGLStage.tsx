"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { createInfiniteMirrorMaterial } from "./shaders/InfiniteMirrorGridShader";

const NIGHT_PALETTES = [
  { stop: 0.0, accent: "#4A7FC9", base: "#0B0F17" }, // Hero (Azul Istmo)
  { stop: 0.25, accent: "#3B6EB5", base: "#090D15" }, // Telemetry/Tech
  { stop: 0.55, accent: "#2B5E9F", base: "#070B12" }, // Projects
  { stop: 0.8, accent: "#4A7FC9", base: "#0B0F17" }, // Architecture
  { stop: 1.0, accent: "#3B6EB5", base: "#090D15" }, // Contact/Footer
];

const DAY_PALETTES = [
  { stop: 0.0, accent: "#1E4B8F", base: "#F8F9FA" }, // Hero (Azul Istmo)
  { stop: 0.25, accent: "#163A70", base: "#F4F6F9" }, // Telemetry
  { stop: 0.55, accent: "#1E4B8F", base: "#F8F9FA" }, // Projects
  { stop: 0.8, accent: "#163A70", base: "#F4F6F9" }, // Architecture
  { stop: 1.0, accent: "#1E4B8F", base: "#F8F9FA" }, // Contact/Footer
];

export const GlobalWebGLStage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const width = window.innerWidth;
    const height = window.innerHeight;

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
      "Ambient 3D Azul Istmo spatial depth background"
    );
    containerRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = createInfiniteMirrorMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let cachedScrollProgress = 0;
    const updateScrollMetrics = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset;
      cachedScrollProgress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;
    };
    updateScrollMetrics();
    window.addEventListener("scroll", updateScrollMetrics, { passive: true });

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

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

      time += prefersReducedMotion ? 0.003 : 0.008;

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const scrollProgress = cachedScrollProgress;
      const isDark = document.documentElement.classList.contains("theme-dark");
      const activePalette = isDark ? NIGHT_PALETTES : DAY_PALETTES;

      let currentStop = activePalette[0];
      let nextStop = activePalette[1];
      let t = 0;

      for (let i = 0; i < activePalette.length - 1; i++) {
        if (scrollProgress >= activePalette[i].stop && scrollProgress <= activePalette[i + 1].stop) {
          currentStop = activePalette[i];
          nextStop = activePalette[i + 1];
          const range = nextStop.stop - currentStop.stop;
          t = range > 0 ? (scrollProgress - currentStop.stop) / range : 0;
          break;
        }
      }

      const activeAccent = new THREE.Color(currentStop.accent).lerp(new THREE.Color(nextStop.accent), t);
      const activeBase = new THREE.Color(currentStop.base).lerp(new THREE.Color(nextStop.base), t);

      material.uniforms.uTime.value = time;
      material.uniforms.uScroll.value = scrollProgress;
      material.uniforms.uMouse.value.set(mouse.x, mouse.y);
      material.uniforms.uColorAccent.value = activeAccent;
      material.uniforms.uColorBase.value = activeBase;
      material.uniforms.uIsDark.value = isDark ? 1.0 : 0.0;

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
