"use client";

import { useState, useEffect } from "react";
import { VisitorContext, generateVisitorGreeting, parseOSFromUA, parseLanguageName } from "./visitor-context";
import { useLanguage } from "@/src/context/LanguageContext";

export function useVisitorContext() {
  const { locale } = useLanguage();
  const [context, setContext] = useState<VisitorContext | null>(null);
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    async function resolveContext() {
      const clientLang = locale || (typeof navigator !== "undefined" ? navigator.language || "en" : "en");
      const clientUA = typeof navigator !== "undefined" ? navigator.userAgent : "";
      const clientOS = parseOSFromUA(clientUA);
      const parsedLang = parseLanguageName(clientLang);
      const clientTimeZone = typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : undefined;
      const clientLocalTime = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

      let resolved: VisitorContext = {
        ip: "127.0.0.1",
        country: "El Salvador",
        os: clientOS,
        language: parsedLang.name,
        languageCode: locale || parsedLang.code,
        timeZone: clientTimeZone,
        localTime: clientLocalTime,
      };

      try {
        const cached = sessionStorage.getItem("clippo_visitor_ctx");
        if (cached) {
          const parsed = JSON.parse(cached) as VisitorContext;
          if (parsed.ip && parsed.country) {
            resolved = {
              ...parsed,
              timeZone: clientTimeZone || parsed.timeZone,
              localTime: clientLocalTime,
              language: parsedLang.name,
              languageCode: locale || parsedLang.code,
            };
            if (isMounted) {
              setContext(resolved);
              setGreeting(generateVisitorGreeting(resolved));
            }
            return;
          }
        }
      } catch {
        // Ignore sessionStorage read error
      }

      try {
        const res = await fetch("/api/visitor-context", {
          headers: { "Cache-Control": "no-cache" },
          signal: AbortSignal.timeout(3000),
        });

        if (res.ok) {
          const serverData = await res.json();
          if (serverData.ip && serverData.country && !serverData.needsClientGeo) {
            resolved = {
              ip: serverData.ip,
              country: serverData.country,
              city: serverData.city,
              latitude: serverData.latitude,
              longitude: serverData.longitude,
              timeZone: serverData.timeZone || clientTimeZone,
              localTime: serverData.localTime || clientLocalTime,
              weather: serverData.weather,
              rodrigoContext: serverData.rodrigoContext,
              os: clientOS !== "Unknown OS" ? clientOS : serverData.os || resolved.os,
              language: parsedLang.name,
              languageCode: locale || parsedLang.code,
            };
          } else {
            try {
              const clientGeoRes = await fetch("https://ipwho.is/", {
                signal: AbortSignal.timeout(3000),
              });
              if (clientGeoRes.ok) {
                const geo = await clientGeoRes.json();
                if (geo.success !== false) {
                  resolved = {
                    ip: geo.ip || resolved.ip,
                    country: geo.country || resolved.country,
                    city: geo.city || undefined,
                    latitude: geo.latitude,
                    longitude: geo.longitude,
                    timeZone: geo.timezone?.id || clientTimeZone,
                    localTime: clientLocalTime,
                    rodrigoContext: serverData.rodrigoContext,
                    os: clientOS,
                    language: parsedLang.name,
                    languageCode: locale || parsedLang.code,
                  };

                  if (geo.latitude && geo.longitude) {
                    try {
                      const weatherRes = await fetch(
                        `https://api.open-meteo.com/v1/forecast?latitude=${geo.latitude}&longitude=${geo.longitude}&current=temperature_2m,weather_code&timezone=auto`,
                        { signal: AbortSignal.timeout(2000) }
                      );
                      if (weatherRes.ok) {
                        const weatherData = await weatherRes.json();
                        const temp = weatherData?.current?.temperature_2m;
                        if (typeof temp === "number") {
                          resolved.weather = {
                            tempC: Math.round(temp),
                            tempF: Math.round((temp * 9) / 5 + 32),
                          };
                        }
                      }
                    } catch {
                      // Weather fetch fallback
                    }
                  }
                }
              }
            } catch {
              // Graceful fallback
            }
          }
        }
      } catch {
        // Fallback
      }

      if (isMounted) {
        setContext(resolved);
        setGreeting(generateVisitorGreeting(resolved));
        try {
          sessionStorage.setItem("clippo_visitor_ctx", JSON.stringify(resolved));
        } catch {
          // Ignore sessionStorage write error
        }
      }
    }

    resolveContext();

    return () => {
      isMounted = false;
    };
  }, [locale]);

  return { context, greeting };
}
