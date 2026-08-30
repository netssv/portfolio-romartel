import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchWeatherForCoords, getRodrigoZoneContext, getLocalTimeString, SAN_SALVADOR_GEO } from "../weather";
import { buildSystemInstruction } from "../chatbot-prompt";

describe("Weather and Zone Context Telemetry", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns fallback data gracefully when weather API fails or times out", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(new Error("Network timeout"));
    const weather = await fetchWeatherForCoords(13.69, -89.21);
    expect(weather).toBeNull();
  });

  it("parses valid Open-Meteo response into WeatherInfo", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        current: {
          temperature_2m: 24.6,
          is_day: 1,
          weather_code: 61,
        },
      }),
    } as Response);

    const weather = await fetchWeatherForCoords(40.71, -74.00);
    expect(weather).not.toBeNull();
    expect(weather?.tempC).toBe(25);
    expect(weather?.tempF).toBe(77);
    expect(weather?.condition).toBe("Slight rain");
    expect(weather?.conditionEs).toBe("Lluvia ligera");
    expect(weather?.isRain).toBe(true);
  });

  it("retrieves Rodrigo's San Salvador CST zone context", async () => {
    const zone = await getRodrigoZoneContext();
    expect(zone.city).toBe(SAN_SALVADOR_GEO.city);
    expect(zone.country).toBe(SAN_SALVADOR_GEO.country);
    expect(zone.timeZone).toBe(SAN_SALVADOR_GEO.timeZone);
    expect(typeof zone.localTime).toBe("string");
    expect(zone.weather).toBeDefined();
    expect(typeof zone.weather.tempC).toBe("number");
  });

  it("formats local time string for a given timezone", () => {
    const timeStr = getLocalTimeString("America/El_Salvador");
    expect(timeStr).toBeDefined();
    expect(timeStr.length).toBeGreaterThan(0);
  });

  it("builds system instruction containing recruiter icebreaker guidance and environment context", () => {
    const instruction = buildSystemInstruction("top", {
      city: "New York",
      country: "United States",
      localTime: "3:30 PM",
      timeZone: "America/New_York",
      weather: {
        tempC: 5,
        tempF: 41,
        condition: "Slight snow",
        conditionEs: "Nevada ligera",
        isSnow: true,
      },
      rodrigoContext: {
        city: "San Salvador",
        country: "El Salvador",
        timeZone: "America/El_Salvador",
        localTime: "1:30 PM CST",
        weather: {
          tempC: 29,
          condition: "Clear sky",
          conditionEs: "Cielo despejado",
        },
      },
    });

    expect(instruction).toContain("Rodrigo's Base: San Salvador, El Salvador");
    expect(instruction).toContain("America/El_Salvador (CST/UTC-6)");
    expect(instruction).toContain("New York, United States");
    expect(instruction).toContain("Slight snow");
    expect(instruction).toContain("Weather Radar");
    expect(instruction).toContain("Time & Daypart Nuance");
    expect(instruction).toContain("Visitor Identity");
  });
});
