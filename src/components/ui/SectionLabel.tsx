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
    <div className={`flex flex-col ${alignClass} mb-16`}>
      <p className="text-[11px] font-body font-medium uppercase tracking-[0.12em] text-text-accent mb-3">
        {eyebrow}
      </p>
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
