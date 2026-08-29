import {
  Sparkles,
  Terminal,
  Mail,
  Activity,
  Award,
  Cpu,
  Workflow,
  CheckCircle2,
  FileText,
  Search,
  ExternalLink,
  LucideIcon,
} from "lucide-react";
import { SectionId } from "./useActiveSection";

export interface SuggestionItem {
  text: string;
  icon: LucideIcon;
}

export interface SectionChatbotConfig {
  sectionName: string;
  speechPhrases: string[];
  suggestions: SuggestionItem[];
}

export const SECTION_CHATBOT_CONFIG: Record<SectionId, SectionChatbotConfig> = {
  top: {
    sectionName: "Overview & Bio",
    speechPhrases: [
      "It looks like you're exploring Rodrigo's portfolio!",
      "Ask me about Rodrigo's technical automation & CRM background.",
      "Want to check live Bitcoin mempool telemetry?",
      "Curious about Rodrigo's open-source projects?",
    ],
    suggestions: [
      { text: "How does Rodrigo approach CRM & automation?", icon: Sparkles },
      { text: "What verified certifications does he hold?", icon: Award },
      { text: "Send an email to Rodrigo", icon: Mail },
    ],
  },
  projects: {
    sectionName: "Featured Projects",
    speechPhrases: [
      "Curious about the real-time Bitcoin telemetry or serverless scrapers?",
      "Want to know more about the FIFA 2026 AI Monte Carlo lab or Rebusca?",
      "Ask me about the architecture behind Rodrigo's open-source projects!",
    ],
    suggestions: [
      { text: "Tell me about the HODL Watcher BTC pipeline", icon: Activity },
      { text: "How does the FIFA 2026 AI simulator work?", icon: Sparkles },
      { text: "What is the WhatHappened Chrome extension?", icon: Terminal },
    ],
  },
  experience: {
    sectionName: "Career & Operations",
    speechPhrases: [
      "Ask me about Rodrigo's web hosting operations & CRM experience.",
      "Want to know about his track record in server management and client workflows?",
      "Curious about how he handles technical onboarding and systems audits?",
    ],
    suggestions: [
      { text: "What were his hosting operations responsibilities?", icon: Terminal },
      { text: "How does he manage CRM pipelines & onboarding?", icon: Sparkles },
      { text: "Send an inquiry to Rodrigo", icon: Mail },
    ],
  },
  skills: {
    sectionName: "Skills & Credentials",
    speechPhrases: [
      "Exploring the skills matrix? Ask me about his automation & QA tools.",
      "Curious about his 103 verified credentials across 6 domains?",
      "Ask me about his Make.com, Zapier, Python, and Bash toolchains.",
    ],
    suggestions: [
      { text: "What are his 103 verified credentials?", icon: Award },
      { text: "Which automation platforms does he use?", icon: Workflow },
      { text: "How does he enforce pre-delivery QA checklists?", icon: CheckCircle2 },
    ],
  },
  architecture: {
    sectionName: "Systems Architecture",
    speechPhrases: [
      "Ask me how this portfolio's telemetry & resilient fallbacks are built!",
      "Curious about webhook ingestion and automated data pipelines?",
      "Want to know about the serverless architectures Rodrigo designs?",
    ],
    suggestions: [
      { text: "Explain the edge & fallback architecture", icon: Cpu },
      { text: "How are webhook automations designed?", icon: Workflow },
      { text: "HODL Watcher serverless architecture", icon: Activity },
    ],
  },
  "case-studies": {
    sectionName: "Case Studies & Audits",
    speechPhrases: [
      "Want an executive summary of Rodrigo's enterprise audit case studies?",
      "Ask me how technical audits helped eliminate workflow bottlenecks.",
      "Curious how runbooks and QA checklists prevent client handoff errors?",
    ],
    suggestions: [
      { text: "Summarize key case study outcomes", icon: FileText },
      { text: "What failure points are found in audits?", icon: Search },
      { text: "Discuss an audit with Rodrigo", icon: Mail },
    ],
  },
  philosophy: {
    sectionName: "Strategic Philosophy",
    speechPhrases: [
      "Engineering rigor behind practical growth and automation.",
      "Ask me about Rodrigo's focus on practical tooling and data integrity.",
    ],
    suggestions: [
      { text: "Philosophy of engineering rigor in marketing", icon: Cpu },
      { text: "How does telemetry drive growth decisions?", icon: Activity },
      { text: "Reach out to Rodrigo", icon: Mail },
    ],
  },
  contact: {
    sectionName: "Contact & Collaboration",
    speechPhrases: [
      "Want me to help draft and send a message directly to Rodrigo?",
      "I can deliver your inquiry right to his inbox via Resend!",
      "Need his GitHub or LinkedIn contact links?",
    ],
    suggestions: [
      { text: "I want to send an email to Rodrigo", icon: Mail },
      { text: "What projects does Rodrigo take on?", icon: Sparkles },
      { text: "Where are his GitHub & LinkedIn profiles?", icon: ExternalLink },
    ],
  },
};
