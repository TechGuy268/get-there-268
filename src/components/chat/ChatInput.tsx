"use client";

import { useState, useRef, useCallback } from "react";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const suggestions = [
  "What was our best performing product last quarter?",
  "Show revenue by region as a chart",
  "How many new customers signed up this month?",
  "Compare this week's sales to last week",
];

export function ChatInput({ onSend, disabled, placeholder }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = useCallback(() => {
    const msg = value.trim();
    if (!msg || disabled) return;
    onSend(msg);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [value, disabled, onSend]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    const ta = e.target;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`;
  };

  return (
    <div className="space-y-3">
      {/* Suggestions */}
      <div className="flex gap-2 flex-wrap">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => { setValue(s); textareaRef.current?.focus(); }}
            className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors border border-border"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className={cn(
        "flex items-end gap-3 rounded-xl border bg-card p-3 transition-shadow",
        "focus-within:shadow-sm focus-within:border-caribbean-500/50"
      )}>
        <Sparkles className="w-4 h-4 text-caribbean-500 flex-shrink-0 mb-2" />
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={placeholder ?? "Ask anything about your data..."}
          disabled={disabled}
          rows={1}
          className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50 min-h-[36px] max-h-[160px]"
          aria-label="Chat input"
        />
        <Button
          size="icon"
          className="flex-shrink-0 h-8 w-8 rounded-lg bg-caribbean-500 hover:bg-caribbean-600 text-white"
          onClick={handleSend}
          disabled={!value.trim() || disabled}
          aria-label="Send message"
        >
          <Send className="w-3.5 h-3.5" />
        </Button>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        Press <kbd className="px-1.5 py-0.5 rounded border text-[10px] font-mono">Enter</kbd> to send,{" "}
        <kbd className="px-1.5 py-0.5 rounded border text-[10px] font-mono">Shift+Enter</kbd> for new line
      </p>
    </div>
  );
}
