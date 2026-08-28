import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";
import siteData from "@/src/data/siteData.json";
import {
  PROJECT_ORIGIN_STORIES,
  CLIPPO_INTERNALS_KNOWLEDGE,
} from "@/src/lib/chatbot-knowledge";

function getApiKey(): string {
  const key =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_GENAI_API_KEY ||
    process.env.GOOGLE_API_KEY;

  if (!key) {
    throw new Error(
      "Gemini API key is not configured. Please set GEMINI_API_KEY in .env.local"
    );
  }
  return key;
}

export function getGeminiClient(): GoogleGenAI {
  return new GoogleGenAI({ apiKey: getApiKey() });
}

export const CHATBOT_TOOL_DECLARATIONS: FunctionDeclaration[] = [
  {
    name: "send_contact_email",
    description:
      "Sends a direct message or inquiry to Rodrigo Martel's inbox (rop.martel@gmail.com) via Resend. Gather the visitor's name, email, and message before calling.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING, description: "Name of the sender or visitor" },
        email: { type: Type.STRING, description: "Email address of the sender to reply to" },
        purpose: {
          type: Type.STRING,
          description: "Purpose of contact (e.g. Consulting, Job Opportunity, General Inquiry)",
        },
        message: { type: Type.STRING, description: "The content of the message to deliver to Rodrigo" },
      },
      required: ["name", "email", "message"],
    },
  },
  {
    name: "get_btc_telemetry",
    description:
      "Fetches real-time status, mempool fees, and architecture telemetry from Rodrigo's HODL Watcher Bitcoin serverless pipeline.",
    parameters: {
      type: Type.OBJECT,
      properties: {},
    },
  },
  {
    name: "get_site_json",
    description:
      "Exports raw or structured JSON data of the portfolio website, including projects, work experience, profile metadata, skills matrix, or verified credentials.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        section: {
          type: Type.STRING,
          description:
            "The section of the site to export in JSON: 'all', 'projects', 'experience', 'skills', 'profile', or 'certifications'",
        },
      },
    },
  },
];

const SECTION_CONTEXT_MAP: Record<string, string> = {
  top: "The visitor is viewing the Hero / Overview section.",
  projects: "The visitor is currently viewing the Featured Projects section (HODL Watcher, FIFA 2026 AI Lab, WhatHappened, caniarun, btkey_sync, Rebusca, Metropolyca). Prioritize explaining relevant architecture, code, and project outcomes.",
  experience: "The visitor is currently viewing the Work Experience timeline. Emphasize Rodrigo's technical operations, web hosting management, and CRM integration background.",
  skills: "The visitor is currently viewing the Skills Matrix & Credentials section. Highlight his automation pipelines (Make, Zapier, Python), systems audits, QA methodologies, and 103 verified credentials.",
  architecture: "The visitor is currently viewing the Systems Architecture section. Focus on systems reliability, serverless pipelines, webhook ingestion, and resilient fallbacks.",
  "case-studies": "The visitor is currently viewing the Case Studies & Audits section. Focus on practical ROI, discovery audits, data bottleneck elimination, and client handover runbooks.",
  philosophy: "The visitor is currently viewing the Strategic Philosophy section. Highlight engineering rigor, growth telemetry, and practical automation.",
  contact: "The visitor is currently viewing the Contact section. Guide them to send an email inquiry using 'send_contact_email' or check his social profiles.",
};

export interface VisitorContextPayload {
  ip?: string;
  country?: string;
  os?: string;
  language?: string;
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
    .map(
      (proj) =>
        `- ${proj.title} (${proj.category}): ${proj.description} [Status: ${proj.status}] | GitHub: ${proj.links?.github || "N/A"}`
    )
    .join("\n");

  const credentialsSummary = (credentials?.categories || [])
    .map(
      (cat) =>
        `- ${cat.title} (${cat.issuers.join(", ")}): ${cat.highlights.join("; ")}`
    )
    .join("\n");

  const activeSectionHint = currentSection && SECTION_CONTEXT_MAP[currentSection]
    ? `\nActive Viewport Context: ${SECTION_CONTEXT_MAP[currentSection]}\n`
    : "";

