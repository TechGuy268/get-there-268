"use client";
import { useState, use } from "react";
import { MessageCircle, Phone, Star, Shield, ChevronDown, X } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

type TripStatus = "ARRIVING" | "IN_PROGRESS" | "COMPLETED";

const STATUS_STEPS = {
  ARRIVING: { label: "Driver is arriving", color: "bg-caribbean-500", step: 1 },
  IN_PROGRESS: { label: "On the way", color: "bg-reef-500", step: 2 },
  COMPLETED: { label: "You've arrived!", color: "bg-reef-600", step: 3 },
};

export default function LiveTripPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [status] = useState<TripStatus>("ARRIVING");
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [showRating, setShowRating] = useState(false);

  const driver = {
    name: "Marcus Williams",
    rating: 4.92,
    totalTrips: 1247,
    vehicle: "Toyota Corolla",
    plate: "AG-2024",
    color: "Silver",
    eta: "2 min",
    avatar: "MW",
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Map */}
      <div className="flex-1 bg-caribbean-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-ocean-400">
            <p className="text-sm">Live map tracking</p>
          </div>
        </div>
        {/* Animated driver car */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
          <div className="w-12 h-12 bg-ocean-900 rounded-full flex items-center justify-center shadow-xl border-2 border-white">
            <span className="text-xl">🚗</span>
          </div>
        </div>
        {/* Status bar top */}
        <div className="absolute top-4 left-4 right-4">
          <div className={`${STATUS_STEPS[status].color} text-white px-4 py-3 rounded-2xl flex items-center justify-between shadow-lg`}>
            <span className="font-semibold text-sm">{STATUS_STEPS[status].label}</span>
            <span className="text-white/80 text-sm font-medium">{driver.eta}</span>
          </div>
        </div>
        {/* Action buttons */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button onClick={() => setChatOpen(true)} className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors" aria-label="Open chat">
            <MessageCircle className="w-5 h-5 text-ocean-700" />
          </button>
          <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors" aria-label="Call driver">
            <Phone className="w-5 h-5 text-ocean-700" />
          </button>
        </div>
      </div>

      {/* Driver card */}
      <div className="bg-white shadow-2xl rounded-t-3xl">
        <div className="px-6 pt-4 pb-2">
          <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
        </div>
        <div className="px-6 pb-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-ocean-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {driver.avatar}
            </div>
            <div className="flex-1">
              <p className="font-bold text-ocean-900 text-lg">{driver.name}</p>
              <div className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-sm font-medium text-ocean-700">{driver.rating}</span>
                <span className="text-xs text-muted-foreground">· {driver.totalTrips.toLocaleString()} trips</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-ocean-800">{driver.vehicle}</p>
              <p className="text-sm text-muted-foreground">{driver.color}</p>
              <p className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded mt-1 text-ocean-700">{driver.plate}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-reef-50 border border-reef-200 rounded-xl px-4 py-2.5">
            <Shield className="w-4 h-4 text-reef-600 flex-shrink-0" />
            <p className="text-xs text-reef-700 font-medium">Trip ID: {id.slice(0, 8).toUpperCase()} · Share with someone you trust</p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Fare</p>
              <p className="text-xl font-bold text-ocean-900">{formatCurrency(12.50)}</p>
            </div>
            <button className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors">
              Cancel ride
            </button>
          </div>
        </div>
      </div>

      {/* Chat drawer */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setChatOpen(false)} />
          <div className="relative bg-white rounded-t-3xl max-h-[60vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-ocean-900">Chat with {driver.name}</h3>
              <button onClick={() => setChatOpen(false)} aria-label="Close chat"><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-xs">
                  <p className="text-sm text-ocean-800">I&apos;m on my way! Be there in 2 minutes.</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 border-t border-gray-100">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message driver..."
                className="flex-1 h-10 px-4 rounded-full bg-gray-100 text-sm focus:outline-none"
              />
              <button className="w-10 h-10 bg-caribbean-500 rounded-full flex items-center justify-center flex-shrink-0">
                <ChevronDown className="w-4 h-4 text-white rotate-[-90deg]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
