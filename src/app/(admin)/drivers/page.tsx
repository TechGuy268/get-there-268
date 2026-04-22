"use client";
import { useState } from "react";
import { Star, CheckCircle, XCircle, Clock, Car } from "lucide-react";

type DriverStatus = "PENDING" | "APPROVED" | "SUSPENDED";

interface Driver {
  id: string;
  name: string;
  email: string;
  vehicle: string;
  plate: string;
  rating: number;
  trips: number;
  status: DriverStatus;
  joined: string;
}

const DRIVERS: Driver[] = [
  { id: "1", name: "Marcus Williams", email: "marcus@example.com", vehicle: "Toyota Corolla · Silver", plate: "AG-2024", rating: 4.92, trips: 1247, status: "APPROVED", joined: "Jan 2024" },
  { id: "2", name: "Sarah Johnson", email: "sarah@example.com", vehicle: "Honda Civic · White", plate: "AG-1891", rating: 4.87, trips: 892, status: "APPROVED", joined: "Mar 2024" },
  { id: "3", name: "Devon Thomas", email: "devon@example.com", vehicle: "Nissan Sentra · Blue", plate: "AG-3312", rating: 4.75, trips: 450, status: "APPROVED", joined: "Jun 2024" },
  { id: "4", name: "Kezia Miller", email: "kezia@example.com", vehicle: "Toyota Yaris · Red", plate: "AG-4421", rating: 0, trips: 0, status: "PENDING", joined: "Apr 2025" },
  { id: "5", name: "Andre Benjamin", email: "andre@example.com", vehicle: "Hyundai Elantra · Grey", plate: "AG-0987", rating: 4.60, trips: 203, status: "SUSPENDED", joined: "Sep 2024" },
];

const STATUS_BADGE: Record<DriverStatus, string> = {
  APPROVED: "bg-reef-100 text-reef-700",
  PENDING: "bg-amber-100 text-amber-700",
  SUSPENDED: "bg-red-100 text-red-700",
};

export default function AdminDriversPage() {
  const [drivers, setDrivers] = useState(DRIVERS);
  const [filter, setFilter] = useState<DriverStatus | "ALL">("ALL");

  const updateStatus = (id: string, status: DriverStatus) => {
    setDrivers((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
  };

  const filtered = filter === "ALL" ? drivers : drivers.filter((d) => d.status === filter);

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ocean-900">Drivers</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage and approve driver accounts</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {(["ALL", "APPROVED", "PENDING", "SUSPENDED"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter === f ? "bg-ocean-900 text-white" : "bg-white text-ocean-600 border border-gray-200 hover:border-ocean-300"}`}
          >
            {f === "ALL" ? "All Drivers" : f.charAt(0) + f.slice(1).toLowerCase()}
            <span className="ml-1.5 text-xs opacity-60">
              {f === "ALL" ? drivers.length : drivers.filter((d) => d.status === f).length}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Driver</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Vehicle</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Rating</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Trips</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((driver) => (
              <tr key={driver.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-ocean-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {driver.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-semibold text-ocean-900 text-sm">{driver.name}</p>
                      <p className="text-xs text-muted-foreground">{driver.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm text-ocean-800 flex items-center gap-1"><Car className="w-3.5 h-3.5 text-muted-foreground" /> {driver.vehicle}</p>
                    <p className="text-xs font-mono text-muted-foreground mt-0.5">{driver.plate}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {driver.rating > 0 ? (
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-semibold text-ocean-800">{driver.rating.toFixed(2)}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">No trips yet</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-ocean-800">{driver.trips.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_BADGE[driver.status]}`}>
                    {driver.status === "APPROVED" && <CheckCircle className="w-3 h-3" />}
                    {driver.status === "PENDING" && <Clock className="w-3 h-3" />}
                    {driver.status === "SUSPENDED" && <XCircle className="w-3 h-3" />}
                    {driver.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {driver.status === "PENDING" && (
                      <button
                        onClick={() => updateStatus(driver.id, "APPROVED")}
                        className="px-3 py-1.5 bg-reef-500 hover:bg-reef-600 text-white text-xs font-semibold rounded-lg transition-colors"
                      >
                        Approve
                      </button>
                    )}
                    {driver.status === "APPROVED" && (
                      <button
                        onClick={() => updateStatus(driver.id, "SUSPENDED")}
                        className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-lg transition-colors border border-red-200"
                      >
                        Suspend
                      </button>
                    )}
                    {driver.status === "SUSPENDED" && (
                      <button
                        onClick={() => updateStatus(driver.id, "APPROVED")}
                        className="px-3 py-1.5 bg-reef-50 hover:bg-reef-100 text-reef-600 text-xs font-semibold rounded-lg transition-colors border border-reef-200"
                      >
                        Reinstate
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
