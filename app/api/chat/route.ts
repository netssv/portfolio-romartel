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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: IncomingMessage[] = body.messages || [];

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "A non-empty list of messages is required." },
        { status: 400 }
      );
    }

    const ai = getGeminiClient();
    const systemInstruction = buildSystemInstruction();

    const contents: any[] = messages.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    // Initial model invocation with zero thinking budget
    const initialResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
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

      // Append model call and tool execution result to contents
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
          temperature: 0.7,
          maxOutputTokens: 800,
          thinkingConfig: { thinkingBudget: 0 },
        },
      });

      return NextResponse.json({
        reply: secondResponse.text || "Action executed successfully.",
        toolExecuted: call.name,
      });
    }

    const replyText = initialResponse.text || "No response generated.";
    return NextResponse.json({ reply: replyText });
  } catch (error: unknown) {
    const err = error as { message?: string };
    const errorMessage = err?.message || "Internal server error";

    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "development"
            ? errorMessage
            : "Failed to process request. Please check GEMINI_API_KEY.",
      },
      { status: 500 }
    );
  }
}
