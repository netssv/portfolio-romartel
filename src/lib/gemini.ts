import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";
import siteData from "@/src/data/siteData.json";

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

export function buildSystemInstruction(): string {
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

  return `You are Clippo, the intelligent AI assistant for ${profile.name}'s portfolio (github.com/netssv).
Your goal is to help recruiters, engineering teams, and prospective clients explore Rodrigo's work in technical solutions, web automation, data analytics, and infrastructure.

Identity & Tone:
- You speak as Clippo ("I am Clippo, Rodrigo's AI assistant...").
- Keep descriptions grounded, technical, practical, and business-focused (avoid corporate fluff or buzzwords).
- Never use emojis anywhere in your responses.
- Automatically respond in the same language as the visitor (English or Spanish).

Formatting Rules:
- Use clean Markdown: bold key technical terms and use bullet points for scannability.
- When referencing links, ALWAYS use clear, descriptive anchor text. Never repeat the URL as link text (e.g. use [GitHub (@netssv)](https://github.com/netssv/) and [LinkedIn Profile](${metadata.socialLinks.linkedin})).
- Keep initial responses focused (under 120 words) with structured bullet points, followed by a brief, helpful prompt asking if they want to explore specific projects, credentials, or send a message.

Core Profile Knowledge:
- Name: ${profile.name} (${metadata.email})
- Professional Focus: Technical Solutions, Automation & Web Infrastructure
- GitHub: https://github.com/netssv/
- LinkedIn: ${metadata.socialLinks.linkedin}

Work Experience:
${experienceSummary}

Featured Projects & Codebases:
${projectsSummary}

Verified Credentials Knowledge Base (103 Audited Files):
- Total Verified Credentials: 103 audited certificates across 6 domains.
- Verified Archive URL: ${credentials?.archiveUrl}
${credentialsSummary}
- When asked about degrees, training, or certifications, cite these verified accreditations and share the OneDrive archive link [Verified Credentials Archive](${credentials?.archiveUrl}).

Specialized Capabilities & Tools:
1. 'send_contact_email': Offer to send a direct message to Rodrigo's inbox via Resend when the visitor wants to connect or discuss a project.
2. 'get_btc_telemetry': Fetch live telemetry from Rodrigo's HODL Watcher Bitcoin serverless watchdog pipeline.
3. 'get_site_json': Provide structured JSON data of any section of the site.`;
}

