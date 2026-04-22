import type { Metadata } from "next";
import { MapPin, Star, ChevronRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Trip History" };

const PAST_RIDES = [
  { id: "1", date: "Today, 9:14 AM", from: "St. John's Harbour", to: "V.C. Bird Airport", fare: 18.50, rating: 5, driver: "Marcus W.", status: "COMPLETED" },
  { id: "2", date: "Yesterday, 6:30 PM", from: "English Harbour", to: "Dickenson Bay", fare: 24.00, rating: 4, driver: "Sarah J.", status: "COMPLETED" },
  { id: "3", date: "Apr 19, 2:00 PM", from: "Heritage Quay", to: "Jolly Harbour", fare: 15.00, rating: 5, driver: "Devon T.", status: "COMPLETED" },
  { id: "4", date: "Apr 18, 11:45 AM", from: "Woods Mall", to: "Runaway Bay", fare: 9.50, rating: 4, driver: "Kezia M.", status: "COMPLETED" },
];

export default function HistoryPage() {
  return (
    <div className="max-w-md mx-auto">
      <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4">
        <h1 className="text-xl font-bold text-ocean-900">Your rides</h1>
      </div>
      <div className="divide-y divide-gray-100">
        {PAST_RIDES.map((ride) => (
          <div key={ride.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-1">{ride.date}</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-caribbean-500 flex-shrink-0" />
                    <p className="text-sm text-ocean-800 truncate">{ride.from}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-coral-500 flex-shrink-0" />
                    <p className="text-sm font-medium text-ocean-900 truncate">{ride.to}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-sm font-bold text-ocean-900">{formatCurrency(ride.fare)}</span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < ride.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"}`} />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{ride.driver}</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
