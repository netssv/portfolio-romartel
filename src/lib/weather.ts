export interface WeatherInfo {
  tempC: number;
  tempF: number;
  condition: string;
  conditionEs: string;
  weatherCode: number;
  isDay: boolean;
  isRain: boolean;
  isSnow: boolean;
}

export interface RodrigoZoneContext {
  city: string;
  country: string;
  timeZone: string;
  localTime: string;
  weather: WeatherInfo;
}

const WMO_CODES: Record<number, { en: string; es: string; rain?: boolean; snow?: boolean }> = {
  0: { en: "Clear sky", es: "Cielo despejado" },
  1: { en: "Mainly clear", es: "Mayormente despejado" },
  2: { en: "Partly cloudy", es: "Parcialmente nublado" },
  3: { en: "Overcast", es: "Nublado" },
  45: { en: "Foggy", es: "Niebla" },
  48: { en: "Depositing rime fog", es: "Niebla escarchada" },
  51: { en: "Light drizzle", es: "Llovizna ligera", rain: true },
  53: { en: "Moderate drizzle", es: "Llovizna moderada", rain: true },
  55: { en: "Dense drizzle", es: "Llovizna densa", rain: true },
  61: { en: "Slight rain", es: "Lluvia ligera", rain: true },
  63: { en: "Moderate rain", es: "Lluvia moderada", rain: true },
  65: { en: "Heavy rain", es: "Lluvia fuerte", rain: true },
  71: { en: "Slight snow", es: "Nevada ligera", snow: true },
  73: { en: "Moderate snow", es: "Nevada moderada", snow: true },
  75: { en: "Heavy snow", es: "Nevada fuerte", snow: true },
  77: { en: "Snow grains", es: "Granizo menudo", snow: true },
  80: { en: "Slight rain showers", es: "Chubascos ligeros", rain: true },
  81: { en: "Moderate rain showers", es: "Chubascos moderados", rain: true },
  82: { en: "Violent rain showers", es: "Chubascos violentos", rain: true },
  85: { en: "Slight snow showers", es: "Chubascos de nieve ligeros", snow: true },
  86: { en: "Heavy snow showers", es: "Chubascos de nieve intensos", snow: true },
  95: { en: "Thunderstorm", es: "Tormenta eléctrica", rain: true },
  96: { en: "Thunderstorm with slight hail", es: "Tormenta con granizo ligero", rain: true },
  99: { en: "Thunderstorm with heavy hail", es: "Tormenta con granizo fuerte", rain: true },
};

export const SAN_SALVADOR_GEO = {
  city: "San Salvador",
  country: "El Salvador",
  timeZone: "America/El_Salvador",
  latitude: 13.6929,
  longitude: -89.2182,
};

const weatherCache = new Map<string, { data: WeatherInfo; timestamp: number }>();
const CACHE_TTL_MS = 10 * 60 * 1000;

export function getLocalTimeString(timeZone: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(new Date());
  } catch {
    return new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  }
}

export async function fetchWeatherForCoords(lat: number, lon: number): Promise<WeatherInfo | null> {
  const roundedLat = Math.round(lat * 100) / 100;
  const roundedLon = Math.round(lon * 100) / 100;
  const cacheKey = `${roundedLat},${roundedLon}`;

  const cached = weatherCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${roundedLat}&longitude=${roundedLon}&current=temperature_2m,is_day,weather_code&timezone=auto`;
    const res = await fetch(url, { signal: AbortSignal.timeout(2500) });
    if (!res.ok) return null;

    const data = await res.json();
    const current = data?.current;
    if (!current || typeof current.temperature_2m !== "number") return null;

    const tempC = Math.round(current.temperature_2m);
    const tempF = Math.round((tempC * 9) / 5 + 32);
    const code = typeof current.weather_code === "number" ? current.weather_code : 0;
    const meta = WMO_CODES[code] || { en: "Fair", es: "Despejado" };

    const weatherInfo: WeatherInfo = {
      tempC,
      tempF,
      condition: meta.en,
      conditionEs: meta.es,
      weatherCode: code,
      isDay: current.is_day === 1,
      isRain: !!meta.rain,
      isSnow: !!meta.snow,
    };

    weatherCache.set(cacheKey, { data: weatherInfo, timestamp: Date.now() });
    return weatherInfo;
  } catch {
    return null;
  }
}

export async function getRodrigoZoneContext(): Promise<RodrigoZoneContext> {
  const localTime = getLocalTimeString(SAN_SALVADOR_GEO.timeZone);
  const liveWeather = await fetchWeatherForCoords(SAN_SALVADOR_GEO.latitude, SAN_SALVADOR_GEO.longitude);

  const fallbackWeather: WeatherInfo = {
    tempC: 28,
    tempF: 82,
    condition: "Partly cloudy",
    conditionEs: "Parcialmente nublado",
    weatherCode: 2,
    isDay: true,
    isRain: false,
    isSnow: false,
  };

  return {
    city: SAN_SALVADOR_GEO.city,
    country: SAN_SALVADOR_GEO.country,
    timeZone: SAN_SALVADOR_GEO.timeZone,
    localTime,
    weather: liveWeather || fallbackWeather,
  };
}
