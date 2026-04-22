import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create your free GET THERE 268 account",
};

const perks = [
  "100 AI queries free every month",
  "No credit card required",
  "Cancel anytime",
];

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-10 h-10 rounded-xl bg-caribbean-500 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Create your account</h1>
            <p className="text-sm text-muted-foreground mt-1">Start with GET THERE 268 for free</p>
          </div>
        </div>

        <ul className="space-y-2">
          {perks.map((p) => (
            <li key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-reef-500 flex-shrink-0" />
              {p}
            </li>
          ))}
        </ul>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" type="text" placeholder="Jane Smith" autoComplete="name" required className="h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Work email</Label>
            <Input id="email" type="email" placeholder="jane@company.com" autoComplete="email" required className="h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Min. 8 characters" autoComplete="new-password" minLength={8} required className="h-11" />
          </div>
          <Button type="submit" className="w-full h-11 bg-caribbean-500 hover:bg-caribbean-600 text-white">
            Create free account
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            By signing up you agree to our{" "}
            <Link href="/terms" className="underline">Terms</Link> and{" "}
            <Link href="/privacy" className="underline">Privacy Policy</Link>.
          </p>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-caribbean-600 hover:text-caribbean-700 font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
