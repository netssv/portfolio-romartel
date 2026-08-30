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
    const PRIMARY_MODEL = "gemini-3.5-flash-lite";
    const FALLBACK_MODEL = "gemini-3.6-flash";

    const generateWithFallback = async (
      contentPayload: Parameters<typeof ai.models.generateContent>[0]["contents"],
      maxTokens = 600
    ) => {
      const config = {
        systemInstruction,
        temperature: 0.3,
        maxOutputTokens: maxTokens,
        tools: [{ functionDeclarations: CHATBOT_TOOL_DECLARATIONS }],
      };
      try {
        return await ai.models.generateContent({ model: PRIMARY_MODEL, contents: contentPayload, config });
      } catch {
        return await ai.models.generateContent({ model: FALLBACK_MODEL, contents: contentPayload, config });
      }
    };

    const initialResponse = await generateWithFallback(contents, 600);
    const functionCalls = initialResponse.functionCalls;

    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0];
      let toolResult: unknown;
      let clientAction: Record<string, unknown> | undefined;

      const isSpanish = visitorContext?.languageCode === "es" || (visitorContext?.language || "").toLowerCase().includes("spanish");

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
        clientAction = { type: "NAVIGATE", target };
        return NextResponse.json({
          reply: isSpanish ? `Te he llevado a la sección de ${target}.` : `Navigated to the ${target} section.`,
          toolExecuted: call.name,
          clientAction,
        });
      } else if (call.name === "filter_projects") {
        const args = (call.args || {}) as { category?: string; tag?: string };
        clientAction = { type: "FILTER_PROJECTS", category: args.category, tag: args.tag };
        return NextResponse.json({
          reply: isSpanish ? "He filtrado los proyectos en la galería." : "Filtered projects in the gallery.",
          toolExecuted: call.name,
          clientAction,
        });
      } else if (call.name === "set_site_preferences") {
        const args = (call.args || {}) as { language?: string; theme?: string };
        clientAction = { type: "SET_PREFERENCES", language: args.language, theme: args.theme };
        return NextResponse.json({
          reply: isSpanish ? "Preferencias del sitio actualizadas." : "Site preferences updated.",
          toolExecuted: call.name,
          clientAction,
        });
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
          parts: [{ functionResponse: { name: call.name, response: toolResult as Record<string, unknown> } }],
        },
      ];

      const secondResponse = await generateWithFallback(toolContents, 800);

      return NextResponse.json({
        reply: secondResponse.text || (isSpanish ? "Acción ejecutada correctamente." : "Action executed successfully."),
        toolExecuted: call.name,
        clientAction,
      });
    }

    const replyText = initialResponse.text || "I am here to assist with Rodrigo's portfolio. How can I help?";
    return NextResponse.json({ reply: replyText });
  } catch (error: unknown) {
    const err = error as { message?: string; status?: number; cause?: { code?: string } };
    console.error("[Clippo Chat API Error]:", error);

    const msg = typeof err?.message === "string" ? err.message : "";
    const isRateLimit = msg.includes("429") || msg.includes("quota") || msg.includes("RESOURCE_EXHAUSTED");
    if (isRateLimit) {
      return NextResponse.json({
        reply: "Soy Clippo. El servicio de IA recibió muchas consultas simultáneas y está en una breve pausa de enfriamiento. Por favor intenta de nuevo en un momento.",
      });
    }

    const isTimeout = msg.includes("fetch failed") || msg.includes("ConnectTimeoutError") || msg.includes("ETIMEDOUT") || err?.cause?.code === "UND_ERR_CONNECT_TIMEOUT";
    if (isTimeout) {
      return NextResponse.json({
        reply: "Clippo experimentó un breve tiempo de espera de conexión con el servicio de IA. Por favor intenta enviar tu mensaje nuevamente.",
      });
    }

    return NextResponse.json(
      { error: msg || "Failed to process request with AI assistant." },
      { status: 500 }
    );
  }
}
