import { Search, TrendingUp, BarChart3, Workflow } from "lucide-react";
import { CaseStudy } from "./caseStudies.types";

export const CASE_STUDIES_EN: CaseStudy[] = [
  {
    id: "01",
    tag: "SEO Restructure",
    icon: Search,
    title: "Organic Search & Technical Indexing",
    subtitle: "E-commerce · Latin American Market",
    highlight: "+40% Crawl Efficiency Lift",
    challenge: "High reliance on paid search with zero organic visibility across 40+ category lines and broken canonicals.",
    frictions: [
      "Zero Organic Presence: Complete reliance on paid ads with zero rank in commercial categories.",
      "Broken Canonicals: Severe index cannibalization and duplicate page errors.",
      "Missing Schema: Product catalog lacked structured rich snippets for search engines.",
    ],
    solution: "Full technical re-indexing: fixed duplicate tags, repaired internal link architecture, and deployed structured Schema templates.",
    kpis: [
      { value: "+40%", label: "Crawl Efficiency Lift" },
      { value: "100%", label: "Crawl Issues Resolved" },
      { value: "3x", label: "Intent Keyword Clusters" },
    ],
    steps: [
      "Search Intent Audit: Categorized informational vs transactional commercial queries.",
      "Technical Cleanup: Resolved duplicate tags, broken links, and canonical directives.",
      "Structured Templates: Deployed scalable Schema.org templates for content teams.",
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
    challenge: "High ad traffic bounce rate because paid campaigns sent visitors to a generic homepage without message-to-intent match.",
    frictions: [
      "Generic Homepage Trap: Costly ad traffic routed to an unfocused page without intent match.",
      "Zero Funnel Telemetry: No tracking of scroll drop-offs or form interaction friction.",
      "Feature-Heavy Copy: Technical descriptions lacking clear, outcome-driven value propositions.",
    ],
    solution: "Designed and built dedicated modular landing pages with above-the-fold CTA, custom GA4 event tracking, and A/B tested value propositions.",
    kpis: [
      { value: "+18%", label: "Conversion Lift" },
      { value: "5", label: "GA4 Custom Events" },
      { value: "3x", label: "Asset Speed Optimizations" },
    ],
    steps: [
      "Modular Landing Pages: Built dedicated high-converting pages with above-the-fold CTAs.",
      "Granular Event Tracking: Configured GA4 scroll telemetry and form drop-off triggers.",
      "A/B Copy Testing: Tested outcome-led value headlines against technical feature lists.",
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
    challenge: "Fragmented, irregular publishing schedule with zero editorial pipeline and no structured way to evaluate social ROI.",
    frictions: [
      "Fragmented Cadence: Inconsistent publishing cycles without structured editorial direction.",
      "Manual Bottlenecks: Slow, labor-intensive drafting and research with zero AI assistance.",
      "Zero Commercial Visibility: Inability to measure or demonstrate content ROI to stakeholders.",
    ],
    solution: "Established 3 core content pillars, automated research workflows with Claude CLI and Notion, and delivered a sustained 90-day publishing cadence.",
    kpis: [
      { value: "90+", label: "Assets Published" },
      { value: "3", label: "Core Content Pillars" },
      { value: "90d", label: "Sustained Execution" },
    ],
    steps: [
      "Strategic Pillars: Defined 3 core high-impact content themes based on engagement data.",
      "AI-Assisted Workflow: Automated research pipelines using Claude CLI and Notion databases.",
      "Executive Dashboard: Built monthly reporting for stakeholder performance tracking.",
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
    challenge: "Commercial team manually copy-pasted leads from web forms into spreadsheets, causing 24-48hr follow-up delays and lost inquiries.",
    frictions: [
      "48h Response Lag: Manual spreadsheet data entry causing critical delays with hot leads.",
      "Dropped Inquiries: Leads lost during traffic surges with zero error recovery logging.",
      "Zero Rep Alerting: Inbound commercial reps received no instant notification on high-intent leads.",
    ],
    solution: "Engineered automated webhook pipelines directly into CRM and Slack with instant fallback logging, dropping response time to <1.5 seconds.",
    kpis: [
      { value: "<1.5s", label: "Routing Latency" },
      { value: "100%", label: "Zero Dropped Leads" },
      { value: "85%", label: "Manual Effort Reduction" },
    ],
    steps: [
      "Instant Webhook Routing: Direct form-to-CRM pipeline triggering immediate Slack alerts.",
      "Fallback Failover: Robust backup logging ensuring no lead submission is ever dropped.",
      "Executive Runbook: Delivered clean 1-page operational handover documentation for staff.",
    ],
    tools: ["Make.com", "Zapier", "Webhooks", "Slack API", "Google Sheets"],
  },
];
