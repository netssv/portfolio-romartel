export interface VisitorContext {
  ip: string;
  country: string;
  countryCode?: string;
  city?: string;
  os: string;
  language: string;
  languageCode: string;
}

export function parseOSFromUA(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (ua.includes("windows nt 10.0") || ua.includes("windows nt 11.0")) return "Windows";
  if (ua.includes("windows")) return "Windows";
  if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod")) return "iOS";
  if (ua.includes("macintosh") || ua.includes("mac os x")) return "macOS";
  if (ua.includes("android")) return "Android";
  if (ua.includes("cros")) return "ChromeOS";
  if (ua.includes("linux")) return "Linux";
  return "Unknown OS";
}

export function parseLanguageName(langCode: string): { name: string; isSpanish: boolean; isEnglish: boolean; code: string } {
  const primary = (langCode || "en").split("-")[0].toLowerCase();
  const isSpanish = primary === "es";
  const isEnglish = primary === "en";

  const map: Record<string, string> = {
    es: "español",
    en: "English",
    pt: "português",
    fr: "français",
    de: "Deutsch",
    it: "italiano",
    zh: "中文",
    ja: "日本語",
  };

  return {
    name: map[primary] || primary.toUpperCase(),
    isSpanish,
    isEnglish,
    code: primary,
  };
}

export function getOsRemark(os: string, isSpanish: boolean): string {
  const normalized = os.toLowerCase();
  if (normalized.includes("linux")) {
    return isSpanish
      ? "¡Creo que podemos ser camaradas, envíame un ping cuando gustes!"
      : "I think we can be comrades, send me a ping anytime!";
  }
  if (normalized.includes("mac")) {
    return isSpanish
      ? "Se nota el gusto por la sofisticación y los flujos de trabajo limpios."
      : "A refined taste for sophistication and clean workflows.";
  }
  if (normalized.includes("win")) {
    return isSpanish
      ? "Un clásico caballo de batalla listo para productividad y multitarea."
      : "A solid powerhouse ready for productivity and multitasking.";
  }
  if (normalized.includes("ios") || normalized.includes("android")) {
    return isSpanish
      ? "Experiencia ágil y fluida en movimiento."
      : "Agile and smooth mobile experience on the go.";
  }
  return isSpanish
    ? "Conectado desde tu estación de trabajo."
    : "Connected from your workstation.";
}

export function generateVisitorGreeting(context: VisitorContext): string {
  const { ip, country, os, languageCode } = context;
  const langMeta = parseLanguageName(languageCode);
  const osRemark = getOsRemark(os, langMeta.isSpanish);

  const displayIp = ip || "127.0.0.1";
  const displayCountry = country || "El Salvador";
  const displayOs = os || "System";

  if (langMeta.isSpanish) {
    return `Hola IP \`${displayIp}\`, veo que nos escribes desde **${displayCountry}** en **${displayOs}**. ${osRemark}\n\nDetecté tu navegador en **${langMeta.name}**, así que continuaremos en este idioma. Soy Clippo, el asistente de Rodrigo Martel. ¿En qué proyecto, arquitectura o certificación te gustaría que te guíe hoy?`;
  }

  return `Hello IP \`${displayIp}\`, I see you are visiting from **${displayCountry}** on **${displayOs}**. ${osRemark}\n\nSince your browser is set to **${langMeta.name}**, we can chat in this language. I am Clippo, Rodrigo Martel's AI assistant. Which project, system architecture, or credential would you like to explore?`;
}
