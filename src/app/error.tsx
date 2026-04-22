"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center">
      <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-6">
        <AlertTriangle className="w-6 h-6 text-destructive" />
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Something went wrong</h1>
      <p className="text-muted-foreground mb-8 max-w-sm">
        {error.message ?? "An unexpected error occurred. Please try again."}
      </p>
      <Button onClick={reset} className="bg-caribbean-500 hover:bg-caribbean-600 text-white">
        Try again
      </Button>
    </div>
  );
}
