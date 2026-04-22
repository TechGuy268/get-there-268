import { getAnthropicClient, MODEL } from "@/lib/ai/client";
import { buildAnalyticsSystemPrompt } from "@/lib/ai/prompts";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  const { message } = await req.json();

  if (!message?.trim()) {
    return new Response(JSON.stringify({ error: "Message is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: object) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      try {
        const client = getAnthropicClient();
        const systemPrompt = buildAnalyticsSystemPrompt(null);

        const response = await client.messages.create({
          model: MODEL,
          max_tokens: 1024,
          system: systemPrompt,
          messages: [{ role: "user", content: message }],
          stream: true,
        });

        let fullText = "";

        for await (const event of response) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            fullText += event.delta.text;
            send({ text: event.delta.text });
          }
        }

        // Try to parse JSON response from LLM
        try {
          const parsed = JSON.parse(fullText);
          send({
            done: true,
            nlAnswer: parsed.nlAnswer ?? parsed.explanation ?? fullText,
            queryResult: {
              id: crypto.randomUUID(),
              queryText: message,
              generatedSql: parsed.sql ?? null,
              confidence: parsed.confidence ?? null,
              chartType: parsed.chartType ?? null,
              chartData: parsed.chartData
                ? {
                    type: parsed.chartType ?? "bar",
                    data: [],
                    xKey: parsed.chartData.xKey,
                    yKeys: parsed.chartData.yKeys,
                  }
                : null,
              nlAnswer: parsed.nlAnswer ?? null,
              rowCount: 0,
              executionTimeMs: 0,
              createdAt: new Date().toISOString(),
            },
          });
        } catch {
          send({ done: true, nlAnswer: fullText });
        }
      } catch (err) {
        send({ error: err instanceof Error ? err.message : "Unknown error" });
      } finally {
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
