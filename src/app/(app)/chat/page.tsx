"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Header } from "@/components/shared/Header";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessage } from "@/components/chat/ChatMessage";
import type { ChatMessage as ChatMessageType } from "@/types";

const WELCOME: ChatMessageType = {
  id: "welcome",
  role: "assistant",
  content:
    "Hello! I'm your AI data analyst for GET THERE 268. Ask me anything about your data — I'll write the SQL, run it, and show you the results as charts or plain English answers.",
  timestamp: new Date(),
};

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessageType[]>([WELCOME]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = useCallback(
    async (text: string) => {
      const userMsg: ChatMessageType = {
        id: crypto.randomUUID(),
        role: "user",
        content: text,
        timestamp: new Date(),
      };

      const assistantMsg: ChatMessageType = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "",
        isStreaming: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
        });

        if (!res.ok) throw new Error("Request failed");
        if (!res.body) throw new Error("No response body");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let fullContent = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const raw = line.slice(6).trim();
              if (raw === "[DONE]") break;
              try {
                const parsed = JSON.parse(raw);
                if (parsed.text) {
                  fullContent += parsed.text;
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantMsg.id
                        ? { ...m, content: fullContent, isStreaming: true }
                        : m
                    )
                  );
                }
                if (parsed.done) {
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantMsg.id
                        ? {
                            ...m,
                            content: parsed.nlAnswer ?? fullContent,
                            isStreaming: false,
                            queryResult: parsed.queryResult,
                          }
                        : m
                    )
                  );
                }
              } catch {
                // non-JSON chunk, ignore
              }
            }
          }
        }
      } catch {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsg.id
              ? {
                  ...m,
                  content:
                    "Sorry, something went wrong. Please try again.",
                  isStreaming: false,
                }
              : m
          )
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return (
    <div className="flex flex-col h-full">
      <Header
        title="AI Chat"
        description="Ask questions in plain English — get SQL, charts, and insights"
      />
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="border-t border-border p-4 bg-background/80 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto">
          <ChatInput onSend={handleSend} disabled={loading} />
        </div>
      </div>
    </div>
  );
}
