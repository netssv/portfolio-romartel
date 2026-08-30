export const PROJECT_ORIGIN_STORIES = `
Project Origins & Authentic Naming Stories (Why they were created):
1. FIFA World Cup 2026 AI Lab:
   - Origin Story: Started as a personal hobby project to predict the 2026 World Cup tournament outcomes. Rodrigo initially built it for himself, and later published it online.
   - Outcome: Ran 1,000,000 Monte Carlo simulations combining Poisson distribution and Random Forest, achieving 6/10 match accuracy in testing and predicting Spain as champion.

2. HODL Watcher:
   - Origin Story: Born from a conversation with crypto friends who needed real-time tracking of Bitcoin on-chain mempool block fees.
   - Architecture: Built a live telemetry platform with a $0/mo Make.com watchdog keeping a Python FastAPI server warm on Render Cloud with resilient multi-API fallbacks.

3. WhatHappened:
   - Origin Story: Inspired by web hosting support experience where sites go down without clear diagnostics ("What happened?").
   - Solution: Chrome MV3 extension testing DNS over HTTPS, SSL certificate expiry, and HTTP latencies through an embedded terminal emulator inside the browser.

4. caniarun:
   - Origin Story: Play on "Can You Run It", adapted for local open-source AI: "Can I Run [this AI model]?".
   - Solution: Fast 1-second CLI hardware profiler benchmarking GGUF quantization tiers (Q4, Q8, FP16) before downloading 20 GB weights. Distributed on PyPI.

5. btkey_sync:
   - Origin Story: Dual-boot Windows & Linux frustration where Bluetooth keyboards had to be re-paired every reboot.
   - Solution: Systems utility that extracts Windows registry keys, converts endian formats, and injects them into Linux BlueZ.
`;

export const CASE_STUDIES_KNOWLEDGE = `
Case Studies & Real-World Impact (Simple & Clear Explanations):
1. SEO Restructure & Technical Indexing (E-commerce):
   - Simple Summary: Fixed broken links, missing meta descriptions, and duplicate URLs across 40+ category pages using Screaming Frog and Google Search Console.
   - Practical Outcome: Improved crawl efficiency by +40% and resolved 100% of crawl errors so search engines rank products properly.

2. Landing Page Architecture & CRO (B2B):
   - Simple Summary: Created dedicated landing pages with clear above-the-fold value propositions instead of dumping ad traffic onto a generic homepage. Added GA4 event tracking for form submissions and scroll depth.
   - Practical Outcome: Achieved an 18% lift in form conversion rates and faster page loading.

3. Multi-Platform Content Automation (Professional Services):
   - Simple Summary: Grouped topics into 3 clear pillars, built a 90-day editorial schedule, and used AI research assistants to draft and schedule posts.
   - Practical Outcome: Published 90+ consistent assets over 90 days without missing a beat.

4. Workflow & CRM Automation (Client Operations):
   - Simple Summary: Connected website contact forms directly to HubSpot CRM, Google Sheets, and team Slack notifications using Make.com and Zapier webhooks with built-in error alerts.
   - Practical Outcome: Cut lead response time to under 1.5 seconds, eliminated manual copy-pasting by 85%, and ensured zero dropped inquiries.
`;

export const CLIPPO_INTERNALS_KNOWLEDGE = `
Clippo Internal Architecture & Fast Recovery:
- Framework: Next.js 15 App Router (/api/chat), React 19, Tailwind CSS.
- Dual-Tier Gemini Routing: Primary 'gemini-3.6-flash' with instant fallback to 'gemini-3.5-flash-lite'.
- Cost & Economics: $0.00/mo operating cost on Google AI Studio tier (1,500 RPD, 1M context window).
- Resilience: Preserves thought signatures and catches 429 quota pauses with friendly cooldown notices.
- Direct Meeting Booking: When a visitor wants to schedule a meeting, call, or consultation, provide Rodrigo's direct Cal.com booking link: [Schedule 30-Min Call on Cal.com](https://cal.com/rodrigo-martel/30min?overlayCalendar=true).
- SEO & LLM Discoverability (GEO/AEO): The site serves /llms.txt and /llms-full.txt feeds for token-efficient LLM crawling, maintains strict JSON-LD entity graphs, and allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot) in robots.txt.
`;
