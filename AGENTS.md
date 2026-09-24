<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project & Code Guidelines

1. **Language:** Always communicate, document, and write responses strictly in English.
2. **No Emojis:** Do not use emojis in UI components, logs, code, or documentation unless explicitly requested by the user. Use clean Lucide SVG icons instead.
3. **File Size Limit:** Keep all modular files (frontend components, hooks, backend route handlers, and utilities) under 200 lines of code.
4. **Tone & Profile Alignment:** The user is a marketing professional passionate about technology, automation, technical solutions, and practical data analytics. Keep technical descriptions grounded, honest, practical, and business-focused (avoid exaggerated enterprise titles or buzzwords).
5. **Multi-Language (i18n) Content Synchronization Rule:** Whenever any content, text, project, metric, case study, or UI label is added or updated in the portfolio, you MUST update BOTH English and Spanish versions (`src/data/i18n/siteData.en.json` & `src/data/i18n/siteData.es.json`, `src/data/i18n/ui.en.ts` & `src/data/i18n/ui.es.ts`, and `src/data/i18n/caseStudies.ts`). You MUST run `npm run test:run` to verify that the automated parity test (`src/data/i18n/__tests__/i18nSync.test.ts`) passes with 100% key and structure symmetry before concluding.
6. **Core Brand Credentials Invariant:** The "Google & Microsoft Certified" badge and verifiable credential links (Google Data Analytics, Microsoft Power BI, HubSpot Inbound) must remain prominent in the hero and portrait sections, linking to the verified archive. Never remove them or replace them with generic claims (e.g., "Audited & Verified").
7. **Color Palette & Visual Restraint:** When styling accents, CTAs, and active states, use subdued, architectural slate blues (`#21426E` light / `#4876AB` dark) rather than saturated electric cobalt (`#1E40AF`) or neon colors. The desktop top navigation must preserve the white-and-gray segmented pill aesthetic (`#EEF0F4` container with pure white active pill).

