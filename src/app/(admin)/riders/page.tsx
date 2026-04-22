import type { Metadata } from "next";
import { Star } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Riders — Admin" };

const RIDERS = [
  { id: "1", name: "Jennifer Aniston", email: "jennifer@example.com", trips: 28, totalSpent: 420.50, rating: 4.8, joined: "Feb 2025", lastRide: "Today" },
  { id: "2", name: "Dwayne Clarke", email: "dwayne@example.com", trips: 14, totalSpent: 198.00, rating: 4.6, joined: "Mar 2025", lastRide: "Yesterday" },
  { id: "3", name: "Aaliyah Roberts", email: "aaliyah@example.com", trips: 52, totalSpent: 780.25, rating: 4.9, joined: "Dec 2024", lastRide: "Apr 20" },
  { id: "4", name: "Nathan Felix", email: "nathan@example.com", trips: 7, totalSpent: 95.00, rating: 4.4, joined: "Apr 2025", lastRide: "Apr 18" },
  { id: "5", name: "Simone Harris", email: "simone@example.com", trips: 33, totalSpent: 512.75, rating: 4.7, joined: "Jan 2025", lastRide: "Apr 21" },
];

export default function AdminRidersPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ocean-900">Riders</h1>
        <p className="text-muted-foreground text-sm mt-1">{RIDERS.length} registered riders</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Rider</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Trips</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Spent</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Rating</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Last Ride</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {RIDERS.map((rider) => (
              <tr key={rider.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-caribbean-100 flex items-center justify-center text-caribbean-700 font-bold text-sm flex-shrink-0">
                      {rider.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-semibold text-ocean-900 text-sm">{rider.name}</p>
                      <p className="text-xs text-muted-foreground">{rider.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4"><span className="text-sm font-medium text-ocean-800">{rider.trips}</span></td>
                <td className="px-6 py-4"><span className="text-sm font-bold text-reef-600">{formatCurrency(rider.totalSpent)}</span></td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-sm font-semibold text-ocean-800">{rider.rating}</span>
                  </div>
                </td>
                <td className="px-6 py-4"><span className="text-sm text-muted-foreground">{rider.lastRide}</span></td>
                <td className="px-6 py-4"><span className="text-sm text-muted-foreground">{rider.joined}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
