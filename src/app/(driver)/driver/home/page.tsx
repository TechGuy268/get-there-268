"use client";
import { useState } from "react";
import { MapPin, X, CheckCircle, Clock, DollarSign, Star } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function DriverHomePage() {
  const [isOnline, setIsOnline] = useState(false);
  const [rideRequest, setRideRequest] = useState<null | { pickup: string; destination: string; fare: number; distance: string; rider: string }>(null);
  const [countdown, setCountdown] = useState(15);

  const toggleOnline = () => {
    setIsOnline(!isOnline);
    if (!isOnline) {
      // Simulate incoming request after 3s
      setTimeout(() => {
        setRideRequest({ pickup: "Heritage Quay, St. John's", destination: "V.C. Bird Airport", fare: 18.50, distance: "7.2 km", rider: "Jennifer A." });
        setCountdown(15);
        const timer = setInterval(() => {
          setCountdown((c) => {
            if (c <= 1) { clearInterval(timer); setRideRequest(null); return 0; }
            return c - 1;
          });
        }, 1000);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-ocean-950 text-white">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-2xl font-bold">Good morning, Marcus 👋</h1>
        </div>
        <p className="text-ocean-400 text-sm">Tuesday, April 22</p>
      </div>

      {/* Online toggle */}
      <div className="px-6 mb-8">
        <button
          onClick={toggleOnline}
          className={`w-full py-6 rounded-3xl flex flex-col items-center gap-3 transition-all border-2 ${
            isOnline
              ? "bg-reef-500/20 border-reef-500 text-reef-400"
              : "bg-ocean-900 border-ocean-700 text-ocean-400 hover:border-caribbean-500"
          }`}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isOnline ? "bg-reef-500" : "bg-ocean-700"} transition-colors`}>
            <div className={`w-6 h-6 rounded-full ${isOnline ? "bg-white animate-pulse" : "bg-ocean-500"}`} />
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{isOnline ? "You're ONLINE" : "Go Online"}</p>
            <p className="text-sm opacity-70">{isOnline ? "Waiting for ride requests..." : "Tap to start accepting rides"}</p>
          </div>
        </button>
      </div>

      {/* Today's stats */}
      <div className="px-6 mb-6">
        <p className="text-xs font-semibold text-ocean-400 uppercase tracking-widest mb-3">Today</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: DollarSign, label: "Earned", value: formatCurrency(47.50), color: "text-reef-400" },
            { icon: Clock, label: "Hours", value: "3h 20m", color: "text-caribbean-400" },
            { icon: Star, label: "Rating", value: "4.94", color: "text-amber-400" },
          ].map((stat) => (
            <div key={stat.label} className="bg-ocean-900 rounded-2xl p-4 text-center border border-ocean-800">
              <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
              <p className="text-lg font-bold text-white">{stat.value}</p>
              <p className="text-xs text-ocean-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent trips */}
      <div className="px-6">
        <p className="text-xs font-semibold text-ocean-400 uppercase tracking-widest mb-3">Recent trips</p>
        <div className="space-y-2">
          {[
            { from: "St. John's", to: "English Harbour", fare: 22.00, time: "11:30 AM" },
            { from: "Airport", to: "Dickenson Bay", fare: 14.50, time: "9:05 AM" },
          ].map((trip, i) => (
            <div key={i} className="bg-ocean-900 rounded-2xl p-4 flex items-center justify-between border border-ocean-800">
              <div>
                <p className="text-sm text-white font-medium">{trip.from} → {trip.to}</p>
                <p className="text-xs text-ocean-400 mt-0.5">{trip.time}</p>
              </div>
              <p className="text-reef-400 font-bold">{formatCurrency(trip.fare)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ride request modal */}
      {rideRequest && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative w-full bg-white rounded-t-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-ocean-900">New Ride Request</h2>
              <div className="w-10 h-10 rounded-full bg-caribbean-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">{countdown}</span>
              </div>
            </div>
            {/* Rider */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-ocean-200 flex items-center justify-center text-ocean-700 font-bold">
                {rideRequest.rider.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="font-semibold text-ocean-900">{rideRequest.rider}</p>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-xs text-muted-foreground">4.8 rider rating</span>
                </div>
              </div>
            </div>
            {/* Route */}
            <div className="bg-gray-50 rounded-2xl p-4 space-y-2 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-caribbean-500" />
                <p className="text-sm text-ocean-800">{rideRequest.pickup}</p>
              </div>
              <div className="ml-[3px] h-4 border-l-2 border-dashed border-gray-300" />
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-coral-500" />
                <p className="text-sm font-medium text-ocean-900">{rideRequest.destination}</p>
              </div>
            </div>
            <div className="flex items-center justify-between bg-reef-50 rounded-2xl px-4 py-3 mb-6">
              <div>
                <p className="text-xs text-muted-foreground">Your earnings</p>
                <p className="text-2xl font-bold text-reef-600">{formatCurrency(rideRequest.fare)}</p>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                <p>{rideRequest.distance}</p>
                <p>~{Math.round(parseFloat(rideRequest.distance) / 0.5)} min</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setRideRequest(null)} className="flex items-center justify-center gap-2 h-14 rounded-2xl border-2 border-red-200 bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition-colors">
                <X className="w-5 h-5" /> Decline
              </button>
              <button onClick={() => setRideRequest(null)} className="flex items-center justify-center gap-2 h-14 rounded-2xl bg-caribbean-500 hover:bg-caribbean-600 text-white font-bold transition-colors">
                <CheckCircle className="w-5 h-5" /> Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
