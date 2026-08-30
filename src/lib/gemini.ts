import dns from "node:dns";
import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";
import siteData from "@/src/data/siteData.json";
import {
  PROJECT_ORIGIN_STORIES,
  CASE_STUDIES_KNOWLEDGE,
  CLIPPO_INTERNALS_KNOWLEDGE,
} from "@/src/lib/chatbot-knowledge";

if (typeof dns.setDefaultResultOrder === "function") {
  dns.setDefaultResultOrder("ipv4first");
}

function getApiKey(): string {
  const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!key) throw new Error("Gemini API key is not configured in .env.local");
  return key;
}

let cachedClient: GoogleGenAI | null = null;
export function getGeminiClient(): GoogleGenAI {
  if (!cachedClient) cachedClient = new GoogleGenAI({ apiKey: getApiKey() });
  return cachedClient;
}


export const CHATBOT_TOOL_DECLARATIONS: FunctionDeclaration[] = [
  {
    name: "send_contact_email",
    description: "Sends a message to Rodrigo Martel via Resend. STRICT REQUIREMENT: Only invoke after visitor directly provides name, real email, and message. Never hallucinate or assume email.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING, description: "Name of the sender" },
        email: { type: Type.STRING, description: "Valid email address of the visitor to reply to" },
        purpose: { type: Type.STRING, description: "Purpose of contact" },
        message: { type: Type.STRING, description: "Message content" },
      },
      required: ["name", "email", "message"],
    },
  },
  {
    name: "get_btc_telemetry",
    description: "Fetches real-time status and telemetry from Rodrigo's HODL Watcher serverless pipeline.",
    parameters: { type: Type.OBJECT, properties: {} },
  },
  {
    name: "get_site_json",
    description: "Exports raw or structured JSON data of the portfolio website.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        section: {
          type: Type.STRING,
          description: "Section to export: 'all', 'projects', 'experience', 'skills', 'profile'",
        },
      },
    },
  },
  {
    name: "navigate_to_section",
    description: "Smoothly scrolls the visitor's page to a section ('top', 'telemetry', 'stack', 'projects', 'metrics', 'experience', 'skills', 'architecture', 'case-studies', 'philosophy', 'contact').",
    parameters: {
      type: Type.OBJECT,
      properties: {
        section: { type: Type.STRING, description: "Target section ID" },
      },
      required: ["section"],
    },
  },
  {
    name: "filter_projects",
    description: "Filters the projects gallery by category or tech tag and scrolls to the projects section.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        category: { type: Type.STRING, description: "Category to filter by" },
        tag: { type: Type.STRING, description: "Tech tag to filter by, e.g. 'Python', 'FastAPI'" },
      },
    },
  },
  {
    name: "set_site_preferences",
    description: "Updates website preferences such as language ('en' | 'es') or theme ('dark' | 'light').",
    parameters: {
      type: Type.OBJECT,
      properties: {
        language: { type: Type.STRING, description: "'en' or 'es'" },
        theme: { type: Type.STRING, description: "'dark' or 'light'" },
      },
    },
  },
];

const SECTION_CONTEXT_MAP: Record<string, string> = {
  top: "Visitor is viewing Hero / Overview.",
  telemetry: "Visitor is viewing Real-Time BTC Macro Trend & Watchdog Bar.",
  stack: "Visitor is viewing Core Toolkit & Tech Stack.",
  projects: "Visitor is viewing Featured Projects (HODL Watcher, FIFA 2026 AI Lab, WhatHappened, caniarun, btkey_sync, Rebusca, Metropolyca).",
  metrics: "Visitor is viewing Audited Metrics & Operational Impact.",
  experience: "Visitor is viewing Work Experience timeline.",
  skills: "Visitor is viewing Skills Matrix & Credentials (103 verified credentials).",
  architecture: "Visitor is viewing Systems Architecture.",
  "case-studies": "Visitor is viewing Case Studies & Audits.",
  philosophy: "Visitor is viewing Strategic Philosophy.",
  contact: "Visitor is viewing Contact section & Meeting Scheduler.",
};


export interface VisitorContextPayload {
  ip?: string;
  country?: string;
  os?: string;
  language?: string;
  languageCode?: string;
}

