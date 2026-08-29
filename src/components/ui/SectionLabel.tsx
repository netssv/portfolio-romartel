import React from "react";

interface SectionLabelProps {
  eyebrow: string;
  heading: string;
  description?: string;
  align?: "left" | "center";
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  eyebrow,
  heading,
  description,
  align = "left",
}) => {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col ${alignClass} mb-12 sm:mb-16`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
        <p className="text-xs font-body font-semibold uppercase tracking-[0.18em] text-accent">
          {eyebrow}
        </p>
      </div>
      <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-primary tracking-tight leading-tight">
        {heading}
      </h2>
      {description && (
        <p className="mt-3.5 text-sm sm:text-base font-body text-text-secondary leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
};
