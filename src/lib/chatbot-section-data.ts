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

export const SECTION_CHATBOT_CONFIG_EN: Record<SectionId, SectionChatbotConfig> = {
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

export const SECTION_CHATBOT_CONFIG_ES: Record<SectionId, SectionChatbotConfig> = {
  top: {
    sectionName: "Resumen y Perfil",
    speechPhrases: [
      "¡Parece que estás explorando el portafolio de Rodrigo!",
      "Pregúntame sobre su experiencia técnica en automatización y CRM.",
      "¿Quieres revisar la telemetría en vivo del mempool de Bitcoin?",
      "¿Te gustaría conocer sus proyectos de código abierto?",
    ],
    suggestions: [
      { text: "¿Cómo aborda Rodrigo el CRM y la automatización?", icon: Sparkles },
      { text: "¿Cuáles son sus 103 certificaciones verificadas?", icon: Award },
      { text: "Enviar un correo a Rodrigo", icon: Mail },
    ],
  },
  projects: {
    sectionName: "Proyectos Destacados",
    speechPhrases: [
      "¿Curioso por la telemetría Bitcoin en tiempo real o scrapers serverless?",
      "¿Quieres saber más del laboratorio de IA FIFA 2026 o Rebusca?",
      "¡Pregúntame sobre la arquitectura detrás de sus proyectos open-source!",
    ],
    suggestions: [
      { text: "Háblame del pipeline BTC de HODL Watcher", icon: Activity },
      { text: "¿Cómo funciona el simulador de IA FIFA 2026?", icon: Sparkles },
      { text: "¿Qué es la extensión de Chrome WhatHappened?", icon: Terminal },
    ],
  },
  experience: {
    sectionName: "Trayectoria y Operaciones",
    speechPhrases: [
      "Pregúntame sobre sus operaciones de web hosting y experiencia CRM.",
      "¿Quieres conocer su historial en gestión de servidores y flujos con clientes?",
      "¿Curioso sobre cómo gestiona onboarding técnico y auditorías de sistemas?",
    ],
    suggestions: [
      { text: "¿Cuáles fueron sus responsabilidades en web hosting?", icon: Terminal },
      { text: "¿Cómo diseña pipelines de CRM y onboarding?", icon: Sparkles },
      { text: "Enviar una consulta a Rodrigo", icon: Mail },
    ],
  },
  skills: {
    sectionName: "Habilidades y Certificaciones",
    speechPhrases: [
      "¿Explorando la matriz de habilidades? Pregúntame sobre automatización y QA.",
      "¿Interesado en sus 103 certificaciones auditadas?",
      "Pregúntame sobre Make.com, Zapier, Python y Bash.",
    ],
    suggestions: [
      { text: "¿Cuáles son sus credenciales verificadas?", icon: Award },
      { text: "¿Qué plataformas de automatización domina?", icon: Workflow },
      { text: "¿Cómo aplica checklists de QA pre-entrega?", icon: CheckCircle2 },
    ],
  },
  architecture: {
    sectionName: "Arquitectura de Sistemas",
    speechPhrases: [
      "¡Pregúntame cómo se construyó la telemetría y resiliencia de esta web!",
      "¿Curioso sobre ingesta por webhooks y pipelines de datos?",
      "¿Quieres conocer las arquitecturas serverless que Rodrigo diseña?",
    ],
    suggestions: [
      { text: "Explica la arquitectura edge y fallbacks", icon: Cpu },
      { text: "¿Cómo se diseñan las automatizaciones con webhooks?", icon: Workflow },
      { text: "Arquitectura serverless de HODL Watcher", icon: Activity },
    ],
  },
  "case-studies": {
    sectionName: "Casos de Estudio y Auditorías",
    speechPhrases: [
      "¿Quieres un resumen ejecutivo de las auditorías de sistemas de Rodrigo?",
      "Pregúntame cómo las auditorías técnicas eliminaron cuellos de botella.",
      "¿Curioso de cómo los runbooks y checklists de QA evitan fallos?",
    ],
    suggestions: [
      { text: "Resumen de resultados clave de casos de estudio", icon: FileText },
      { text: "¿Qué puntos de fallo se identifican en auditorías?", icon: Search },
      { text: "Conversar sobre una auditoría con Rodrigo", icon: Mail },
    ],
  },
  philosophy: {
    sectionName: "Filosofía Estratégica",
    speechPhrases: [
      "Rigor de ingeniería detrás del crecimiento práctico y automatización.",
      "Pregúntame sobre el enfoque en herramientas prácticas e integridad de datos.",
    ],
    suggestions: [
      { text: "Filosofía de rigor de ingeniería en marketing", icon: Cpu },
      { text: "¿Cómo impulsa la telemetría las decisiones de negocio?", icon: Activity },
      { text: "Ponerse en contacto con Rodrigo", icon: Mail },
    ],
  },
  contact: {
    sectionName: "Contacto y Colaboración",
    speechPhrases: [
      "¿Quieres que te ayude a redactar y enviar un mensaje directo a Rodrigo?",
      "¡Puedo entregar tu consulta directamente a su bandeja con Resend!",
      "¿Necesitas sus enlaces de GitHub o LinkedIn?",
    ],
    suggestions: [
      { text: "Quiero enviar un correo a Rodrigo", icon: Mail },
      { text: "¿Qué tipo de proyectos asume Rodrigo?", icon: Sparkles },
      { text: "¿Dónde están sus perfiles de GitHub y LinkedIn?", icon: ExternalLink },
    ],
  },
};

export const SECTION_CHATBOT_CONFIG = SECTION_CHATBOT_CONFIG_EN;

export function getSectionChatbotConfig(
  sectionId: SectionId,
  localeOrIsSpanish: boolean | string = false
): SectionChatbotConfig {
  const isSpanish =
    typeof localeOrIsSpanish === "string"
      ? localeOrIsSpanish.toLowerCase().startsWith("es")
      : Boolean(localeOrIsSpanish);

  const dict = isSpanish ? SECTION_CHATBOT_CONFIG_ES : SECTION_CHATBOT_CONFIG_EN;
  return dict[sectionId] || dict.top;
}
