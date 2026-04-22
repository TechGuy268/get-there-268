import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center">
      <div className="w-12 h-12 rounded-xl bg-caribbean-500 flex items-center justify-center mb-6">
        <Zap className="w-6 h-6 text-white" strokeWidth={2.5} />
      </div>
      <h1 className="text-6xl font-bold text-foreground mb-3">404</h1>
      <h2 className="text-xl font-semibold text-foreground mb-2">Page not found</h2>
      <p className="text-muted-foreground mb-8 max-w-sm">
        We couldn&apos;t find what you were looking for. It may have moved or never existed.
      </p>
      <Link href="/">
        <Button className="bg-caribbean-500 hover:bg-caribbean-600 text-white">
          Back to home
        </Button>
      </Link>
    </div>
  );
}
