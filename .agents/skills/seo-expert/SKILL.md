---
name: seo-expert
description: Specialized SEO expert skill for comprehensive technical audits, semantic search optimization, entity mapping, Schema.org JSON-LD graphs, Core Web Vitals profiling, internationalization (hreflang), and conversion rate optimization.
argument-hint: "[audit|optimize|validate] [target]"
metadata:
  author: netss-sv
  version: "1.0.0"
---

# SEO Expert

Specialized workflow and evaluation framework for modern search engine optimization, AI retrieval engines (GEO/AEO), and technical performance.

## Core Audit Dimensions

1. **Technical Foundation & Crawlability**
   - Robots.txt syntax, allow/disallow logic, sitemap.xml accuracy (0 broken 404/500 URLs).
   - Canonicalization: Strict self-referential canonical tags and URL parameter hygiene.
   - Internationalization (i18n): `hreflang` alternate tags, localized subpaths, and root `lang` synchronization.
   - Social Metadata: OpenGraph (`og:image`, `og:title`, `og:type`), Twitter cards (`summary_large_image`).

2. **Entity SEO & Knowledge Graph (JSON-LD)**
   - Schema.org graphs: `Person`, `ProfilePage`, `WebSite`, `CreativeWork`, `SoftwareApplication`.
   - Entity disambiguation: `knowsAbout`, `sameAs`, `alumniOf`, `worksFor`, and `author` relationships.
   - LLM & AI Search Readiness (AEO/GEO): Semantic density, structured microdata, and clean citation sources.

3. **On-Page & Information Architecture**
   - Heading hierarchy: Exactly one semantic `<h1>`, logical `<h2>`/`<h3>` nested structures.
   - Search Intent Alignment: Keyword mapping across informational, navigational, and transactional intents.
   - URL surface area: Dedicated deep pages vs. single-page scroll limitations.

4. **Core Web Vitals & Technical UX**
   - Largest Contentful Paint (LCP): Hero asset priority, image optimization (`next/image`, modern formats).
   - Cumulative Layout Shift (CLS): Explicit dimensions, layout stability, font loading (`display: swap`).
   - Interaction to Next Paint (INP) & First Input Delay (FID): Script execution strategies (`afterInteractive`).

5. **Measurement & Conversion Architecture (CRO)**
   - Analytics instrumentation: GA4 dataLayer events, heatmaps (Microsoft Clarity), conversion funnels.
   - Lead capture friction: Multi-step vs. direct scheduling, CTA visibility and conversion telemetry.