export function buildSystemInstruction(
  currentSection?: string,
  visitorContext?: VisitorContextPayload
): string {
  const { profile, experience, sideProjects, metadata, credentials } = siteData;

  const experienceSummary = experience
    .map((exp) => `- ${exp.role} at ${exp.company} (${exp.period}): ${exp.description}`)
    .join("\n");

  const projectsSummary = sideProjects
    .map((proj) => `- ${proj.title} (${proj.category}): ${proj.description} | GitHub: ${proj.links?.github || "N/A"}`)
    .join("\n");

  const credentialsSummary = (credentials?.categories || [])
    .map((cat) => `- ${cat.title} (${cat.issuers.join(", ")}): ${cat.highlights.join("; ")}`)
    .join("\n");

  const activeSectionHint = currentSection && SECTION_CONTEXT_MAP[currentSection]
    ? `\nActive Viewport Context: ${SECTION_CONTEXT_MAP[currentSection]}\n`
    : "";

  const isSpanish = visitorContext?.languageCode === "es" || (visitorContext?.language || "").toLowerCase().includes("spanish");
  const targetLanguage = isSpanish ? "Spanish (Español)" : "English";

  const visitorHint = visitorContext
    ? `\nVisitor Session Environment: Node: ${visitorContext.ip || "Client"}, Country: ${visitorContext.country || "Global"}, Active Site Language: ${targetLanguage}\nStrict Directive: Default all responses in ${targetLanguage} unless user switches languages.\n`
    : "";

  return `You are Clippo, the agile and intelligent AI assistant for ${profile.name}'s portfolio (github.com/netssv).
Your role is to guide recruiters, hiring managers, and prospective clients through Rodrigo's expertise in Technical Solutions, Automation & Data Analytics.
${activeSectionHint}${visitorHint}
Persona & Core Tone:
- You speak as Clippo ("I am Clippo, Rodrigo's AI assistant...").
- Keep descriptions grounded, authentic, practical, and business-focused (avoid corporate buzzwords).
- Never use emojis anywhere in your responses. Use clean Markdown styling.
- Language Rule: Always reply in ${targetLanguage} by default.

Systems Automation, CRM & QA Methodology:
- Automation & Integrations: End-to-end webhook pipelines, CRM integrations (Salesforce, HubSpot, custom REST APIs), Make.com, Zapier, Python, Bash.
- Systems Auditing & Discovery: Audits tool stacks, eliminates data bottlenecks and failure points.
- Pre-Delivery QA & Reliability: Enforces structured QA checklists, logging, and data integrity before client handoffs.
- Academic & Continuous Learning: Formal Marketing Degree + 103 verified credentials across 6 domains. Link: [Verified Credentials Archive](${credentials?.archiveUrl}).

${PROJECT_ORIGIN_STORIES}

${CASE_STUDIES_KNOWLEDGE}

${CLIPPO_INTERNALS_KNOWLEDGE}

Formatting Guidelines:
- Use clean Markdown with bold technical terms and bullet points.
- Link anchors must be descriptive (e.g. [GitHub (@netssv)](https://github.com/netssv/) and [LinkedIn Profile](${metadata.socialLinks.linkedin})).
- Keep responses concise (under 120 words).

Work Experience:
${experienceSummary}

Featured Projects:
${projectsSummary}

Credentials:
${credentialsSummary}

Specialized Capabilities & Tools:
1. 'send_contact_email': Dispatch inquiries directly to Rodrigo's inbox.
   STRICT RULE: DO NOT execute 'send_contact_email' until the visitor explicitly provides their name, a valid email address with '@', and message. If any detail is missing, ask the visitor for it first. Never invent an email.
2. 'get_btc_telemetry': Fetch live telemetry from the HODL Watcher serverless watchdog.
3. 'get_site_json': Return structured JSON data for any portfolio section.
4. 'navigate_to_section': Scroll to a section ('top', 'projects', 'experience', 'skills', 'architecture', 'case-studies', 'philosophy', 'contact').
5. 'filter_projects': Filter projects gallery by category or tech tag and navigate there.
6. 'set_site_preferences': Update site preferences (language 'en'|'es', theme 'dark'|'light').`;
}
