import React from "react";

interface SectionLabelProps {
  eyebrow: string;
  heading: string;
  description?: string;
  align?: "left" | "center";
  index?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  eyebrow,
  heading,
  description,
  align = "left",
  index,
}) => {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col ${alignClass} mb-16`}>
      <div className="flex items-center gap-2 mb-3">
        {index && (
          <span className="inline-flex items-center px-1.5 py-0.5 text-[11px] font-mono font-medium text-text-accent bg-accent/10 border border-accent/20 rounded">
            {index}
          </span>
        )}
        <p className="text-xs font-mono font-medium uppercase tracking-[0.14em] text-text-accent">
          {eyebrow}
        </p>
      </div>
      <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-primary tracking-tight leading-tight">
        {heading}
      </h2>
      {description && (
        <p className="mt-4 text-base text-text-secondary leading-relaxed max-w-xl">
          {description}
        </p>
      )}
    </div>
  );
};

