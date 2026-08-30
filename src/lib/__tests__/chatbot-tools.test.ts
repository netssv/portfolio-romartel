import { describe, it, expect, vi } from "vitest";
import { executeSendContactEmail, executeGetSiteJson } from "../chatbot-tools";

describe("executeSendContactEmail Validation & Gating", () => {
  it("rejects calls with missing or too-short name", async () => {
    const res = await executeSendContactEmail({
      name: "A",
      email: "valid@email.com",
      message: "Hello Rodrigo, let's talk about the project.",
    });
    expect(res.success).toBe(false);
    expect(res.error).toContain("VALIDATION_ERROR");
  });

  it("rejects invalid or placeholder emails", async () => {
    const testCases = [
      "invalid-email",
      "granfico@",
      "@domain.com",
      "user@example.com",
      "test@test.com",
      "user@unknown.com",
      "placeholder@domain.com",
    ];

    for (const email of testCases) {
      const res = await executeSendContactEmail({
        name: "Granfico",
        email,
        message: "Hello Rodrigo, I would like to hire you.",
      });
      expect(res.success).toBe(false);
      expect(res.error).toContain("VALIDATION_ERROR");
    }
  });

  it("rejects messages that are too short", async () => {
    const res = await executeSendContactEmail({
      name: "Valid Name",
      email: "client@company.com",
      message: "Hi",
    });
    expect(res.success).toBe(false);
    expect(res.error).toContain("VALIDATION_ERROR");
  });

  it("exports structured site json properly", () => {
    const projData = executeGetSiteJson("projects");
    expect(projData).toHaveProperty("sideProjects");

    const expData = executeGetSiteJson("experience");
    expect(expData).toHaveProperty("experience");
  });
});
