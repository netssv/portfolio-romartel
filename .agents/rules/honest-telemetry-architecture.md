# Honest Telemetry & Serverless Architecture Rule

## Purpose
Ensure that all live monitoring, telemetry feeds, and watchdog indicators truthfully represent backend infrastructure states without synthetic health checks, while respecting serverless ephemeral runtime constraints.

## Core Invariants

### 1. Tripartite Status Mapping
Every live telemetry endpoint (`/api/telemetry`) and consumer must map upstream responses strictly into three unambiguous states:
- `live`: Upstream API returns HTTP 200 with an authentic payload.
- `waking_up`: Upstream returns 502, 503, or 504, or the request times out (4.5s threshold via `AbortController`).
- `offline`: Upstream encounters DNS failure, connection refusal, or network abort.

### 2. Zero Synthetic Health Checks
- Never synthesize mock events (e.g. fabricated "Cloud Health Check" or hardcoded "online" responses) during upstream downtime or initialization.
- When an execution buffer contains zero logs, display a clear, honest empty state rather than simulated records.

### 3. Serverless Ephemeral Memory Hygiene
- In serverless hosting environments (e.g. Vercel Lambda / Edge), module-level in-memory ring buffers (`memoryCache`) are ephemeral and isolated to the active container instance.
- In-memory data is never guaranteed to persist across cold boots or regional routing hops.
- When returning `last_real_data_timestamp`, components must handle `null` gracefully with neutral fallback copy.

### 4. Layout Shift (CLS) Prevention & Skeleton Pulse
- During initial cold loading, consumer cards (e.g. `BtcPriceCard`) must render neutral pulse skeletons (`animate-pulse`) matching element dimensions rather than flickering zero values or empty spaces.
- Status transitions must use semantic color tokens:
  - Live: Emerald green (`--color-signal-success` / `--color-emerald-text`).
  - Waking up: Amber (`text-amber-500` / `bg-amber-500/15`).
  - Offline: Muted gray (`text-text-muted` / `bg-text-muted`).
