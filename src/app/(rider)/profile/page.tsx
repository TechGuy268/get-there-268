import type { Metadata } from "next";
import { User, Mail, Phone, Star, CreditCard, LogOut } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Profile" };

export default function RiderProfilePage() {
  return (
    <div className="max-w-md mx-auto">
      <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4">
        <h1 className="text-xl font-bold text-ocean-900">Profile</h1>
      </div>
      {/* Avatar + name */}
      <div className="px-6 py-8 flex flex-col items-center border-b border-gray-100">
        <div className="w-20 h-20 rounded-full bg-caribbean-500 flex items-center justify-center text-white font-bold text-3xl mb-3">
          JA
        </div>
        <h2 className="text-xl font-bold text-ocean-900">Jennifer Aniston</h2>
        <div className="flex items-center gap-1 mt-1">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="text-sm font-medium text-ocean-700">4.8 rider rating</span>
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
        {[
          { label: "Rides", value: "28" },
          { label: "Total spent", value: formatCurrency(420.50) },
          { label: "Member since", value: "Feb 2025" },
        ].map((s) => (
          <div key={s.label} className="px-4 py-5 text-center">
            <p className="font-bold text-ocean-900">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
      {/* Details */}
      <div className="px-6 py-4 space-y-3 border-b border-gray-100">
        {[
          { icon: Mail, label: "jennifer@example.com" },
          { icon: Phone, label: "+1 268 555 0102" },
          { icon: CreditCard, label: "Visa •••• 4242" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3 py-2">
            <Icon className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-ocean-800">{label}</span>
          </div>
        ))}
      </div>
      {/* Sign out */}
      <div className="px-6 py-4">
        <button className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium transition-colors">
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </div>
  );
}
