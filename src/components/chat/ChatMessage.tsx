"use client";

import { Sparkles, User, ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChartWidget } from "@/components/dashboard/ChartWidget";
import { Badge } from "@/components/ui/badge";
import type { ChatMessage as ChatMessageType } from "@/types";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [showSql, setShowSql] = useState(false);
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const confidence = message.queryResult?.confidence;
  const sql = message.queryResult?.generatedSql;
  const chartData = message.queryResult?.chartData;
  const nlAnswer = message.queryResult?.nlAnswer;

  const handleCopySql = () => {
    if (sql) {
      navigator.clipboard.writeText(sql);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={cn("flex gap-3 animate-fade-in", isUser && "flex-row-reverse")}>
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5",
          isUser ? "bg-ocean-700" : "bg-caribbean-500"
        )}
        aria-label={isUser ? "You" : "AI assistant"}
      >
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Sparkles className="w-4 h-4 text-white" />
        )}
      </div>

      {/* Content */}
      <div className={cn("flex-1 max-w-2xl space-y-3", isUser && "flex flex-col items-end")}>
        {/* Bubble */}
        <div
          className={cn(
            "rounded-xl px-4 py-3 text-sm",
            isUser
              ? "bg-caribbean-500 text-white"
              : "bg-card border border-border text-foreground"
          )}
        >
          {message.isStreaming && !message.content ? (
            <div className="flex gap-1 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
            </div>
          ) : (
            <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
          )}
        </div>

        {/* NL Answer */}
        {nlAnswer && (
          <div className="bg-caribbean-50 dark:bg-caribbean-950/30 border border-caribbean-200 dark:border-caribbean-800 rounded-xl px-4 py-3 text-sm text-caribbean-900 dark:text-caribbean-100">
            {nlAnswer}
          </div>
        )}

        {/* Chart */}
        {chartData && (
          <div className="w-full">
            <ChartWidget
              title={message.queryResult?.queryText ?? "Query Result"}
              data={chartData}
            />
          </div>
        )}

        {/* Confidence + SQL toggle */}
        {!isUser && (confidence !== undefined || sql) && (
          <div className="flex items-center gap-2 flex-wrap">
            {confidence != null && (
              <Badge
                variant="outline"
                className={cn(
                  "text-xs",
                  confidence >= 85
                    ? "border-reef-300 text-reef-700 bg-reef-50"
                    : confidence >= 65
                    ? "border-caribbean-300 text-caribbean-700 bg-caribbean-50"
                    : "border-orange-300 text-orange-700 bg-orange-50"
                )}
              >
                {confidence}% confidence
              </Badge>
            )}
            {sql && (
              <button
                onClick={() => setShowSql(!showSql)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {showSql ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                {showSql ? "Hide" : "View"} SQL
              </button>
            )}
          </div>
        )}

        {/* SQL Block */}
        {showSql && sql && (
          <div className="w-full rounded-xl bg-ocean-900 border border-ocean-800 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-ocean-800">
              <span className="text-xs text-ocean-400 font-mono">Generated SQL</span>
              <button
                onClick={handleCopySql}
                className="flex items-center gap-1 text-xs text-ocean-400 hover:text-white transition-colors"
                aria-label="Copy SQL"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="px-4 py-3 text-xs text-ocean-200 font-mono overflow-x-auto">
              <code>{sql}</code>
            </pre>
          </div>
        )}

        <p className="text-[10px] text-muted-foreground">
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </div>
  );
}
