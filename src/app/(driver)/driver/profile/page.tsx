import type { Metadata } from "next";
import { Star, Car, Phone, Mail, Shield, LogOut } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Driver Profile" };

export default function DriverProfilePage() {
  return (
    <div className="min-h-screen bg-ocean-950 text-white pb-24">
      <div className="px-6 pt-12 pb-6">
        <h1 className="text-2xl font-bold mb-1">Profile</h1>
        <p className="text-ocean-400 text-sm">Your driver account</p>
      </div>
      {/* Avatar */}
      <div className="px-6 mb-6 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-caribbean-500 flex items-center justify-center text-white font-bold text-4xl mb-3">
          MW
        </div>
        <h2 className="text-xl font-bold">Marcus Williams</h2>
        <div className="flex items-center gap-1 mt-1">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="text-sm text-ocean-300">4.92 · 1,247 trips</span>
        </div>
        <span className="mt-2 px-3 py-1 bg-reef-500/20 text-reef-400 text-xs font-semibold rounded-full">Approved Driver</span>
      </div>
      {/* Stats */}
      <div className="px-6 mb-6 grid grid-cols-3 gap-3">
        {[
          { label: "Total earned", value: formatCurrency(18420) },
          { label: "This month", value: formatCurrency(1240) },
          { label: "Acceptance", value: "94%" },
        ].map((s) => (
          <div key={s.label} className="bg-ocean-900 rounded-2xl p-4 text-center border border-ocean-800">
            <p className="text-lg font-bold text-white">{s.value}</p>
            <p className="text-xs text-ocean-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
      {/* Vehicle */}
      <div className="px-6 mb-6">
        <p className="text-xs font-semibold text-ocean-400 uppercase tracking-widest mb-3">Vehicle</p>
        <div className="bg-ocean-900 rounded-2xl p-5 border border-ocean-800">
          <div className="flex items-center gap-3 mb-3">
            <Car className="w-5 h-5 text-caribbean-400" />
            <p className="font-semibold text-white">Toyota Corolla · Silver</p>
          </div>
          <p className="text-sm text-ocean-300">Plate: <span className="font-mono text-white">AG-2024</span></p>
          <p className="text-sm text-ocean-300 mt-1">License: <span className="text-white">AG-DL-98765</span></p>
        </div>
      </div>
      {/* Contact */}
      <div className="px-6 mb-6">
        <p className="text-xs font-semibold text-ocean-400 uppercase tracking-widest mb-3">Contact</p>
        <div className="bg-ocean-900 rounded-2xl p-4 border border-ocean-800 space-y-3">
          {[
            { icon: Mail, text: "marcus@example.com" },
            { icon: Phone, text: "+1 268 555 0198" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <Icon className="w-4 h-4 text-ocean-400" />
              <span className="text-sm text-ocean-200">{text}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Safety */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-2 bg-reef-500/10 border border-reef-500/30 rounded-2xl px-4 py-3">
          <Shield className="w-4 h-4 text-reef-400 flex-shrink-0" />
          <p className="text-xs text-reef-300">Background check passed · ID verified</p>
        </div>
      </div>
      {/* Sign out */}
      <div className="px-6">
        <button className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm font-medium transition-colors">
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </div>
  );
}
