"use client";

import React from "react";

interface ContactQuickPromptsProps {
  prompts: string[];
  onChipClick: (prompt: string, idx: number) => void;
}

export const ContactQuickPrompts: React.FC<ContactQuickPromptsProps> = ({
  prompts,
  onChipClick,
}) => {
  return (
    <div className="pt-3.5 flex flex-wrap gap-1.5">
      {prompts.map((prompt, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => onChipClick(prompt, idx)}
          className="text-left text-[11px] font-body text-text-secondary hover:text-text-primary bg-bg-raised/60 hover:bg-bg-raised border border-border-subtle hover:border-accent/40 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer"
        >
          • {prompt}
        </button>
      ))}
    </div>
  );
};
