import { NextRequest, NextResponse } from "next/server";
import {
  getGeminiClient,
  buildSystemInstruction,
  CHATBOT_TOOL_DECLARATIONS,
} from "@/src/lib/gemini";
import {
  executeSendContactEmail,
  executeGetBtcTelemetry,
  executeGetSiteJson,
  SendEmailArgs,
} from "@/src/lib/chatbot-tools";

interface IncomingMessage {
  role: "user" | "model";
  text: string;
}

function normalizeContents(messages: IncomingMessage[]) {
  // Gemini API requires conversation to start with a user turn
  const firstUserIndex = messages.findIndex((m) => m.role === "user");
  if (firstUserIndex === -1) return [];

  // Limit context to last 6 messages for faster generation
  const recentMessages = messages.slice(firstUserIndex).slice(-6);
  const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

  for (const m of recentMessages) {
    const text = (m.text || "").trim();
    if (!text) continue;

    const role = m.role === "user" ? "user" : "model";
    const lastEntry = contents[contents.length - 1];

    if (lastEntry && lastEntry.role === role) {
      lastEntry.parts[0].text += `\n${text}`;
    } else {
      contents.push({ role, parts: [{ text }] });
    }
  }

  return contents;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawMessages: IncomingMessage[] = body.messages || [];
    const currentSection = typeof body.currentSection === "string" ? body.currentSection : undefined;
    const visitorContext = body.visitorContext && typeof body.visitorContext === "object" ? body.visitorContext : undefined;

    const contents = normalizeContents(rawMessages);
    if (contents.length === 0) {
      return NextResponse.json(
        { error: "A valid user message is required to start the conversation." },
        { status: 400 }
      );
    }

    const ai = getGeminiClient();
    const systemInstruction = buildSystemInstruction(currentSection, visitorContext);

    // Primary model: gemini-3.5-flash-lite (fast latency) with gemini-3.6-flash fallback
    const PRIMARY_MODEL = "gemini-3.5-flash-lite";
    const FALLBACK_MODEL = "gemini-3.6-flash";

    let initialResponse: Awaited<ReturnType<typeof ai.models.generateContent>>;
    try {
      initialResponse = await ai.models.generateContent({
        model: PRIMARY_MODEL,
        contents,
        config: {
          systemInstruction,
          temperature: 0.3,
          maxOutputTokens: 600,
          tools: [{ functionDeclarations: CHATBOT_TOOL_DECLARATIONS }],
        },
      });
    } catch {
      initialResponse = await ai.models.generateContent({
        model: FALLBACK_MODEL,
        contents,
        config: {
          systemInstruction,
          temperature: 0.3,
          maxOutputTokens: 600,
          tools: [{ functionDeclarations: CHATBOT_TOOL_DECLARATIONS }],
        },
      });
    }

    const functionCalls = initialResponse.functionCalls;

    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0];
      let toolResult: unknown;
      let clientAction: Record<string, unknown> | undefined;

      if (call.name === "send_contact_email") {
        toolResult = await executeSendContactEmail(call.args as unknown as SendEmailArgs);
      } else if (call.name === "get_btc_telemetry") {
        toolResult = await executeGetBtcTelemetry();
      } else if (call.name === "get_site_json") {
        const args = (call.args || {}) as { section?: string };
        toolResult = executeGetSiteJson(args.section);
      } else if (call.name === "navigate_to_section") {
        const args = (call.args || {}) as { section?: string };
        const target = (args.section || "top").toLowerCase().replace("#", "");
        toolResult = { success: true, navigatedTo: target, message: `Navigated viewport to ${target} section.` };
        clientAction = { type: "NAVIGATE", target };
      } else if (call.name === "filter_projects") {
        const args = (call.args || {}) as { category?: string; tag?: string };
        toolResult = { success: true, category: args.category, tag: args.tag, message: "Filtered projects gallery." };
        clientAction = { type: "FILTER_PROJECTS", category: args.category, tag: args.tag };
      } else if (call.name === "set_site_preferences") {
        const args = (call.args || {}) as { language?: string; theme?: string };
        toolResult = { success: true, language: args.language, theme: args.theme, message: "Site preferences updated." };
        clientAction = { type: "SET_PREFERENCES", language: args.language, theme: args.theme };
      } else {
        toolResult = { error: `Unknown function ${call.name}` };
      }

      const modelTurn = initialResponse.candidates?.[0]?.content || {
        role: "model",
        parts: [{ functionCall: call }],
      };

      const toolContents = [
        ...contents,
        modelTurn,
        {
          role: "user",
          parts: [
            {
              functionResponse: {
                name: call.name,
                response: toolResult as Record<string, unknown>,
              },
            },
          ],
        },
      ];

      let secondResponse: Awaited<ReturnType<typeof ai.models.generateContent>>;
      try {
        secondResponse = await ai.models.generateContent({
          model: PRIMARY_MODEL,
          contents: toolContents,
          config: {
            systemInstruction,
            temperature: 0.3,
            maxOutputTokens: 800,
            tools: [{ functionDeclarations: CHATBOT_TOOL_DECLARATIONS }],
          },
        });
      } catch {
        secondResponse = await ai.models.generateContent({
          model: FALLBACK_MODEL,
          contents: toolContents,
          config: {
            systemInstruction,
            temperature: 0.3,
            maxOutputTokens: 800,
            tools: [{ functionDeclarations: CHATBOT_TOOL_DECLARATIONS }],
          },
        });
      }

      return NextResponse.json({
        reply: secondResponse.text || "Action executed successfully.",
        toolExecuted: call.name,
        clientAction,
      });
    }

    const replyText = initialResponse.text || "I am here to assist with Rodrigo's portfolio. How can I help?";
    return NextResponse.json({ reply: replyText });
  } catch (error: unknown) {
    const err = error as { message?: string; status?: number };
    console.error("[Clippo Chat API Error]:", error);

    const isRateLimit = typeof err?.message === "string" && (err.message.includes("429") || err.message.includes("quota") || err.message.includes("RESOURCE_EXHAUSTED"));

    if (isRateLimit) {
      return NextResponse.json({
        reply: "Soy Clippo. El servicio de IA recibió muchas consultas simultáneas y está en una breve pausa de enfriamiento de unos segundos. Por favor intenta preguntarme de nuevo en un instante.",
      });
    }

    const errorMessage =
      err?.message || "Failed to process request with AI assistant.";

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
