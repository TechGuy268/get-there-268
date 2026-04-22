"use client";
import { useState } from "react";
import Link from "next/link";
import { Zap, Car, User } from "lucide-react";

export default function SignupPage() {
  const [role, setRole] = useState<"rider" | "driver">("rider");

  return (
    <div className="min-h-screen flex items-center justify-center bg-ocean-950 px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center gap-3 text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-caribbean-500 flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Join GET THERE 268</h1>
            <p className="text-ocean-400 text-sm mt-1">Antigua & Barbuda&apos;s ride platform</p>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-2xl space-y-5">
          {/* Role selector */}
          <div>
            <p className="text-sm font-medium text-ocean-700 mb-2">I want to...</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setRole("rider")}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${role === "rider" ? "border-caribbean-500 bg-caribbean-50" : "border-gray-200 hover:border-gray-300"}`}
              >
                <User className={`w-5 h-5 ${role === "rider" ? "text-caribbean-500" : "text-muted-foreground"}`} />
                <span className={`text-sm font-semibold ${role === "rider" ? "text-caribbean-700" : "text-ocean-700"}`}>Get rides</span>
              </button>
              <button
                onClick={() => setRole("driver")}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${role === "driver" ? "border-coral-500 bg-coral-50" : "border-gray-200 hover:border-gray-300"}`}
              >
                <Car className={`w-5 h-5 ${role === "driver" ? "text-coral-500" : "text-muted-foreground"}`} />
                <span className={`text-sm font-semibold ${role === "driver" ? "text-coral-700" : "text-ocean-700"}`}>Drive & earn</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-ocean-700">Full name</label>
            <input id="name" type="text" placeholder="Jane Smith" className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-caribbean-500" />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-ocean-700">Email</label>
            <input id="email" type="email" placeholder="jane@example.com" className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-caribbean-500" />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-ocean-700">Phone</label>
            <input id="phone" type="tel" placeholder="+1 268 XXX XXXX" className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-caribbean-500" />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-ocean-700">Password</label>
            <input id="password" type="password" placeholder="Min. 8 characters" minLength={8} className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-caribbean-500" />
          </div>

          {role === "driver" && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
              Driver accounts require approval. You&apos;ll need to provide license and vehicle info after signup.
            </div>
          )}

          <button className={`w-full h-12 font-semibold rounded-xl transition-colors text-white ${role === "driver" ? "bg-coral-500 hover:bg-coral-600" : "bg-ocean-900 hover:bg-ocean-800"}`}>
            Create {role === "driver" ? "driver" : "rider"} account
          </button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-caribbean-600 font-semibold hover:text-caribbean-700">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
