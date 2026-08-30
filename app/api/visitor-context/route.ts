import { NextRequest, NextResponse } from "next/server";
import { parseOSFromUA, parseLanguageName, VisitorContext } from "@/src/lib/visitor-context";
import { fetchWeatherForCoords, getRodrigoZoneContext, getLocalTimeString } from "@/src/lib/weather";

export const dynamic = "force-dynamic";

function extractIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0].trim();
    if (first && first !== "::1" && first !== "127.0.0.1") return first;
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp && realIp !== "::1" && realIp !== "127.0.0.1") return realIp.trim();

  const cfIp = req.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  return "";
}

export async function GET(req: NextRequest) {
  try {
    const rawIp = extractIp(req);
    const userAgent = req.headers.get("user-agent") || "";
    const acceptLanguage = req.headers.get("accept-language") || "es";
    const primaryLang = acceptLanguage.split(",")[0].trim().split(";")[0];

    const vercelCountry = req.headers.get("x-vercel-ip-country");
    const vercelCity = req.headers.get("x-vercel-ip-city");
    const vercelLat = req.headers.get("x-vercel-ip-latitude");
    const vercelLon = req.headers.get("x-vercel-ip-longitude");
    const vercelTimezone = req.headers.get("x-vercel-ip-timezone");
    const cfCountry = req.headers.get("cf-ipcountry");

    const country = vercelCountry || cfCountry || "";
    const city = vercelCity ? decodeURIComponent(vercelCity) : "";
    const latitude = vercelLat ? parseFloat(vercelLat) : undefined;
    const longitude = vercelLon ? parseFloat(vercelLon) : undefined;
    const timeZone = vercelTimezone || undefined;

    const os = parseOSFromUA(userAgent);
    const langInfo = parseLanguageName(primaryLang);

    const [visitorWeather, rodrigoContext] = await Promise.all([
      latitude && longitude ? fetchWeatherForCoords(latitude, longitude) : Promise.resolve(null),
      getRodrigoZoneContext(),
    ]);

    const context: Partial<VisitorContext> & { needsClientGeo?: boolean } = {
      ip: rawIp,
      country: country || undefined,
      city: city || undefined,
      latitude,
      longitude,
      timeZone,
      localTime: timeZone ? getLocalTimeString(timeZone) : undefined,
      weather: visitorWeather ? {
        tempC: visitorWeather.tempC,
        tempF: visitorWeather.tempF,
        condition: visitorWeather.condition,
        conditionEs: visitorWeather.conditionEs,
        isRain: visitorWeather.isRain,
        isSnow: visitorWeather.isSnow,
      } : undefined,
      rodrigoContext: {
        city: rodrigoContext.city,
        country: rodrigoContext.country,
        timeZone: rodrigoContext.timeZone,
        localTime: rodrigoContext.localTime,
        weather: {
          tempC: rodrigoContext.weather.tempC,
          condition: rodrigoContext.weather.condition,
          conditionEs: rodrigoContext.weather.conditionEs,
        },
      },
      os,
      language: langInfo.name,
      languageCode: langInfo.code,
      needsClientGeo: !country || !rawIp || rawIp === "127.0.0.1" || rawIp === "::1",
    };

    return NextResponse.json(context);
  } catch {
    return NextResponse.json({
      needsClientGeo: true,
      os: "Unknown OS",
      language: "español",
      languageCode: "es",
    });
  }
}
