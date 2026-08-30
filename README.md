# Rodrigo Martel | Portfolio & Systems Architecture

Engineering-driven portfolio showcasing production codebases, webhook automations, CRM integrations, and serverless data pipelines.

---

## Systems & Cloud Architecture ($0/mo Infrastructure)

### 1. Dual-Tier AI Assistant (Clippo)
* **Primary Model:** Google Gemini 3.5 Flash-Lite (`gemini-3.5-flash-lite`) for ultra-low latency (~2-3s).
* **Fallback Model:** Google Gemini 3.6 Flash (`gemini-3.6-flash`) for deep reasoning resilience.
* **Economics & Free Tier Specs:**
  * **Daily Quota:** 1,500 Requests Per Day (RPD).
  * **Rate Limit:** 15–30 Requests Per Minute (RPM).
  * **Context Window:** 1,000,000 tokens.
  * **Operating Cost:** $0.00 / month.
* **Tool Calling & Execution Strategy:**
  * Native Function Calling (`get_btc_telemetry`, `get_site_json`, `send_contact_email`, `navigate_to_section`, `filter_projects`, `set_site_preferences`).
  * Direct Cal.com 30-Minute Discovery Call Integration (`https://cal.com/rodrigo-martel/30min?overlayCalendar=true`).
  * Deep In-Page Redirection via exact `#` anchor tags (`#top`, `#telemetry`, `#stack`, `#projects`, `#metrics`, `#experience`, `#skills`, `#architecture`, `#case-studies`, `#philosophy`, `#contact`) with `scroll-mt-24` offsets.
  * Preserves Google Gen AI `thought_signature` across conversation turns.
  * Employs strict 1.2s timeout on external microservice calls to prevent cold-start delays.
* **Dynamic Multilingual Intelligence:**
  * Strict Language Mirroring: Automatically detects and replies in the visitor's input language (Spanish, English, French, Portuguese, etc.).
  * Natural Site Language Negotiation: Offers to switch the full website language when a visitor speaks a supported language (EN/ES) that differs from the active site view.
  * Unsupported Language Handling: Answers queries fluently in any language while politely clarifying the website pages are currently presented in English and Spanish.
* **Client-Side UX & Error Recovery:**
  * Controlled `isLoading` state replacing asynchronous transitions.
  * 45-second `AbortController` safety window for complex multi-turn prompts.
  * Built-in interactive **"Reintentar" (Retry)** action directly in error banners.
  * Animated SVG avatar with explicit `cx`/`cy` baseline attributes preventing Framer Motion warnings.

### 2. Live Bitcoin & Mempool Telemetry Pipeline (HODL Watcher)
* **Backend:** Python FastAPI deployed on Render Cloud.
* **Autonomous Cron Watchdog:** Make.com scheduled scenario executing every 15 minutes.
* **Purpose:**
  * Eliminates free-tier idle sleep (cold starts) by keeping the FastAPI instance active 24/7 at $0/mo.
  * Verifies Bitcoin on-chain mempool fees and order flow telemetry.
  * Logs events into an In-Memory Ring Buffer (15 execution slots) with zero database overhead.
* **Frontend Telemetry Bar:**
  * Real-time Binance REST/WebSocket ticker feed.
  * Integrated **Fear & Greed Market Sentiment Index** via [`/api/hodl-insights`](file:///home/netss/Proyectos/websites/portfolio-romartel/app/api/hodl-insights/route.ts).
  * Interactive execution buffer drawer with manual ping testing (`visitor-test`).

### 3. LLM Discoverability & Generative Engine Optimization (GEO / AEO)
* **AI Knowledge Feeds:** Serves [`/llms.txt`](file:///home/netss/Proyectos/websites/portfolio-romartel/public/llms.txt) and [`/llms-full.txt`](file:///home/netss/Proyectos/websites/portfolio-romartel/public/llms-full.txt) standard files for token-efficient LLM ingestion by ChatGPT, Gemini, Claude, and Perplexity.
* **Crawler Directives:** Explicit allow rules configured in [`app/robots.ts`](file:///home/netss/Proyectos/websites/portfolio-romartel/app/robots.ts) for `GPTBot`, `OAI-SearchBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, and `Applebot-Extended`.
* **Structured Schema Graph:** Complete Schema.org JSON-LD `@graph` linking `Person`, `ProfilePage`, and verified credentials across GitHub, LinkedIn, PyPI, Chrome Web Store, and Cal.com.

### 4. Project Naming Stories & Portfolio Strategy
* Centralized in [`PROJECT_NAMING_STORIES.md`](file:///home/netss/Proyectos/websites/portfolio-romartel/PROJECT_NAMING_STORIES.md), documenting authentic problem-solving origins:
  * **FIFA World Cup 2026 AI Lab:** Monte Carlo simulation engine with 1M iterations, predicting Spain as champion with 6/10 test accuracy.
  * **HODL Watcher:** Real-time on-chain mempool fee tracker with multi-API fallbacks (Binance, KuCoin).
  * **WhatHappened:** Chrome MV3 triage terminal for edge DNS (DoH), SSL certificate expiration, and network health.
  * **caniarun:** 1-second CLI hardware profiler for local LLM quantization tiers (Q4, Q8, FP16) distributed on PyPI.
  * **btkey_sync:** Windows-to-Linux Bluetooth LTK encryption key synchronizer eliminating dual-boot re-pairing.
  * **Rebusca:** Android grocery price intelligence engine with defensive scraping and mobile API parsing.

### 5. Web Platform & Observability
* **Framework:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion.
* **Modularity Standard:** Strict < 200 lines-of-code limit per modular component, hook, and route handler.
* **CRO & Direct Booking:** Embedded Cal.com 30-min discovery call scheduler, custom zero-latency localStorage A/B testing engine, Google Analytics 4 (GA4), Microsoft Clarity heatmaps.
* **Transactional Email:** Secure serverless routing via Resend API with honeypot spam protection.



---

## Local Development

```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local

# Start development server
npm run dev
```
