"use client";

import { useState, useEffect } from "react";
import { VisitorContext, generateVisitorGreeting, parseOSFromUA, parseLanguageName } from "./visitor-context";

export function useVisitorContext() {
  const [context, setContext] = useState<VisitorContext | null>(null);
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    async function resolveContext() {
      const clientLang = typeof navigator !== "undefined" ? navigator.language || "es" : "es";
      const clientUA = typeof navigator !== "undefined" ? navigator.userAgent : "";
      const clientOS = parseOSFromUA(clientUA);
      const parsedLang = parseLanguageName(clientLang);

      let resolved: VisitorContext = {
        ip: "127.0.0.1",
        country: "El Salvador",
        os: clientOS,
        language: parsedLang.name,
        languageCode: parsedLang.code,
      };

      try {
        const res = await fetch("/api/visitor-context", {
          headers: { "Cache-Control": "no-cache" },
        });

        if (res.ok) {
          const serverData = await res.json();
          if (serverData.ip && serverData.country && !serverData.needsClientGeo) {
            resolved = {
              ip: serverData.ip,
              country: serverData.country,
              city: serverData.city,
              os: clientOS !== "Unknown OS" ? clientOS : serverData.os || resolved.os,
              language: parsedLang.name,
              languageCode: parsedLang.code,
            };
          } else {
            // Client-side direct lookup to get actual ISP IP and Country from visitor's browser
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
                    os: clientOS,
                    language: parsedLang.name,
                    languageCode: parsedLang.code,
                  };
                }
              }
            } catch {
              // Graceful fallback if adblocker blocks ipwho.is
            }
          }
        }
      } catch {
        // Fallback
      }

      if (isMounted) {
        setContext(resolved);
        setGreeting(generateVisitorGreeting(resolved));
      }
    }

    resolveContext();

    return () => {
      isMounted = false;
    };
  }, []);

  return { context, greeting };
}
