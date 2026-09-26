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
  Calendar,
} from "lucide-react";
import { SectionId } from "./useActiveSection";
import { SectionChatbotConfig } from "./chatbot-section-data";

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
      { text: "¿Cuáles son sus credenciales verificadas?", icon: Award },
      { text: "Agendar una llamada con Rodrigo", icon: Calendar },
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
      "¿Interesado en sus certificaciones técnicas auditadas?",
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
