"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { NODES, polarToXY } from "./PCBCircuitLines";

interface PCBNodesProps {
  width: number;
  height: number;
  radius: number;
}

const nodeVariant: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.5 + i * 0.1,
      type: "spring" as const,
      stiffness: 200,
      damping: 18,
    },
  }),
};

export const PCBNodes: React.FC<PCBNodesProps> = ({ width, height, radius }) => {
  const cx = width / 2;
  const cy = height / 2;

  return (
    <>
      {NODES.map((node, i) => {
        const pos = polarToXY(cx, cy, node.angle, radius);
        const isMetric = node.id.startsWith("m");
        const isSkill  = node.id.startsWith("s");

        return (
          <motion.div
            key={node.id}
            custom={i}
            variants={nodeVariant}
            initial="hidden"
            animate="visible"
            className="absolute"
            style={{ left: pos.x, top: pos.y, transform: "translate(-50%, -50%)" }}
            whileHover={{ scale: 1.12, transition: { type: "spring", stiffness: 400 } }}
          >
            <div
              className={`
                relative flex flex-col items-center justify-center text-center
                rounded-lg border cursor-default select-none
                transition-shadow duration-300 hover:shadow-[0_0_18px_#00ff4180]
                ${isMetric
                  ? "bg-[#061020] border-[#00ff41]/60 shadow-[0_0_10px_#00ff4133]"
                  : isSkill
                  ? "bg-[#061020] border-[#00ff41]/40 shadow-[0_0_7px_#00ff4120]"
                  : "bg-[#061020] border-[#00ff41]/50 shadow-[0_0_8px_#00ff4128]"
                }
              `}
              style={{
                width:  isMetric ? "clamp(52px,9vw,64px)"  : isSkill ? "clamp(60px,11vw,80px)"  : "clamp(76px,14vw,112px)",
                height: isMetric ? "clamp(52px,9vw,64px)"  : isSkill ? "clamp(28px,5vw,40px)"   : "clamp(32px,5vw,44px)",
              }}
            >
              {/* Corner pads */}
              {["-top-[3px] -left-[3px]", "-top-[3px] -right-[3px]",
                "-bottom-[3px] -left-[3px]", "-bottom-[3px] -right-[3px]"].map((pos) => (
                <span key={pos} className={`absolute ${pos} w-[5px] h-[5px] bg-[#00ff41] rounded-[1px]`} />
              ))}

              {isMetric ? (
                <>
                  <p className="text-base font-heading font-extrabold text-[#00ff41] leading-none">
                    {node.label}
                  </p>
                  <p className="text-[9px] font-body text-[#00ff41]/75 mt-0.5 leading-tight px-1">
                    {node.sublabel}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-[10px] font-body font-bold text-[#00ff41] leading-tight px-1">
                    {node.label}
                  </p>
                  {node.sublabel && (
                    <p className="text-[9px] font-body text-[#00ff41]/65 leading-tight px-1">
                      {node.sublabel}
                    </p>
                  )}
                </>
              )}

              {/* Pulse ring on metric nodes */}
              {isMetric && (
                <span
                  className="absolute inset-0 rounded-lg border border-[#00ff41]/25 animate-ping"
                  style={{ animationDuration: "2.8s" }}
                />
              )}
            </div>
          </motion.div>
        );
      })}
    </>
  );
};
