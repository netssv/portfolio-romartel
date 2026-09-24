---
name: portfolio-audit
description: Audits personal portfolios and websites across role positioning, credibility signals, technical performance, visual restraint, and conversion paths, producing a prioritized action list.
argument-hint: "[target-url-or-path] [target-role-or-audience]"
metadata:
  author: netss-sv
  version: "1.0.0"
---

# Portfolio Audit

A rigorous evaluation framework for personal websites and portfolios. It identifies positioning mismatches, credibility flaws, rendering bottlenecks, generic aesthetic tropes, and conversion friction.

## Core Audit Dimensions

### 1. Positioning Check (Hero & Narrative Alignment)
- Target Role & Audience Fit: Verify that the hero statement, subheadings, and career timeline directly address the target role or audience.
- Mismatch Detection: Flag contradictions between stated goals and site narrative (for example, positioning as a high-level strategist when targeting technical operations, or vice versa).
- Scope Calibration: Ensure experience descriptions emphasize hands-on, practical problem solving rather than inflated corporate buzzwords or vague generalizations.
- Continuity: Confirm that project case studies and skills validate the primary role claimed in the hero section.

### 2. Credibility Signals & Proof Architecture
- Unexplained Numbers & Metrics: Identify all quantitative stats, metric badges, and percentage bars (e.g., "100% satisfaction", "+300% growth", arbitrary skill percentage bars).
- Verification & Context: Flag any claim that lacks context, baseline numbers, timeframe, or methodology.
- Actionable Remedies:
  - If a metric cannot be backed by context or proof, recommend removing it.
  - If valid, recommend anchoring it with baseline, timeframe, and concrete business outcomes.
- Proof Assets: Ensure social proof, client references, open-source repositories, or live artifacts back up key achievements.

### 3. Technical Performance & Rendering Efficiency
- Concrete Measurement: Report empirical Lighthouse scores and Core Web Vitals (LCP, CLS, INP, FCP) rather than subjective impressions.
- Asset & Image Optimization:
  - Check for modern image formats (AVIF, WebP), explicit dimensions to avoid layout shifts, and proper sizing.
  - Verify above-the-fold hero images use high priority loading while below-the-fold assets are deferred.
- Rendering Architecture:
  - Detect unnecessary client-side rendering (`'use client'`) on static above-the-fold components.
  - Inspect third-party script execution, heavy icon libraries, or excessive runtime animations blocking the main thread.

### 4. Visual Design & Anti-Template Restraint
- Generic AI Aesthetic Detection:
  - Flag excessive neon or cyan-purple glow effects, oversaturated single-accent palettes, and gratuitous gradient text.
  - Flag decorative non-functional elements (e.g., meaningless floating geometric shapes, decorative glowing cards).
- Intentional Design Guidance:
  - Recommend grounded, balanced color palettes (curated neutrals with purposeful accents).
  - Enforce clear typographic scale, consistent rhythm, and strict contrast ratios (WCAG AA compliance).
  - Keep animations purposeful and subtle, respecting `prefers-reduced-motion`.

### 5. Call to Action (CTA) & Conversion Path
- Primary Action Clarity: Confirm the presence of exactly one primary conversion goal (e.g., schedule a consultation, email contact, hire inquiry).
- Hierarchy & Visual Weight: Ensure secondary actions (e.g., GitHub link, resume PDF, social icons) do not compete visually with the primary CTA.
- Friction Analysis: Evaluate form fields, contact pathways, and external redirect hops. The primary action should require minimal effort and zero confusing steps.

## Audit Workflow

1. Context Gathering:
   - Identify the primary target role, target industry, or prospective client profile.
   - Inspect the codebase or crawl the site pages (Hero, Projects, Experience, About, Contact).
2. Criteria Evaluation:
   - Evaluate against each of the 5 audit dimensions above.
   - Run technical profiling (Lighthouse, bundle inspection, rendering review).
3. Prioritization:
   - Sort findings strictly by conversion and credibility impact.

## Output Format Requirements

Do not produce an unranked general summary. Present results as a prioritized list ordered from highest impact to lowest impact using this structure:

### Priority 1: Critical Blockers
Issues that directly undermine credibility, introduce severe conversion drop-off, or create severe narrative confusion.
- Issue: Concise title of the problem.
- Location: Specific section, component, or file.
- Impact: Why this harms hiring or lead conversion.
- Recommendation: Concrete, actionable fix.

### Priority 2: High-Leverage Improvements
Unsubstantiated claims, client-side rendering inefficiencies, or visual distractions that weaken impact.
- Issue, Location, Impact, Recommendation.

### Priority 3: Polish & Refinements
Secondary CTA adjustments, subtle styling cleanup, and minor asset optimizations.
- Issue, Location, Impact, Recommendation.
