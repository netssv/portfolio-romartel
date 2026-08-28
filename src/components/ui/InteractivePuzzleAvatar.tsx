"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, RefreshCw, MapPin } from "lucide-react";
import { CornerReticle } from "./CornerReticle";

interface PuzzleAvatarProps {
  src: string;
  alt: string;
}

// 3x3 Jigsaw edge definitions: [top, right, bottom, left]
// 0: flat boundary, 1: convex tab (+), -1: concave slot (-)
// Every adjacent pair mathematically satisfies:
// left(col+1) === -right(col) AND top(row+1) === -bottom(row)
const JIGSAW_EDGES: [number, number, number, number][] = [
  [0, 1, 1, 0],    // Piece 0 (row 0, col 0)
  [0, -1, -1, -1], // Piece 1 (row 0, col 1)
  [0, 0, 1, 1],    // Piece 2 (row 0, col 2)
  [-1, 1, -1, 0],  // Piece 3 (row 1, col 0)
  [1, 1, 1, -1],   // Piece 4 (row 1, col 1)
  [-1, 0, -1, -1], // Piece 5 (row 1, col 2)
  [1, -1, 0, 0],   // Piece 6 (row 2, col 0)
  [-1, 1, 0, 1],   // Piece 7 (row 2, col 1)
  [1, 0, 0, -1],   // Piece 8 (row 2, col 2)
];

// Generate exact matching SVG jigsaw paths with 20px padding
function generateJigsawPath(top: number, right: number, bottom: number, left: number): string {
  const p = (x: number, y: number) => `${x},${y}`;
  let path = `M ${p(20, 20)}`;

  // Top Edge (x: 20 -> 120, y: 20)
  if (top === 0) {
    path += ` L ${p(120, 20)}`;
  } else {
    const dir = top === 1 ? -1 : 1; // 1 = tab up (-y), -1 = slot down (+y)
    path += ` L ${p(58, 20)} C ${p(56, 20 + dir * 13)} ${p(62, 20 + dir * 19)} ${p(70, 20 + dir * 19)} C ${p(78, 20 + dir * 19)} ${p(84, 20 + dir * 13)} ${p(82, 20)} L ${p(120, 20)}`;
  }

  // Right Edge (y: 20 -> 120, x: 120)
  if (right === 0) {
    path += ` L ${p(120, 120)}`;
  } else {
    const dir = right === 1 ? 1 : -1; // 1 = tab right (+x), -1 = slot left (-x)
    path += ` L ${p(120, 58)} C ${p(120 + dir * 13, 56)} ${p(120 + dir * 19, 62)} ${p(120 + dir * 19, 70)} C ${p(120 + dir * 19, 78)} ${p(120 + dir * 13, 84)} ${p(120, 82)} L ${p(120, 120)}`;
  }

  // Bottom Edge (x: 120 -> 20, y: 120)
  if (bottom === 0) {
    path += ` L ${p(20, 120)}`;
  } else {
    const dir = bottom === 1 ? 1 : -1; // 1 = tab down (+y), -1 = slot up (-y)
    path += ` L ${p(82, 120)} C ${p(84, 120 + dir * 13)} ${p(78, 120 + dir * 19)} ${p(70, 120 + dir * 19)} C ${p(62, 120 + dir * 19)} ${p(56, 120 + dir * 13)} ${p(58, 120)} L ${p(20, 120)}`;
  }

  // Left Edge (y: 120 -> 20, x: 20)
  if (left === 0) {
    path += ` Z`;
  } else {
    const dir = left === 1 ? -1 : 1; // 1 = tab left (-x), -1 = slot right (+x)
    path += ` L ${p(20, 82)} C ${p(20 + dir * 13, 84)} ${p(20 + dir * 19, 78)} ${p(20 + dir * 19, 70)} C ${p(20 + dir * 19, 62)} ${p(20 + dir * 13, 56)} ${p(20, 58)} Z`;
  }

  return path;
}

