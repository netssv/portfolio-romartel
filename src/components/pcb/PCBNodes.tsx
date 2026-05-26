"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { NODES, polarToXY } from "./PCBCircuitLines";

interface PCBNodeProps {
  width: number;
  height: number;
}

const nodeVariant: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: (i: number) => ({
    opacity: 1, scale: 1,
    transition: { delay: 0.4 + i * 0.12, type: "spring" as const, stiffness: 180, damping: 16 },
  }),
};

export const PCBNodes: React.FC<PCBNodeProps> = ({ width, height }) => {
  const cx = width / 2;
  const cy = height / 2;

  return (
    <>
      {NODES.map((node, i) => {
        const pos = polarToXY(cx, cy, node.angle, node.radius);
        const isMetric = node.id.startsWith("m");
        const isSkill = node.id.startsWith("s");

        return (
          <motion.div
            key={node.id}
            custom={i}
            variants={nodeVariant}
            initial="hidden"
            animate="visible"
            className="absolute"
            style={{
              left: pos.x,
              top: pos.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className={`relative flex flex-col items-center justify-center text-center rounded-lg border cursor-default select-none
              ${isMetric
                ? "w-16 h-16 bg-[#061020] border-[#00ff41]/60 shadow-[0_0_12px_#00ff4140]"
                : isSkill
                ? "w-20 h-10 bg-[#061020] border-[#00ff41]/40 shadow-[0_0_8px_#00ff4120]"
                : "w-28 h-12 bg-[#061020] border-[#00ff41]/50 shadow-[0_0_10px_#00ff4130]"
              }`}
            >
              {/* Corner chips */}
              <span className="absolute -top-[3px] -left-[3px] w-[6px] h-[6px] bg-[#00ff41] rounded-[1px]" />
              <span className="absolute -top-[3px] -right-[3px] w-[6px] h-[6px] bg-[#00ff41] rounded-[1px]" />
              <span className="absolute -bottom-[3px] -left-[3px] w-[6px] h-[6px] bg-[#00ff41] rounded-[1px]" />
              <span className="absolute -bottom-[3px] -right-[3px] w-[6px] h-[6px] bg-[#00ff41] rounded-[1px]" />

              {isMetric ? (
                <>
                  <p className="text-lg font-heading font-extrabold text-[#00ff41] leading-none">{node.label}</p>
                  <p className="text-xs font-body text-[#00ff41]/80 mt-0.5 leading-tight">{node.sublabel}</p>
                </>
              ) : (
                <>
                  <p className="text-xs font-body font-bold text-[#00ff41]">{node.label}</p>
                  {node.sublabel && (
                    <p className="text-xs font-body text-[#00ff41]/70">{node.sublabel}</p>
                  )}
                </>
              )}

              {/* Pulse ring on metric nodes */}
              {isMetric && (
                <span className="absolute inset-0 rounded-lg border border-[#00ff41]/30 animate-ping" style={{ animationDuration: "2.5s" }} />
              )}
            </div>
          </motion.div>
        );
      })}
    </>
  );
};
