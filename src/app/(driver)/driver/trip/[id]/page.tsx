"use client";
import { useState, use } from "react";
import { MessageCircle, Phone, X, ChevronDown, Star, Shield, Navigation } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

type DriverTripStatus = "HEADING_TO_PICKUP" | "ARRIVED_PICKUP" | "IN_PROGRESS" | "COMPLETED";

const STATUS_CONFIG: Record<DriverTripStatus, { label: string; color: string; next: string; nextLabel: string }> = {
  HEADING_TO_PICKUP: { label: "Heading to pickup", color: "bg-caribbean-500", next: "ARRIVED_PICKUP", nextLabel: "I've Arrived" },
  ARRIVED_PICKUP: { label: "Arrived at pickup", color: "bg-amber-500", next: "IN_PROGRESS", nextLabel: "Start Trip" },
  IN_PROGRESS: { label: "Trip in progress", color: "bg-reef-500", next: "COMPLETED", nextLabel: "Complete Trip" },
  COMPLETED: { label: "Trip completed!", color: "bg-reef-600", next: "COMPLETED", nextLabel: "Done" },
};

export default function DriverTripPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [status, setStatus] = useState<DriverTripStatus>("HEADING_TO_PICKUP");
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);

  const rider = {
    name: "Jennifer Aniston",
    riderRating: 4.8,
    avatar: "JA",
    pickup: "Heritage Quay, St. John's",
    destination: "V.C. Bird Airport",
    fare: 18.50,
    distance: "7.2 km",
    eta: "3 min",
    tripId: id,
  };

  const advance = () => {
    const order: DriverTripStatus[] = ["HEADING_TO_PICKUP", "ARRIVED_PICKUP", "IN_PROGRESS", "COMPLETED"];
    const idx = order.indexOf(status);
    if (idx < order.length - 1) {
      const next = order[idx + 1];
      setStatus(next);
      if (next === "COMPLETED") setShowRating(true);
    }
  };

  const cfg = STATUS_CONFIG[status];

  if (showRating && status === "COMPLETED") {
    return (
      <div className="min-h-screen bg-ocean-950 flex flex-col items-center justify-center px-6">
        <div className="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl">
          <div className="w-20 h-20 bg-reef-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🎉</span>
          </div>
          <h2 className="text-2xl font-bold text-ocean-900 mb-1">Trip Complete!</h2>
          <p className="text-muted-foreground text-sm mb-2">You earned</p>
          <p className="text-4xl font-bold text-reef-600 mb-6">{formatCurrency(rider.fare)}</p>
          <p className="text-sm text-ocean-700 font-medium mb-3">Rate your rider</p>
          <div className="flex justify-center gap-3 mb-6">
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} onClick={() => setRating(s)}>
                <Star className={`w-8 h-8 ${s <= rating ? "text-amber-400 fill-amber-400" : "text-gray-200"}`} />
              </button>
            ))}
          </div>
          <button
            onClick={() => { window.location.href = "/driver/home"; }}
            className="w-full h-14 bg-caribbean-500 hover:bg-caribbean-600 text-white font-bold rounded-2xl transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Map */}
      <div className="flex-1 bg-caribbean-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-ocean-400">
            <p className="text-sm">Navigation active</p>
          </div>
        </div>
        {/* Driver car */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-12 h-12 bg-ocean-900 rounded-full flex items-center justify-center shadow-xl border-2 border-white">
            <Navigation className="w-6 h-6 text-caribbean-400 fill-caribbean-400" />
          </div>
        </div>
        {/* Rider pin */}
        {status === "HEADING_TO_PICKUP" && (
          <div className="absolute top-1/3 left-1/3 animate-bounce">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-caribbean-500">
              <span className="text-lg">📍</span>
            </div>
          </div>
        )}
        {/* Status bar top */}
        <div className="absolute top-4 left-4 right-4">
          <div className={`${cfg.color} text-white px-4 py-3 rounded-2xl flex items-center justify-between shadow-lg`}>
            <span className="font-semibold text-sm">{cfg.label}</span>
            <span className="text-white/80 text-sm font-medium">{rider.eta}</span>
          </div>
        </div>
        {/* Action buttons */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button onClick={() => setChatOpen(true)} className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors" aria-label="Chat">
            <MessageCircle className="w-5 h-5 text-ocean-700" />
          </button>
          <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors" aria-label="Call rider">
            <Phone className="w-5 h-5 text-ocean-700" />
          </button>
        </div>
      </div>

      {/* Rider card */}
      <div className="bg-white shadow-2xl rounded-t-3xl">
        <div className="px-6 pt-4 pb-2">
          <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
        </div>
        <div className="px-6 pb-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-ocean-200 flex items-center justify-center text-ocean-700 font-bold text-lg flex-shrink-0">
              {rider.avatar}
            </div>
            <div className="flex-1">
              <p className="font-bold text-ocean-900 text-lg">{rider.name}</p>
              <div className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-sm font-medium text-ocean-700">{rider.riderRating}</span>
                <span className="text-xs text-muted-foreground">· rider rating</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Fare</p>
              <p className="text-xl font-bold text-reef-600">{formatCurrency(rider.fare)}</p>
              <p className="text-xs text-muted-foreground">{rider.distance}</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-caribbean-500" />
              <p className="text-sm text-ocean-800 flex-1 truncate">{rider.pickup}</p>
            </div>
            <div className="ml-[3px] h-4 border-l-2 border-dashed border-gray-300" />
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-coral-500" />
              <p className="text-sm font-medium text-ocean-900 flex-1 truncate">{rider.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-reef-50 border border-reef-200 rounded-xl px-4 py-2.5">
            <Shield className="w-4 h-4 text-reef-600 flex-shrink-0" />
            <p className="text-xs text-reef-700 font-medium">Trip ID: {rider.tripId.slice(0, 8).toUpperCase()}</p>
          </div>
          {status !== "COMPLETED" && (
            <button
              onClick={advance}
              className={`w-full h-14 ${cfg.color} hover:opacity-90 text-white font-bold rounded-2xl transition-all text-base shadow-lg`}
            >
              {cfg.nextLabel}
            </button>
          )}
        </div>
      </div>

      {/* Chat drawer */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setChatOpen(false)} />
          <div className="relative bg-white rounded-t-3xl max-h-[60vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-ocean-900">Chat with {rider.name}</h3>
              <button onClick={() => setChatOpen(false)} aria-label="Close chat"><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              <div className="flex justify-end">
                <div className="bg-caribbean-500 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-xs">
                  <p className="text-sm text-white">On my way! Be there shortly.</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 border-t border-gray-100">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message rider..."
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
