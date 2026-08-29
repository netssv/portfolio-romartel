import { Search, TrendingUp, BarChart3, Workflow, LucideIcon } from "lucide-react";

export interface CaseStudy {
  id: string;
  tag: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  highlight: string;
  challenge: string;
  kpis: { value: string; label: string }[];
  steps: string[];
  tools: string[];
}

export const CASE_STUDIES_EN: CaseStudy[] = [
  {
    id: "01",
    tag: "SEO Restructure",
    icon: Search,
    title: "Organic Search & Technical Indexing",
    subtitle: "E-commerce · Latin American Market",
    highlight: "+40% Crawl Efficiency",
    challenge: "High reliance on paid search with zero organic visibility across 40+ category lines.",
    kpis: [
      { value: "40+", label: "Pages Restructured" },
      { value: "100%", label: "Crawl Issues Resolved" },
      { value: "3x", label: "Intent Keyword Clusters" },
    ],
    steps: [
      "Audited search intent across informational and transactional queries.",
      "Fixed duplicate meta tags, canonicals, and broken internal links.",
      "Delivered structured schema templates for ongoing editorial teams.",
    ],
    tools: ["Google Search Console", "Screaming Frog", "GA4"],
  },
  {
    id: "02",
    tag: "CRO & Performance",
    icon: TrendingUp,
    title: "Landing Page Architecture & CRO",
    subtitle: "B2B SaaS · Paid Acquisition Funnel",
    highlight: "+18% Form Conversion Lift",
    challenge: "High ad traffic bounce rate due to generic homepage routing without intent match.",
    kpis: [
      { value: "+18%", label: "Conversion Lift" },
      { value: "5", label: "GA4 Custom Telemetry Events" },
      { value: "3x", label: "Asset Speed Optimizations" },
    ],
    steps: [
      "Built dedicated modular landing page with above-the-fold CTA.",
      "Configured GA4 scroll depth and form interaction telemetry.",
      "A/B tested outcome-led value propositions against feature lists.",
    ],
    tools: ["GA4", "Google Tag Manager", "Microsoft Clarity"],
  },
  {
    id: "03",
    tag: "Content Strategy",
    icon: BarChart3,
    title: "Multi-Platform Content Automation",
    subtitle: "Professional Services · Brand Scaling",
    highlight: "90+ Content Assets Produced",
    challenge: "Fragmented social scheduling and lack of structured editorial pipelines.",
    kpis: [
      { value: "90+", label: "Assets Published" },
      { value: "3", label: "Core Content Pillars" },
      { value: "90d", label: "Sustained Execution" },
    ],
    steps: [
      "Audited engagement metrics and established 3 core content pillars.",
      "Created structured 90-day calendar and automated AI research workflows.",
      "Implemented monthly stakeholder reporting dashboard.",
    ],
    tools: ["LinkedIn Analytics", "Claude CLI", "Notion"],
  },
  {
    id: "04",
    tag: "Workflow & CRM",
    icon: Workflow,
    title: "Automated Lead Sync & CRM Pipeline",
    subtitle: "Client Operations · Inbound Routing",
    highlight: "<1.5s Instant Lead Routing",
    challenge: "Manual lead copy-pasting from web forms causing 24-48hr delays and dropped inquiries.",
    kpis: [
      { value: "<1.5s", label: "Lead Routing Latency" },
      { value: "100%", label: "Zero Dropped Inquiries" },
      { value: "85%", label: "Manual Effort Reduction" },
    ],
    steps: [
      "Connected contact webhooks directly to CRM with instant Slack & email alerts.",
      "Added fallback logging so failed submissions never disappear.",
      "Delivered a simple 1-page client handover runbook.",
    ],
    tools: ["Make.com", "Zapier", "Webhooks", "Slack API", "Google Sheets"],
  },
];