export const InteractivePuzzleAvatar: React.FC<PuzzleAvatarProps> = ({ src, alt }) => {
  const [isPuzzleMode, setIsPuzzleMode] = useState(false);
  const [positions, setPositions] = useState<{ x: number; y: number; locked: boolean }[]>([]);
  const [isSolved, setIsSolved] = useState(false);

  const startPuzzle = () => {
    const scatter = JIGSAW_EDGES.map((_, i) => {
      const angle = (i / 9) * 2 * Math.PI + (Math.random() - 0.5) * 0.5;
      const dist = 105 + Math.random() * 35;
      return {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        locked: false,
      };
    });
    setPositions(scatter);
    setIsSolved(false);
    setIsPuzzleMode(true);
  };

  const handleDragEnd = (index: number, info: { offset: { x: number; y: number } }) => {
    const current = positions[index];
    if (!current || current.locked) return;

    const newX = current.x + info.offset.x;
    const newY = current.y + info.offset.y;
    const distToSlot = Math.hypot(newX, newY);
    const newPos = [...positions];

    if (distToSlot < 40) {
      newPos[index] = { x: 0, y: 0, locked: true };
    } else {
      newPos[index] = { x: newX, y: newY, locked: false };
    }

    setPositions(newPos);
    if (newPos.every((p) => p.locked)) {
      setIsSolved(true);
      setTimeout(() => setIsPuzzleMode(false), 1600);
    }
  };

  const restorePhoto = () => {
    setIsPuzzleMode(false);
    setIsSolved(false);
  };

  return (
    <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex flex-col items-center group/avatar mirror-reflect-base select-none">
      {/* ── Strict Running Border Beam (1.5px Laser Line) ── */}
      <div className="relative w-full h-full rounded-[24px] p-[1.5px] overflow-hidden shadow-2xl bg-bg-raised/60">
        <div className="absolute inset-[-150%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_270deg,#FF9500_330deg,#FFFFFF_360deg)] opacity-90 group-hover/avatar:opacity-100 transition-opacity" />

        {/* Inner Screen */}
        <div className="relative w-full h-full rounded-[22.5px] overflow-hidden bg-bg-base">
          <CornerReticle size={10} color="rgba(255, 149, 0, 0.6)" />

          {/* Unified Photo */}
          <div className="relative w-full h-full">
            <img
              src={src}
              alt={alt}
              className={`w-full h-full object-cover filter contrast-[1.08] brightness-105 transition-opacity duration-300 ${
                isPuzzleMode ? "opacity-20 blur-[2px]" : "opacity-100"
              }`}
              loading="eager"
            />

            {!isPuzzleMode && (
              <div className="absolute inset-0 bg-black/35 opacity-0 group-hover/avatar:opacity-100 transition-all duration-300 flex items-center justify-center p-4">
                <button
                  onClick={startPuzzle}
                  className="px-4 py-2.5 rounded-xl bg-accent text-black font-body font-bold text-xs shadow-[0_0_25px_rgba(255,149,0,0.8)] hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles size={14} className="fill-current" />
                  <span>Scatter Jigsaw Puzzle</span>
                </button>
              </div>
            )}
          </div>

          {/* Bottom HUD Bar */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-xl bg-bg-surface/85 backdrop-blur-md border border-border-subtle shadow-xl text-[11px] font-mono text-text-secondary z-50">
            <div className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${isPuzzleMode ? "bg-accent animate-ping" : "bg-emerald-text animate-pulse"}`} />
              <span className="font-semibold text-text-primary">
                {isPuzzleMode ? (isSolved ? "Puzzle Completed!" : "Interactive Jigsaw") : "Remote / Global"}
              </span>
            </div>

            {isPuzzleMode ? (
              <button
                onClick={restorePhoto}
                className="flex items-center gap-1 text-accent hover:text-text-primary transition-colors cursor-pointer text-[10px]"
              >
                <RefreshCw size={11} />
                <span>Restore</span>
              </button>
            ) : (
              <div className="flex items-center gap-1 text-text-muted">
                <MapPin size={11} className="text-accent" />
                <span>San Salvador</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Interlocking Jigsaw Pieces Overlay ── */}
      {isPuzzleMode && (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-40">
          {JIGSAW_EDGES.map(([top, right, bottom, left], index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            const pos = positions[index] || { x: 0, y: 0, locked: false };
            const pathData = generateJigsawPath(top, right, bottom, left);

            return (
              <motion.div
                key={index}
                drag={!pos.locked}
                dragMomentum={false}
                onDragEnd={(_, info) => handleDragEnd(index, info)}
                animate={{ x: pos.x, y: pos.y, scale: pos.locked ? 1 : 1.05 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className={`absolute pointer-events-auto cursor-grab active:cursor-grabbing ${
                  pos.locked ? "pointer-events-none z-10" : "hover:z-50"
                }`}
                style={{
                  width: "33.333%",
                  height: "33.333%",
                  left: `${col * 33.333}%`,
                  top: `${row * 33.333}%`,
                }}
              >
                <svg
                  viewBox="0 0 140 140"
                  className="w-[140%] h-[140%] -top-[20%] -left-[20%] absolute overflow-visible filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.95)]"
                >
                  <defs>
                    <clipPath id={`jigsaw-clip-${index}`}>
                      <path d={pathData} />
                    </clipPath>
                  </defs>
                  <image
                    href={src}
                    width="300"
                    height="300"
                    x={20 - col * 100}
                    y={20 - row * 100}
                    clipPath={`url(#jigsaw-clip-${index})`}
                    preserveAspectRatio="none"
                  />
                  <path
                    d={pathData}
                    fill="none"
                    stroke={pos.locked ? "#10B981" : "rgba(255,149,0,0.85)"}
                    strokeWidth="1.5"
                  />
                </svg>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
