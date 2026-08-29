import { describe, it, expect } from "vitest";
import siteDataEn from "../siteData.en.json";
import siteDataEs from "../siteData.es.json";
import { uiTranslationsEn } from "../ui.en";
import { uiTranslationsEs } from "../ui.es";
import { CASE_STUDIES_EN, CASE_STUDIES_ES } from "../caseStudies";

function getDeepKeyPaths(obj: unknown, prefix = ""): string[] {
  if (obj === null || typeof obj !== "object") {
    return [prefix];
  }

  if (Array.isArray(obj)) {
    const paths: string[] = [`${prefix}[]`];
    if (obj.length > 0 && typeof obj[0] === "object" && obj[0] !== null) {
      const itemKeys = getDeepKeyPaths(obj[0], `${prefix}[0]`);
      paths.push(...itemKeys);
    }
    return paths;
  }

  const paths: string[] = [];
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    paths.push(...getDeepKeyPaths(value, fullKey));
  }
  return paths;
}

describe("i18n Content Parity & Integrity Rule", () => {
  it("ensures siteData.en.json and siteData.es.json have identical key structures", () => {
    const enKeys = getDeepKeyPaths(siteDataEn).sort();
    const esKeys = getDeepKeyPaths(siteDataEs).sort();

    expect(esKeys).toEqual(enKeys);
  });

  it("ensures UI dictionaries (ui.en.ts and ui.es.ts) have matching top-level and nested keys", () => {
    const enUiKeys = getDeepKeyPaths(uiTranslationsEn).sort();
    const esUiKeys = getDeepKeyPaths(uiTranslationsEs).sort();

    expect(esUiKeys).toEqual(enUiKeys);
  });

  it("ensures case studies have identical item count and property structure", () => {
    expect(CASE_STUDIES_ES.length).toBe(CASE_STUDIES_EN.length);

    const enIds = CASE_STUDIES_EN.map((c) => c.id);
    const esIds = CASE_STUDIES_ES.map((c) => c.id);
    expect(esIds).toEqual(enIds);

    CASE_STUDIES_EN.forEach((enStudy, idx) => {
      const esStudy = CASE_STUDIES_ES[idx];
      expect(esStudy.kpis.length).toBe(enStudy.kpis.length);
      expect(esStudy.steps.length).toBe(enStudy.steps.length);
      expect(esStudy.tools).toEqual(enStudy.tools);
    });
  });

  it("ensures flagship project metrics and tags parity in site data", () => {
    expect(siteDataEs.sideProjects.length).toBe(siteDataEn.sideProjects.length);
    expect(siteDataEs.experience.length).toBe(siteDataEn.experience.length);
    expect(siteDataEs.metrics.length).toBe(siteDataEn.metrics.length);
  });
});
