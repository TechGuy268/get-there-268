import type { Metadata } from "next";
import { formatCurrency } from "@/lib/utils";
import { MapPin } from "lucide-react";

export const metadata: Metadata = { title: "Trip History — Driver" };

const TRIPS = [
  { id: "1", date: "Today, 11:30 AM", rider: "Jennifer A.", from: "Heritage Quay", to: "V.C. Bird Airport", fare: 18.50, km: 7.2 },
  { id: "2", date: "Today, 9:05 AM", rider: "Dwayne C.", from: "Airport", to: "Dickenson Bay", fare: 14.50, km: 5.8 },
  { id: "3", date: "Yesterday, 4:20 PM", rider: "Simone H.", from: "English Harbour", to: "St. John's", fare: 22.00, km: 9.1 },
  { id: "4", date: "Apr 20, 1:15 PM", rider: "Nathan F.", from: "Woods Mall", to: "Runaway Bay", fare: 9.50, km: 3.4 },
  { id: "5", date: "Apr 19, 8:00 AM", rider: "Aaliyah R.", from: "St. John's", to: "Jolly Harbour", fare: 28.00, km: 11.5 },
];

export default function DriverHistoryPage() {
  return (
    <div className="min-h-screen bg-ocean-950 text-white pb-24">
      <div className="px-6 pt-12 pb-6">
        <h1 className="text-2xl font-bold mb-1">History</h1>
        <p className="text-ocean-400 text-sm">Your past trips</p>
      </div>
      <div className="px-6 space-y-3">
        {TRIPS.map((trip) => (
          <div key={trip.id} className="bg-ocean-900 rounded-2xl p-4 border border-ocean-800">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-ocean-400 mb-2">{trip.date} · {trip.rider}</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-caribbean-400 flex-shrink-0" />
                    <p className="text-sm text-ocean-300 truncate">{trip.from}</p>
                  </div>
                  <div className="ml-[3px] h-3 border-l border-dashed border-ocean-700" />
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-coral-400 flex-shrink-0" />
                    <p className="text-sm text-white font-medium truncate">{trip.to}</p>
                  </div>
                </div>
                <p className="text-xs text-ocean-500 mt-2">{trip.km} km</p>
              </div>
              <p className="text-reef-400 font-bold text-lg flex-shrink-0">{formatCurrency(trip.fare)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
