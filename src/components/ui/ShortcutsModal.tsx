"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Keyboard } from "lucide-react";
import { KeyBadge } from "./KeyBadge";

interface ShortcutItem {
  keyLabel: string;
  description: string;
}

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  shortcuts: ShortcutItem[];
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({
  isOpen,
  onClose,
  shortcuts,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Keyboard Shortcuts"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md bg-bg-surface border border-border-base rounded-xl p-6 shadow-2xl z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
              <div className="flex items-center gap-2">
                <Keyboard className="w-5 h-5 text-accent" />
                <h3 className="text-base font-heading font-semibold text-text-primary">
                  Keyboard Shortcuts
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-1 rounded-md text-text-muted hover:text-text-primary hover:bg-bg-raised transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List */}
            <div className="mt-4 space-y-2.5">
              {shortcuts.map((item, idx) => (
                <div
                  key={`${item.keyLabel}-${idx}`}
                  className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-bg-base/50 transition-colors"
                >
                  <span className="text-sm font-body text-text-secondary">
                    {item.description}
                  </span>
                  <KeyBadge keyLabel={item.keyLabel} variant="accent" />
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-3 border-t border-border-subtle flex items-center justify-between text-xs text-text-muted">
              <span>Press <KeyBadge keyLabel="ESC" variant="subtle" /> to dismiss</span>
              <span>Global Navigation</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
