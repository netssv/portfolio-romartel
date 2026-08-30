import dns from "node:dns";
import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";
import { buildSystemInstruction, VisitorContextPayload } from "@/src/lib/chatbot-prompt";

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

export { buildSystemInstruction };
export type { VisitorContextPayload };
