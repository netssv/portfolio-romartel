export const PROJECT_ORIGIN_STORIES = `
Project Origins & Authentic Naming Stories (Why they were created):
1. FIFA World Cup 2026 AI Lab:
   - Origin Story: Started as a personal hobby project to predict the 2026 World Cup tournament outcomes. Rodrigo initially built it for himself, and later published it online. The name is straightforward and descriptive.
   - Outcome & Predictive Success: The model ran 1,000,000 Monte Carlo iterations combining Poisson distribution and Random Forest. In testing, it achieved a 6/10 match accuracy rate and predicted Spain as the 2026 World Cup champion. It demonstrated the practical potential of statistical simulation models.

2. HODL Watcher:
   - Origin Story: Born from a conversation with friends who are crypto enthusiasts asking for a real-time tool to track Bitcoin on-chain mempool fees per block.
   - Innovation & Architecture: Rodrigo went further and engineered a full real-time blockchain telemetry platform with an autonomous $0/mo Make.com cron watchdog keeping a Python FastAPI server warm on Render Cloud.
   - Multi-API Resilient Fallbacks: Features chained API fallbacks (e.g. Binance -> KuCoin -> secondary endpoints) so data feeds never break.

3. WhatHappened:
   - Origin Story: Rodrigo has years of web operations and hosting experience, where the common frustration is knowing a website is down or slow without immediately knowing why ("What happened?").
   - Solution: Built a Chrome MV3 browser extension that diagnoses DNS over HTTPS (DoH), SSL certificate expiration dates, IP blockades, and response times through an embedded POSIX-style terminal emulator safely inside the browser.

4. caniarun:
   - Origin Story: A play on the classic gaming tool "Can You Run It", adapted for local open-source AI: "Can I Run [this AI model]?" (can-ia-run / caniarun).
   - Problem Solved: Created when testing local LLMs and getting tired of downloading 20 GB model weights only to find GPU VRAM was insufficient. The CLI profiles hardware in 1 second and benchmarks GGUF quantization tiers (Q4, Q8, FP16). Distributed directly on PyPI.

5. btkey_sync:
   - Origin Story: Rodrigo works in a dual-boot setup with Windows and Linux. He grew tired of having to re-pair his Bluetooth keyboard and mouse every time he switched operating systems because Windows stores LTK keys in a format Linux BlueZ cannot read natively.
   - Solution: A Python systems utility that automates the extraction of Windows SYSTEM registry keys, converts endian formats, and injects them into Linux BlueZ config files to eliminate re-pairing friction forever.
`;

export const CLIPPO_INTERNALS_KNOWLEDGE = `
Clippo Internal Architecture, API Handling & Error Recovery:
- Framework & UI: Built with Next.js 15 App Router (/api/chat), React 19, Tailwind CSS, and Framer Motion.
- Dual-Tier Gemini Routing:
  * Primary Model: Google Gemini 3.6 Flash ('gemini-3.6-flash') for fast, highly accurate, context-aware reasoning.
  * Fallback Model: Google Gemini 3.5 Flash-Lite ('gemini-3.5-flash-lite') for zero-downtime failover if primary encounters transient load.
- Quotas & $0/mo Economics:
  * 1,500 Requests Per Day (RPD) on the Google AI Studio free tier.
  * 15 to 30 Requests Per Minute (RPM).
  * 1,000,000 token context window.
  * $0.00 monthly operating cost.
- Resilient Tool Calling & Thought Signatures:
  * Preserves native Gemini 'thought_signature' across conversation turns when executing tool calls ('get_btc_telemetry', 'get_site_json', 'send_contact_email').
  * Uses 'user' role for functionResponse payloads in compliance with the Google Gen AI SDK.
- API Fallbacks & Cold Start Handling:
  * FastAPI on Render Cloud sleeps after 15 minutes of idle time. The telemetry tool ('get_btc_telemetry') enforces a strict 1.2s timeout with cached fallback data, ensuring Clippo never hangs during cold starts.
  * 429 Rate Limit Interceptor: Automatically catches quota limits and responds with a friendly cooldown notice instead of technical JSON dumps.
`;
