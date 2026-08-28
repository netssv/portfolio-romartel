import { Resend } from "resend";
import siteData from "@/src/data/siteData.json";

export interface SendEmailArgs {
  name: string;
  email: string;
  purpose?: string;
  message: string;
}

export async function executeSendContactEmail(args: SendEmailArgs) {
  const { name, email, purpose = "General Inquiry", message } = args;

  if (!name || !email || !message) {
    return { success: false, error: "Missing required fields (name, email, or message)." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      error: "Resend API key is not configured. Email could not be delivered.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "rop.martel@gmail.com",
      replyTo: email,
      subject: `[Clippo Chatbot] New Message: ${purpose} from ${name}`,
      html: `
        <h2>New Message Received via Clippo Chatbot</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Purpose:</strong> ${purpose}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (result.error) {
      return { success: false, error: result.error.message };
    }

    return {
      success: true,
      message: `Email successfully delivered to Rodrigo Martel (rop.martel@gmail.com).`,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to send email";
    return { success: false, error: errorMsg };
  }
}

export async function executeGetBtcTelemetry() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);

    const [logsRes, contextRes] = await Promise.allSettled([
      fetch(
        `https://hodl-watcher-api.onrender.com/api/telemetry/logs?_t=${Date.now()}`,
        {
          cache: "no-store",
          signal: controller.signal,
          headers: { "Cache-Control": "no-cache, no-store, must-revalidate" },
        }
      ),
      fetch("https://hodl-watcher-api.onrender.com/api/practice/context", {
        signal: controller.signal,
      }),
    ]);
    clearTimeout(timeoutId);

    let telemetryData: any = null;
    let sentimentData: any = null;

    if (logsRes.status === "fulfilled" && logsRes.value.ok) {
      telemetryData = await logsRes.value.json();
    }
    if (contextRes.status === "fulfilled" && contextRes.value.ok) {
      const ctx = await contextRes.value.json();
      sentimentData = ctx?.data?.[ctx.data.length - 1] || null;
    }

    return {
      status: "online",
      pipeline: "HODL Watcher Cloud Pipeline",
      architecture: "$0/mo Serverless Make.com Cron + FastAPI on Render Cloud",
      watchdog: "Mempool Fee & Order Flow Watchdog",
      summary: "Verifying Bitcoin on-chain mempool fees and order book telemetry every 15 minutes.",
      sentiment: sentimentData
        ? {
            fearGreed: sentimentData.fear_greed,
            classification: sentimentData.fear_greed_classification,
            dxy: sentimentData.dxy,
          }
        : { fearGreed: 68, classification: "Greed", dxy: 104.2 },
      telemetry: telemetryData,
    };
  } catch {
    // Return static telemetry fallback
  }

  return {
    status: "online",
    pipeline: "HODL Watcher Cloud Pipeline",
    architecture: "$0/mo Serverless Make.com Cron + FastAPI on Render Cloud",
    watchdog: "Mempool Fee & Order Flow Watchdog",
    summary: "Verifying Bitcoin on-chain mempool fees and order book telemetry every 15 minutes.",
    sentiment: { fearGreed: 68, classification: "Greed", dxy: 104.2 },
  };
}

export function executeGetSiteJson(section?: string) {
  if (!section || section === "all") {
    return siteData;
  }
  const key = section.toLowerCase();
  if (key.includes("proj")) return { sideProjects: siteData.sideProjects };
  if (key.includes("exp")) return { experience: siteData.experience };
  if (key.includes("skill")) return { skillsMatrix: siteData.skillsMatrix };
  if (key.includes("prof")) return { profile: siteData.profile };
  if (key.includes("cert") || key.includes("cred") || key.includes("edu")) {
    return { credentials: siteData.credentials };
  }
  return siteData;
}
