"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { PCBCircuitLines } from "./PCBCircuitLines";
import { PCBNodes } from "./PCBNodes";

interface PCBBoardProps {
  avatarSrc: string;
  avatarAlt: string;
}

export const PCBBoard: React.FC<PCBBoardProps> = ({ avatarSrc, avatarAlt }) => {
  const boardRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  const update = useCallback(() => {
    if (boardRef.current) {
      const w = boardRef.current.offsetWidth;
      const h = boardRef.current.offsetHeight;
      if (w > 0 && h > 0) setSize({ w, h });
    }
  }, []);

  useEffect(() => {
    update();
    const ro = new ResizeObserver(update);
    if (boardRef.current) ro.observe(boardRef.current);
    return () => ro.disconnect();
  }, [update]);

  // Don't render SVG until we have real dimensions
  const ready = size.w > 0 && size.h > 0;

  const cx = size.w / 2;
  const cy = size.h / 2;

  // Dynamically compute orbit radius so nodes stay inside canvas
  const radius = Math.min(size.w, size.h) * 0.41;

  // Avatar size scales with radius
  const avatarPx = Math.max(100, Math.min(196, radius * 0.58));

  return (
    <div ref={boardRef} className="relative w-full h-full">
      {/* Circuit lines + nodes — only once we have real dimensions */}
      {ready && (
        <>
          <PCBCircuitLines width={size.w} height={size.h} radius={radius} />
          <div className="absolute inset-0">
            <PCBNodes width={size.w} height={size.h} radius={radius} />
          </div>
        </>
      )}

      {/* Center hub — photo (only when dimensions are known) */}
      {ready && (
      <div className="absolute" style={{ left: cx, top: cy, transform: "translate(-50%, -50%)" }}>

        {/* Outer rotating ring */}
        <motion.div
          className="absolute rounded-full border border-[#00ff41]/20"
          style={{
            width: avatarPx + 64,
            height: avatarPx + 64,
            top: -(avatarPx + 64) / 2,
            left: -(avatarPx + 64) / 2,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {[0, 90, 180, 270].map((deg) => (
            <span
              key={deg}
              className="absolute w-2 h-2 rounded-full bg-[#00ff41]"
              style={{
                top: "50%",
                left: "50%",
                transformOrigin: "0 0",
                transform: `rotate(${deg}deg) translateX(calc(50% + ${(avatarPx + 64) / 2 - 8}px)) translateY(-50%)`,
              }}
            />
          ))}
        </motion.div>

        {/* Inner counter-rotating dashed ring */}
        <motion.div
          className="absolute rounded-full border border-dashed border-[#00ff41]/12"
          style={{
            width: avatarPx + 100,
            height: avatarPx + 100,
            top: -(avatarPx + 100) / 2,
            left: -(avatarPx + 100) / 2,
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        />

        {/* Photo frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.7, type: "spring", stiffness: 110 }}
          className="relative"
        >
          {/* Corner bracket markings */}
          {[
            { pos: "-top-2 -left-2",   border: "2px 0 0 2px" },
            { pos: "-top-2 -right-2",  border: "2px 2px 0 0" },
            { pos: "-bottom-2 -left-2",  border: "0 0 2px 2px" },
            { pos: "-bottom-2 -right-2", border: "0 2px 2px 0" },
          ].map(({ pos, border }) => (
            <span
              key={pos}
              className={`absolute ${pos} w-4 h-4 border-[#00ff41] z-10`}
              style={{ borderWidth: border }}
            />
          ))}

          {/* Glow ring */}
          <div className="absolute inset-0 rounded-2xl shadow-[0_0_40px_rgba(0,255,65,0.22),0_0_80px_rgba(0,255,65,0.08)]" />

          <Image
            src={avatarSrc}
            alt={avatarAlt}
            width={196}
            height={196}
            style={{ width: avatarPx, height: avatarPx }}
            className="object-cover rounded-xl border border-[#00ff41]/30"
            priority
          />

          {/* Chip label */}
          <div className="absolute -bottom-8 left-0 right-0 text-center">
            <span className="text-[10px] font-mono text-[#00ff41]/75 tracking-widest font-bold">
              IC-RM-01 · 5Y
            </span>
          </div>
        </motion.div>
      </div>
      )}
    </div>
  );
};