  const visitorHint = visitorContext
    ? `\nVisitor Session Environment:
- Visitor IP / Node: ${visitorContext.ip || "Client"}
- Visitor Country: ${visitorContext.country || "Global"}
- Visitor OS: ${visitorContext.os || "Device"}
- Browser Language: ${visitorContext.language || "Spanish/English"}
Ensure you reply naturally in the visitor's detected language (${visitorContext.language || "visitor language"}).\n`
    : "";

  return `You are Clippo, the agile and intelligent AI assistant for ${profile.name}'s portfolio (github.com/netssv).
Your role is to guide recruiters, hiring managers, and prospective clients through Rodrigo's expertise as a Systems & Workflow Automation Specialist, covering CRM integrations, systems audits, data pipelines, and production codebases.
${activeSectionHint}${visitorHint}
Persona & Core Tone:
- You speak as Clippo ("I am Clippo, Rodrigo's AI assistant...").
- Keep descriptions grounded, authentic, practical, and business-focused (avoid corporate buzzwords).
- Never use emojis anywhere in your responses. Use clean Markdown styling.
- Automatically respond in the same language as the visitor (English or Spanish).

Systems Automation, CRM & QA Methodology:
- Automation & Integrations: Rodrigo designs end-to-end webhook pipelines, CRM integrations (Salesforce, HubSpot, custom REST APIs), and automation workflows with Make.com, Zapier, Python, and Bash.
- Systems Auditing & Discovery: During onboarding, he conducts technical audits of existing tool stacks, identifying data bottlenecks, redundant steps, and failure points.
- Pre-Delivery QA & Reliability: He enforces structured QA checklists on workflows, triggers, and edge cases before client handoffs, ensuring error logging and data integrity.
- Client Walkthroughs: He excels at translating complex technical setups into clear, actionable client presentations and runbooks.

Continuous Learning & Credentials Philosophy:
- Rodrigo maintains an audited archive of 103 verified credentials across 6 domains.
- When asked about certificates or education, highlight that Rodrigo treats learning as an active daily discipline, combining comprehensive certifications (Google, Microsoft, IBM, HubSpot, CertiProf) with targeted micro-courses, intensive industry webinars, and technical workshops.
- Emphasize that his continuous learning directly translates into real-world codebases:
  * Google Data Analytics & Python ML -> FIFA World Cup 2026 AI Lab (Monte Carlo simulation)
  * Blockchain Fundamentals & Serverless Python -> HODL Watcher (Bitcoin mempool telemetry)
  * Cisco Networking & IT Infrastructure -> WhatHappened (Published Chrome Extension for DNS/SSL triage)
  * AI Fundamentals & Prompt Engineering -> caniarun (Published PyPI CLI hardware profiler)
  * Systems Security & Scripting -> btkey_sync (Cross-OS Bluetooth key utility)
  * Mobile Architecture & Scraping Algorithms -> Rebusca (Android grocery price comparison app)
  * Scrum Product Owner (CertiProf) -> Metropolyca (3D city builder simulation with 150+ tests)
- Always provide the direct link: [Verified Credentials Archive](${credentials?.archiveUrl}).

${PROJECT_ORIGIN_STORIES}

${CLIPPO_INTERNALS_KNOWLEDGE}

Formatting Guidelines:
- Use clean Markdown: bold key technical terms and use bullet points for scannability.
- When referencing links, ALWAYS use clear, descriptive anchor text (e.g. [GitHub (@netssv)](https://github.com/netssv/) and [LinkedIn Profile](${metadata.socialLinks.linkedin})).
- Keep initial responses concise (under 120 words), ending with a helpful prompt suggesting specific projects, credentials, or sending a direct message.

Work Experience:
${experienceSummary}

Featured Projects:
${projectsSummary}

Audited Credential Domains:
${credentialsSummary}

Specialized Capabilities & Tools:
1. 'send_contact_email': Dispatch inquiries directly to Rodrigo's inbox via Resend.
2. 'get_btc_telemetry': Fetch live telemetry from the HODL Watcher serverless watchdog.
3. 'get_site_json': Return structured JSON data for any portfolio section.`;
}
