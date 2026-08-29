import siteDataEn from "./siteData.en.json";
import siteDataEs from "./siteData.es.json";
import { uiEn } from "./ui.en";
import { uiEs } from "./ui.es";

export type Locale = "en" | "es";

export type SiteData = typeof siteDataEn;
export type UiTranslations = typeof uiEn;

export const dictionaries: Record<Locale, { data: SiteData; ui: UiTranslations }> = {
  en: {
    data: siteDataEn,
    ui: uiEn,
  },
  es: {
    data: siteDataEs,
    ui: uiEs,
  },
};
