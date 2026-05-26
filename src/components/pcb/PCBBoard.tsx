"use client";

import React, { useRef, useState, useEffect } from "react";
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
  const [size, setSize] = useState({ w: 800, h: 600 });

  useEffect(() => {
    const update = () => {
      if (boardRef.current) {
        setSize({ w: boardRef.current.offsetWidth, h: boardRef.current.offsetHeight });
      }
    };
    update();
    const ro = new ResizeObserver(update);
    if (boardRef.current) ro.observe(boardRef.current);
    return () => ro.disconnect();
  }, []);

  const cx = size.w / 2;
  const cy = size.h / 2;

  return (
    <div ref={boardRef} className="relative w-full h-full">
      {/* Circuit lines layer */}
      <PCBCircuitLines width={size.w} height={size.h} />

      {/* Node chips layer */}
      <div className="absolute inset-0">
        <PCBNodes width={size.w} height={size.h} />
      </div>

      {/* Center hub — photo */}
      <div
        className="absolute"
        style={{ left: cx, top: cy, transform: "translate(-50%, -50%)" }}
      >
        {/* Outer rotating ring */}
        <div className="absolute inset-0 -m-8 rounded-full border border-[#00ff41]/20 animate-spin"
          style={{ animationDuration: "20s", width: "calc(100% + 64px)", height: "calc(100% + 64px)", top: -32, left: -32 }}>
          {[0, 90, 180, 270].map((deg) => (
            <span key={deg} className="absolute w-2 h-2 rounded-full bg-[#00ff41]"
              style={{ top: "50%", left: "50%", transformOrigin: "0 0",
                transform: `rotate(${deg}deg) translateX(calc(50% + 24px)) translateY(-50%)` }} />
          ))}
        </div>

        {/* Second ring — counter-rotating */}
        <div className="absolute rounded-full border border-dashed border-[#00ff41]/15 animate-spin"
          style={{ animationDuration: "35s", animationDirection: "reverse",
            width: "calc(100% + 100px)", height: "calc(100% + 100px)", top: -50, left: -50 }} />

        {/* Photo frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7, type: "spring", stiffness: 100 }}
          className="relative"
        >
          {/* Chip corner markings */}
          {["-top-2 -left-2", "-top-2 -right-2", "-bottom-2 -left-2", "-bottom-2 -right-2"].map((pos) => (
            <span key={pos} className={`absolute ${pos} w-4 h-4 border-[#00ff41] z-10`}
              style={{ borderWidth: "2px 0 0 2px", ...(pos.includes("right") ? { borderWidth: "2px 2px 0 0" } : {}),
                ...(pos.includes("bottom") ? { borderWidth: pos.includes("right") ? "0 2px 2px 0" : "0 0 2px 2px" } : {}) }} />
          ))}

          {/* Glow ring */}
          <div className="absolute inset-0 rounded-2xl shadow-[0_0_40px_rgba(0,255,65,0.2),0_0_80px_rgba(0,255,65,0.08)]" />

          <Image
            src={avatarSrc}
            alt={avatarAlt}
            width={224}
            height={224}
            className="w-48 h-48 lg:w-56 lg:h-56 object-cover rounded-xl border border-[#00ff41]/30"
            priority
          />

          {/* Chip label below photo */}
          <div className="absolute -bottom-8 left-0 right-0 text-center">
            <span className="text-xs font-mono text-[#00ff41]/80 tracking-widest font-bold">IC-RM-01 · 5Y</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
