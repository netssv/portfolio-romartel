import { LucideIcon } from "lucide-react";

export interface CaseStudyKpi {
  value: string;
  label: string;
}

export interface CaseStudy {
  id: string;
  tag: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  highlight: string;
  challenge: string;
  frictions: string[];
  solution: string;
  kpis: CaseStudyKpi[];
  steps: string[];
  tools: string[];
}
