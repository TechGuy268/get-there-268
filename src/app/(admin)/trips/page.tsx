import type { Metadata } from "next";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Trips — Admin" };

type TripStatus = "COMPLETED" | "IN_PROGRESS" | "CANCELLED" | "REQUESTED";

const TRIPS = [
  { id: "ride_abc123", date: "Today 11:30 AM", rider: "Jennifer A.", driver: "Marcus W.", from: "Heritage Quay", to: "V.C. Bird Airport", fare: 18.50, method: "CARD", status: "COMPLETED" as TripStatus },
  { id: "ride_def456", date: "Today 10:15 AM", rider: "Dwayne C.", driver: "Sarah J.", from: "Dickenson Bay", to: "St. John's", fare: 12.00, method: "CASH", status: "COMPLETED" as TripStatus },
  { id: "ride_ghi789", date: "Today 9:45 AM", rider: "Aaliyah R.", driver: "Devon T.", from: "English Harbour", to: "Woods Mall", fare: 22.00, method: "CARD", status: "IN_PROGRESS" as TripStatus },
  { id: "ride_jkl012", date: "Today 9:00 AM", rider: "Nathan F.", driver: "—", from: "Airport", to: "Jolly Harbour", fare: 28.50, method: "CASH", status: "CANCELLED" as TripStatus },
  { id: "ride_mno345", date: "Yesterday 6:30 PM", rider: "Simone H.", driver: "Marcus W.", from: "St. John's", to: "Runaway Bay", fare: 9.50, method: "CARD", status: "COMPLETED" as TripStatus },
];

const STATUS_STYLE: Record<TripStatus, string> = {
  COMPLETED: "bg-reef-100 text-reef-700",
  IN_PROGRESS: "bg-caribbean-100 text-caribbean-700",
  CANCELLED: "bg-red-100 text-red-700",
  REQUESTED: "bg-amber-100 text-amber-700",
};

export default function AdminTripsPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ocean-900">Trips</h1>
        <p className="text-muted-foreground text-sm mt-1">All ride history across the platform</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Trip ID</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Rider</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Driver</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Route</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fare</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {TRIPS.map((trip) => (
              <tr key={trip.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-xs font-mono text-ocean-500">{trip.id.slice(0, 10).toUpperCase()}</span>
                </td>
                <td className="px-6 py-4"><span className="text-sm text-muted-foreground whitespace-nowrap">{trip.date}</span></td>
                <td className="px-6 py-4"><span className="text-sm font-medium text-ocean-800">{trip.rider}</span></td>
                <td className="px-6 py-4"><span className="text-sm text-ocean-700">{trip.driver}</span></td>
                <td className="px-6 py-4">
                  <p className="text-sm text-ocean-800">{trip.from}</p>
                  <p className="text-xs text-muted-foreground">→ {trip.to}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-ocean-900">{formatCurrency(trip.fare)}</p>
                  <p className="text-xs text-muted-foreground">{trip.method}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_STYLE[trip.status]}`}>
                    {trip.status.replace("_", " ")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
