export interface VisitorContext {
  ip: string;
  country: string;
  countryCode?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  os: string;
  language: string;
  languageCode: string;
  localTime?: string;
  timeZone?: string;
  weather?: {
    tempC?: number;
    tempF?: number;
    condition?: string;
    conditionEs?: string;
    isRain?: boolean;
    isSnow?: boolean;
  };
  rodrigoContext?: {
    city: string;
    country: string;
    timeZone: string;
    localTime: string;
    weather?: {
      tempC?: number;
      condition?: string;
      conditionEs?: string;
    };
  };
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

export function detectConversationLanguage(
  messages: Array<{ role: string; text: string }>,
  fallbackCode = "es"
): string {
  const userMessages = messages.filter((m) => m.role === "user");
  const sampleText = userMessages.length > 0
    ? userMessages.map((m) => m.text).slice(-3).join(" ")
    : messages.map((m) => m.text).slice(-2).join(" ");

  if (!sampleText || sampleText.trim().length === 0) {
    return fallbackCode;
  }

  const esScore = (
    (sampleText.match(/[áéíóúüñ¿¡]/gi) || []).length * 2 +
    (sampleText.match(/\b(hola|buenos|buenas|gracias|proyectos|experiencia|habilidades|contacto|certificaciones|arquitectura|automatizaciones|como|cómo|cual|cuál|donde|dónde|que|qué|quién|quien|quiero|puedo|puedes|por favor|ayuda|saludos|este|esta|estos|estas|para|con|sobre|trabajo|desarrollo|acá|aqui|aquí|planifica|antes)\b/gi) || []).length
  );

  const enScore = (
    (sampleText.match(/\b(hello|hi|hey|thanks|thank you|projects|experience|skills|contact|credentials|architecture|automations|what|how|where|who|which|can you|please|help|tell me|show me|about|work|built|here|plan|ahead)\b/gi) || []).length
  );

  if (esScore > enScore && esScore > 0) return "es";
  if (enScore > esScore && enScore > 0) return "en";

  return fallbackCode;
}

export function getDeparturePhrase(languageCode: string): string {
  const primary = (languageCode || "en").split("-")[0].toLowerCase();
  switch (primary) {
    case "es":
      return "Si quieres seguir acá estoy";
    case "pt":
      return "Se quiser continuar estou aqui";
    case "fr":
      return "Si vous souhaitez continuer, je suis là";
    case "de":
      return "Wenn Sie fortfahren möchten, bin ich hier! Planen Sie Ihre Fragen gerne im Voraus.";
    case "en":
    default:
      return "If you'd like to continue, I'm right here! Feel free to plan your questions anytime.";
  }
}
