import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { GET } from "../route";

describe("Telemetry API Route (app/api/telemetry/route.ts)", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("returns status: 'live' when Render responds with valid data", async () => {
    const mockData = {
      service: "HODL Watcher Cloud Pipeline",
      count: 2,
      events: [
        {
          id: 101,
          timestamp: new Date().toISOString(),
          source: "make-cron",
          task: "Fee Estimator Check",
          status: "ok",
        },
      ],
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockData,
    });

    const response = await GET();
    expect(response.status).toBe(200);

    const json = await response.json();
    expect(json.status).toBe("live");
    expect(json.count).toBe(2);
    expect(json.events).toHaveLength(1);
    expect(json.last_real_data_timestamp).toBeTruthy();
  });

  it("NEVER returns status: 'online' when Render API fails with 503 Service Unavailable", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 503,
      json: async () => ({ message: "Service Unavailable" }),
    });

    const response = await GET();
    const json = await response.json();

    // Critical Acceptance Criteria: Cannot be "online"
    expect(json.status).not.toBe("online");
    expect(json.status).toBe("waking_up");
  });

  it("NEVER returns status: 'online' when Render API network request throws an error", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Connection refused"));

    const response = await GET();
    const json = await response.json();

    // Critical Acceptance Criteria: Cannot be "online"
    expect(json.status).not.toBe("online");
    expect(json.status).toBe("offline");
  });
});
