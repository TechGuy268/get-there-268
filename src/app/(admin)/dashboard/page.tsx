"use client";
import { Car, Users, DollarSign, TrendingUp, MapPin } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line } from "recharts";

const WEEKLY_REVENUE = [
  { day: "Mon", revenue: 480, trips: 32 },
  { day: "Tue", revenue: 620, trips: 41 },
  { day: "Wed", revenue: 540, trips: 36 },
  { day: "Thu", revenue: 710, trips: 47 },
  { day: "Fri", revenue: 890, trips: 59 },
  { day: "Sat", revenue: 1020, trips: 68 },
  { day: "Sun", revenue: 760, trips: 50 },
];

const RECENT_ACTIVITY = [
  { time: "2 min ago", event: "New ride completed", detail: "Marcus W. → Jennifer A. · XCD 18.50", type: "trip" },
  { time: "5 min ago", event: "Driver went online", detail: "Devon Thomas joined the platform", type: "driver" },
  { time: "12 min ago", event: "New driver signup", detail: "Kezia Miller — pending approval", type: "signup" },
  { time: "18 min ago", event: "Ride cancelled", detail: "Rider cancelled before pickup", type: "cancel" },
  { time: "25 min ago", event: "Payment received", detail: "Stripe · XCD 24.00", type: "payment" },
];

const KPIS = [
  { label: "Active Rides", value: "8", icon: MapPin, color: "text-caribbean-500", bg: "bg-caribbean-50", change: "+2 from last hour" },
  { label: "Drivers Online", value: "14", icon: Car, color: "text-reef-500", bg: "bg-reef-50", change: "of 31 approved" },
  { label: "Today's Revenue", value: formatCurrency(3420), icon: DollarSign, color: "text-amber-500", bg: "bg-amber-50", change: "+12% vs yesterday" },
  { label: "Total Trips Today", value: "228", icon: TrendingUp, color: "text-coral-500", bg: "bg-coral-50", change: "+8% vs yesterday" },
];

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-ocean-900">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Tuesday, April 22, 2025 · Live overview</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {KPIS.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground font-medium">{kpi.label}</p>
              <div className={`w-9 h-9 ${kpi.bg} rounded-xl flex items-center justify-center`}>
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
            </div>
            <p className="text-3xl font-bold text-ocean-900">{kpi.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{kpi.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Revenue chart */}
        <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-ocean-900">Weekly Revenue</h2>
            <span className="text-xs bg-caribbean-50 text-caribbean-600 px-3 py-1 rounded-full font-medium">This Week</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={WEEKLY_REVENUE}>
              <XAxis dataKey="day" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#0f172a", border: "none", borderRadius: "12px", fontSize: 12 }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(v: any) => [formatCurrency(Number(v)), "Revenue"]}
              />
              <Bar dataKey="revenue" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Activity feed */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-ocean-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {RECENT_ACTIVITY.map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${item.type === "trip" ? "bg-reef-400" : item.type === "cancel" ? "bg-red-400" : item.type === "payment" ? "bg-amber-400" : "bg-caribbean-400"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-ocean-800">{item.event}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.detail}</p>
                  <p className="text-xs text-ocean-300 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trips over time */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-bold text-ocean-900 mb-4">Daily Trips</h2>
        <ResponsiveContainer width="100%" height={140}>
          <LineChart data={WEEKLY_REVENUE}>
            <XAxis dataKey="day" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "#0f172a", border: "none", borderRadius: "12px", fontSize: 12 }} />
            <Line type="monotone" dataKey="trips" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981", r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
