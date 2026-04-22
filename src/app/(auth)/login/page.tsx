import type { Metadata } from "next";
import Link from "next/link";
import { Zap } from "lucide-react";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ocean-950 px-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center gap-3 text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-caribbean-500 flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
            <p className="text-ocean-400 text-sm mt-1">Sign in to GET THERE 268</p>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-2xl space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-ocean-700">Email</label>
            <input id="email" type="email" placeholder="you@email.com" className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-caribbean-500 focus:border-transparent" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="text-sm font-medium text-ocean-700">Password</label>
              <Link href="/forgot-password" className="text-xs text-caribbean-600 hover:text-caribbean-700">Forgot?</Link>
            </div>
            <input id="password" type="password" placeholder="••••••••" className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-caribbean-500 focus:border-transparent" />
          </div>
          <button className="w-full h-12 bg-ocean-900 hover:bg-ocean-800 text-white font-semibold rounded-xl transition-colors">
            Sign in
          </button>
          <p className="text-center text-sm text-muted-foreground">
            New here?{" "}
            <Link href="/signup" className="text-caribbean-600 font-semibold hover:text-caribbean-700">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