export const CASE_STUDIES_ES: CaseStudy[] = [
  {
    id: "01",
    tag: "Reestructuración SEO",
    icon: Search,
    title: "Búsqueda Orgánica e Indexación Técnica",
    subtitle: "Comercio Electrónico · Mercado Latinoamericano",
    highlight: "+40% Eficiencia de Rastreo",
    challenge: "Alta dependencia de pauta publicitaria sin visibilidad orgánica en más de 40 categorías.",
    kpis: [
      { value: "40+", label: "Páginas Reestructuradas" },
      { value: "100%", label: "Errores de Rastreo Resueltos" },
      { value: "3x", label: "Clusters de Intención de Búsqueda" },
    ],
    steps: [
      "Auditoría de intención de búsqueda en consultas informacionales y transaccionales.",
      "Corrección de etiquetas duplicadas, canonicals y enlaces internos rotos.",
      "Entrega de plantillas Schema estructuradas para equipos editoriales.",
    ],
    tools: ["Google Search Console", "Screaming Frog", "GA4"],
  },
  {
    id: "02",
    tag: "CRO y Rendimiento",
    icon: TrendingUp,
    title: "Arquitectura de Landing Pages y CRO",
    subtitle: "B2B SaaS · Embudo de Adquisición Pagada",
    highlight: "+18% en Conversión de Formularios",
    challenge: "Alta tasa de rebote en pauta debido a redirección a páginas genéricas sin coincidencia de intención.",
    kpis: [
      { value: "+18%", label: "Incremento en Conversión" },
      { value: "5", label: "Eventos de Telemetría GA4" },
      { value: "3x", label: "Optimización de Carga" },
    ],
    steps: [
      "Desarrollo de landing page modular con CTA principal en el primer pantallazo.",
      "Configuración de telemetría GA4 para scroll e interacción con formularios.",
      "Pruebas A/B de propuestas de valor orientadas a resultados vs listas de funciones.",
    ],
    tools: ["GA4", "Google Tag Manager", "Microsoft Clarity"],
  },
  {
    id: "03",
    tag: "Estrategia de Contenido",
    icon: BarChart3,
    title: "Automatización de Contenido Multiplataforma",
    subtitle: "Servicios Profesionales · Escalabilidad de Marca",
    highlight: "Más de 90 Piezas Producidas",
    challenge: "Programación fragmentada en redes y falta de un pipeline editorial estructurado.",
    kpis: [
      { value: "90+", label: "Publicaciones Ejecutadas" },
      { value: "3", label: "Pilares Estratégicos de Contenido" },
      { value: "90d", label: "Ejecución Continua" },
    ],
    steps: [
      "Auditoría de métricas de interacción y definición de 3 pilares clave.",
      "Creación de calendario estructurado a 90 días y flujos de investigación con IA.",
      "Implementación de panel mensual de resultados para stakeholders.",
    ],
    tools: ["LinkedIn Analytics", "Claude CLI", "Notion"],
  },
  {
    id: "04",
    tag: "Flujos de Trabajo y CRM",
    icon: Workflow,
    title: "Sincronización Automatizada de Leads y CRM",
    subtitle: "Operaciones con Clientes · Enrutamiento Inbound",
    highlight: "<1.5s Enrutamiento Instantáneo",
    challenge: "Copia manual de prospectos desde formularios web causando retrasos de 24-48h y pérdidas de consultas.",
    kpis: [
      { value: "<1.5s", label: "Latencia de Enrutamiento" },
      { value: "100%", label: "Cero Consultas Perdidas" },
      { value: "85%", label: "Reducción de Esfuerzo Manual" },
    ],
    steps: [
      "Conexión de webhooks de contacto directo al CRM con alertas en Slack y correo.",
      "Registro de respaldo (fallback logging) para que ninguna solicitud se pierda.",
      "Entrega de runbook ejecutivo de traspaso operativo para el cliente.",
    ],
    tools: ["Make.com", "Zapier", "Webhooks", "Slack API", "Google Sheets"],
  },
];
