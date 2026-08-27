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

  // Limit context to last 10 messages
  const recentMessages = messages.slice(firstUserIndex).slice(-10);
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

    const contents = normalizeContents(rawMessages);
    if (contents.length === 0) {
      return NextResponse.json(
        { error: "A valid user message is required to start the conversation." },
        { status: 400 }
      );
    }

    const ai = getGeminiClient();
    const systemInstruction = buildSystemInstruction();

    // Initial model invocation with low temperature for precision
    const initialResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.3,
        maxOutputTokens: 800,
        thinkingConfig: { thinkingBudget: 0 },
        tools: [{ functionDeclarations: CHATBOT_TOOL_DECLARATIONS }],
      },
    });

    const functionCalls = initialResponse.functionCalls;

    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0];
      let toolResult: any;

      if (call.name === "send_contact_email") {
        toolResult = await executeSendContactEmail(call.args as unknown as SendEmailArgs);
      } else if (call.name === "get_btc_telemetry") {
        toolResult = await executeGetBtcTelemetry();
      } else if (call.name === "get_site_json") {
        const args = (call.args || {}) as { section?: string };
        toolResult = executeGetSiteJson(args.section);
      } else {
        toolResult = { error: `Unknown function ${call.name}` };
      }

      const toolContents = [
        ...contents,
        {
          role: "model",
          parts: [{ functionCall: call }],
        },
        {
          role: "tool",
          parts: [
            {
              functionResponse: {
                name: call.name,
                response: toolResult,
              },
            },
          ],
        },
      ];

      const secondResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: toolContents,
        config: {
          systemInstruction,
          temperature: 0.3,
          maxOutputTokens: 800,
          thinkingConfig: { thinkingBudget: 0 },
        },
      });

      return NextResponse.json({
        reply: secondResponse.text || "Action executed successfully.",
        toolExecuted: call.name,
      });
    }

    const replyText = initialResponse.text || "I am here to assist with Rodrigo's portfolio. How can I help?";
    return NextResponse.json({ reply: replyText });
  } catch (error: unknown) {
    const err = error as { message?: string; status?: number };
    console.error("[Clippo Chat API Error]:", error);

    const errorMessage =
      err?.message || "Failed to process request with AI assistant.";

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
