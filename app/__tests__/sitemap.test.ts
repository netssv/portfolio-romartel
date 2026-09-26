import { describe, it, expect, beforeEach, afterEach } from "vitest";
import sitemap from "../sitemap";
import robots from "../robots";

describe("Sitemap and Robots Route Metadata", () => {
  const originalEnv = process.env.NEXT_PUBLIC_BASE_URL;

  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_BASE_URL;
  });

  afterEach(() => {
    if (originalEnv) {
      process.env.NEXT_PUBLIC_BASE_URL = originalEnv;
    } else {
      delete process.env.NEXT_PUBLIC_BASE_URL;
    }
  });

  it("generates sitemap with default base URL and valid active routes", () => {
    const map = sitemap();
    expect(map).toHaveLength(1);
    expect(map[0].url).toBe("https://romartel.vercel.app");
    expect(map[0].changeFrequency).toBe("weekly");
    expect(map[0].priority).toBe(1);
    expect(map[0].lastModified).toBeInstanceOf(Date);
  });

  it("respects NEXT_PUBLIC_BASE_URL environment variable in sitemap", () => {
    process.env.NEXT_PUBLIC_BASE_URL = "https://example.com";
    const map = sitemap();
    expect(map[0].url).toBe("https://example.com");
  });

  it("generates robots.txt referencing correct sitemap url and rules", () => {
    const rob = robots();
    expect(rob.sitemap).toBe("https://romartel.vercel.app/sitemap.xml");
    expect(rob.rules).toEqual([
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/private/", "/api/"],
      },
      {
        userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "Amazonbot"],
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/private/", "/api/"],
      },
    ]);
  });
});
