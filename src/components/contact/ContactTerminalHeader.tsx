"use client";

import React from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { ClippoAvatar } from "@/src/components/ui/chatbot/ClippoAvatar";

interface ContactTerminalHeaderProps {
  isLoading: boolean;
  status: string;
  badge: string;
  onReset: () => void;
  resetTitle: string;
}

export const ContactTerminalHeader: React.FC<ContactTerminalHeaderProps> = ({
  isLoading,
  status,
  badge,
  onReset,
  resetTitle,
}) => {
  return (
    <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-border-subtle">
      <div className="flex items-center gap-3">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 18 }}
          className="w-8 h-8 flex items-center justify-center shrink-0 cursor-pointer"
          whileHover={{ scale: 1.15, rotate: 6 }}
          whileTap={{ scale: 0.95 }}
        >
          <ClippoAvatar size={32} isThinking={isLoading} />
        </motion.div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-mono text-xs font-bold text-emerald-500 tracking-wider">
            {status}
          </span>
          <span className="text-text-muted text-xs font-mono">·</span>
          <span className="text-xs font-mono font-medium text-text-primary">
            {badge}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="text-text-muted hover:text-text-primary p-1.5 rounded-lg hover:bg-bg-raised transition-colors cursor-pointer"
        title={resetTitle}
      >
        <RotateCcw size={13} />
      </button>
    </div>
  );
};
