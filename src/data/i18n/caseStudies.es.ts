import { Search, TrendingUp, BarChart3, Workflow } from "lucide-react";
import { CaseStudy } from "./caseStudies.types";

export const CASE_STUDIES_ES: CaseStudy[] = [
  {
    id: "01",
    tag: "Reestructuración SEO",
    icon: Search,
    title: "Búsqueda Orgánica e Indexación Técnica",
    subtitle: "Comercio Electrónico · Mercado Latinoamericano",
    highlight: "+40% Eficiencia de Rastreo",
    challenge: "Alta dependencia de pauta pagada sin tráfico orgánico en más de 40 categorías y múltiples errores de rastreo de catálogo.",
    frictions: [
      "Cero Tráfico Orgánico: Dependencia total de pauta pagada sin visibilidad en categorías clave.",
      "Canibalización de URLs: Múltiples errores de canonicals y páginas duplicadas en el índice.",
      "Ausencia de Schema: Fichas de producto sin marcado semántico enriquecido para Google.",
    ],
    solution: "Reestructuración técnica integral: corrección de canonicals, jerarquía de enlaces internos y plantillas Schema estructuradas por intención de búsqueda.",
    kpis: [
      { value: "+40%", label: "Eficiencia de Rastreo" },
      { value: "100%", label: "Errores de Rastreo Resueltos" },
      { value: "3x", label: "Clusters de Intención de Búsqueda" },
    ],
    steps: [
      "Auditoría de Intención: Separación de consultas informacionales vs transaccionales.",
      "Corrección Técnica: Reparación de canonicals rotos, enlaces internos y metadatos duplicados.",
      "Plantillas Schema: Entrega de marcado estructurado escalable para el equipo editorial.",
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
    challenge: "Alta tasa de rebote en pauta digital debido a redirección hacia una home genérica sin coincidencia de intención de compra.",
    frictions: [
      "Destino Genérico: Tráfico pagado de alto costo dirigido a una home sin coincidencia de intención.",
      "Cero Telemetría: Sin medición de profundidad de scroll ni puntos de abandono en formularios.",
      "Textos Técnicos: Redacción centrada en funciones sin una propuesta de valor enfocada en resultados.",
    ],
    solution: "Desarrollo de landing pages modulares con propuesta de valor clara y CTA visible, medición de eventos en GA4 y pruebas A/B de mensajes.",
    kpis: [
      { value: "+18%", label: "Incremento en Conversión" },
      { value: "5", label: "Eventos de Telemetría GA4" },
      { value: "3x", label: "Optimización de Carga" },
    ],
    steps: [
      "Landing Pages Modulares: Creación de páginas dedicadas con propuesta de valor y CTA visibles.",
      "Telemetría Granular: Configuración de eventos GA4 para scroll e interacción con formularios.",
      "Pruebas A/B de Mensaje: Validación de propuestas de valor orientadas a beneficios reales.",
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
    challenge: "Publicación fragmentada e irregular en redes, sin pipeline editorial estructurado ni medición del retorno del contenido.",
    frictions: [
      "Ritmo Fragmentado: Publicación irregular en redes sin un calendario editorial planificado.",
      "Cuello de Botella Manual: Investigación y redacción lentas sin aceleración mediante IA.",
      "Cero Visibilidad de ROI: Falta de reportes para medir el retorno comercial del contenido.",
    ],
    solution: "Definición de 3 pilares estratégicos de contenido, automatización de flujos de investigación con Claude CLI y Notion, y ejecución continua a 90 días.",
    kpis: [
      { value: "90+", label: "Publicaciones Ejecutadas" },
      { value: "3", label: "Pilares Estratégicos de Contenido" },
      { value: "90d", label: "Ejecución Continua" },
    ],
    steps: [
      "Pilares Estratégicos: Definición de 3 ejes temáticos con base en datos de interacción.",
      "Flujo Automatizado con IA: Creación de pipelines de investigación con Claude CLI y Notion.",
      "Panel Ejecutivo: Implementación de tablero mensual de métricas clave para directivos.",
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
    challenge: "Copia manual de prospectos desde formularios web a hojas de cálculo, generando retrasos de 24-48h y pérdidas de oportunidades comerciales.",
    frictions: [
      "Retrasos de 48 Horas: Copia manual de prospectos en hojas de cálculo con pérdidas de ventas.",
      "Pérdida de Prospectos: Solicitudes caídas en picos de demanda sin registros de recuperación.",
      "Sin Alertas Inmediatas: Asesores comerciales sin notificación en tiempo real ante nuevos prospectos.",
    ],
    solution: "Flujo automatizado por webhooks conectando el formulario directo a Salesforce/HubSpot y Slack con registro de respaldo, reduciendo la latencia a <1.5s.",
    kpis: [
      { value: "<1.5s", label: "Latencia de Enrutamiento" },
      { value: "100%", label: "Cero Consultas Perdidas" },
      { value: "85%", label: "Reducción de Esfuerzo Manual" },
    ],
    steps: [
      "Enrutamiento por Webhooks: Conexión directa del formulario al CRM con alertas inmediatas en Slack.",
      "Registro de Respaldo: Sistema de fallback para garantizar cero pérdida de solicitudes.",
      "Runbook Operativo: Entrega de guía ejecutiva de traspaso y procedimientos para el equipo.",
    ],
    tools: ["Make.com", "Zapier", "Webhooks", "Slack API", "Google Sheets"],
  },
];
