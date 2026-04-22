"use client";
import { useState } from "react";
import { MapPin, Navigation, CreditCard, Banknote, ChevronRight, X } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

type Step = "search" | "confirm" | "finding";

export default function BookRidePage() {
  const [step, setStep] = useState<Step>("search");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [payMethod, setPayMethod] = useState<"CARD" | "CASH">("CASH");

  const fareEstimate = 12.50;
  const distanceKm = 6.2;
  const durationMin = 14;

  const canBook = pickup.length > 2 && destination.length > 2;

  return (
    <div className="flex flex-col h-screen">
      {/* Map placeholder */}
      <div className="flex-1 bg-caribbean-50 relative overflow-hidden">
        {/* Fake map grid */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-ocean-400">
            <MapPin className="w-10 h-10 mx-auto mb-2 text-caribbean-400" />
            <p className="text-sm font-medium">Antigua & Barbuda</p>
            <p className="text-xs text-muted-foreground">Google Maps will load here</p>
          </div>
        </div>
        {/* Driver pins mockup */}
        {[{ top: "30%", left: "40%" }, { top: "50%", left: "60%" }, { top: "45%", left: "30%" }].map((pos, i) => (
          <div key={i} className="absolute" style={pos}>
            <div className="w-8 h-8 bg-ocean-900 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
              <span className="text-white text-xs">🚗</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom sheet */}
      {step === "search" && (
        <div className="bg-white rounded-t-3xl shadow-2xl p-6 space-y-4">
          <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-2" />
          <h2 className="text-xl font-bold text-ocean-900">Where to?</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3">
              <div className="w-2.5 h-2.5 rounded-full bg-caribbean-500 flex-shrink-0" />
              <input
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Pickup location"
                className="flex-1 bg-transparent text-sm focus:outline-none text-ocean-900 placeholder:text-muted-foreground"
              />
              {pickup && <button onClick={() => setPickup("")}><X className="w-4 h-4 text-muted-foreground" /></button>}
            </div>
            <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3">
              <div className="w-2.5 h-2.5 rounded-full bg-coral-500 flex-shrink-0" />
              <input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Where are you going?"
                className="flex-1 bg-transparent text-sm focus:outline-none text-ocean-900 placeholder:text-muted-foreground"
              />
              {destination && <button onClick={() => setDestination("")}><X className="w-4 h-4 text-muted-foreground" /></button>}
            </div>
          </div>
          <button
            onClick={() => canBook && setStep("confirm")}
            disabled={!canBook}
            className="w-full h-14 bg-ocean-900 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-ocean-800 transition-colors"
          >
            See prices <ChevronRight className="w-5 h-5" />
          </button>
          {/* Quick destinations */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Popular destinations</p>
            <div className="space-y-2">
              {["V.C. Bird Airport", "English Harbour", "Dickenson Bay", "Heritage Quay"].map((place) => (
                <button
                  key={place}
                  onClick={() => setDestination(place)}
                  className="w-full flex items-center gap-3 text-left p-3 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm text-ocean-800">{place}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === "confirm" && (
        <div className="bg-white rounded-t-3xl shadow-2xl p-6 space-y-5">
          <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-2" />
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-ocean-900">Confirm ride</h2>
            <button onClick={() => setStep("search")} className="text-sm text-caribbean-600 font-medium">Edit</button>
          </div>
          {/* Route */}
          <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-caribbean-500" />
              <p className="text-sm text-ocean-800 truncate">{pickup || "St. John's"}</p>
            </div>
            <div className="ml-[3px] h-5 border-l-2 border-dashed border-gray-300" />
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-coral-500" />
              <p className="text-sm text-ocean-800 truncate">{destination}</p>
            </div>
          </div>
          {/* Fare */}
          <div className="flex items-center justify-between bg-caribbean-50 rounded-2xl p-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Fare estimate</p>
              <p className="text-2xl font-bold text-ocean-900">{formatCurrency(fareEstimate)}</p>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <p>{distanceKm} km</p>
              <p>~{durationMin} min</p>
            </div>
          </div>
          {/* Payment */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Payment</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPayMethod("CASH")}
                className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${payMethod === "CASH" ? "border-reef-500 bg-reef-50" : "border-gray-200"}`}
              >
                <Banknote className={`w-4 h-4 ${payMethod === "CASH" ? "text-reef-600" : "text-muted-foreground"}`} />
                <span className={`text-sm font-medium ${payMethod === "CASH" ? "text-reef-700" : "text-ocean-700"}`}>Cash</span>
              </button>
              <button
                onClick={() => setPayMethod("CARD")}
                className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${payMethod === "CARD" ? "border-caribbean-500 bg-caribbean-50" : "border-gray-200"}`}
              >
                <CreditCard className={`w-4 h-4 ${payMethod === "CARD" ? "text-caribbean-600" : "text-muted-foreground"}`} />
                <span className={`text-sm font-medium ${payMethod === "CARD" ? "text-caribbean-700" : "text-ocean-700"}`}>Card</span>
              </button>
            </div>
          </div>
          <button
            onClick={() => setStep("finding")}
            className="w-full h-14 bg-caribbean-500 hover:bg-caribbean-600 text-white font-bold rounded-2xl text-lg transition-colors"
          >
            Book Ride
          </button>
        </div>
      )}

      {step === "finding" && (
        <div className="bg-white rounded-t-3xl shadow-2xl p-8 text-center space-y-5">
          <div className="w-20 h-20 rounded-full bg-caribbean-50 flex items-center justify-center mx-auto animate-pulse">
            <Navigation className="w-8 h-8 text-caribbean-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-ocean-900 mb-2">Finding your driver...</h2>
            <p className="text-muted-foreground text-sm">Usually takes under 2 minutes</p>
          </div>
          <div className="flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-caribbean-500 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
            ))}
          </div>
          <button onClick={() => setStep("search")} className="text-sm text-muted-foreground underline">
            Cancel request
          </button>
        </div>
      )}
    </div>
  );
}
