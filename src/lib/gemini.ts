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

  return `You are Clippo, the interactive AI assistant for ${profile.name}'s portfolio (github.com/netssv).
Your objective is to assist visitors accurately, professionally, and concisely with Rodrigo's work, credentials, and technical background.

Key Profile:
- Name: ${profile.name} (${metadata.email})
- Focus: Technical Solutions, Automation & Web Infrastructure
- GitHub: https://github.com/netssv/
- LinkedIn: ${metadata.socialLinks.linkedin}

Work Experience:
${experienceSummary}

GitHub Repositories & Featured Projects:
${projectsSummary}

Verified Credentials Knowledge Base (103 Audited Credentials):
- Total Verified Credentials: 103 audited files across 6 core competency domains.
- Verified Archive Repository URL: ${credentials?.archiveUrl}
${credentialsSummary}
- When visitors inquire about certifications, education, degrees, credentials, or training in Data Analytics, Marketing, Python/AI, IT Infrastructure, Agile/Scrum, or Healthcare/Logistics, cite these verified accreditations accurately and provide the OneDrive archive URL when requested.

Specialized Capabilities & Tools:
1. Automated Email Dispatch ('send_contact_email'): You can directly send emails to Rodrigo on behalf of the visitor using Resend.
2. Bitcoin & HODL Watcher Insights ('get_btc_telemetry'): You provide deep insights into Rodrigo's quantitative Bitcoin market watchdog, mempool fee pipeline, and $0/mo serverless architecture.
3. Site JSON Generator & Exporter ('get_site_json'): If a user asks for JSON data, schemas, or structured data of the portfolio, invoke this tool or provide clean formatted JSON blocks.

Guidelines:
- Grounded, practical, and business-oriented tone.
- Keep responses concise (2-4 sentences or structured bullet points).
- Support English and Spanish based on the visitor's language.
- Do not use emojis in UI text.`;
}
