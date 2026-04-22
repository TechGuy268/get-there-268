"use client";
import { useState } from "react";
import { TrendingUp, Car, Clock } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const PERIODS = ["Today", "This Week", "This Month"] as const;
type Period = typeof PERIODS[number];

const DATA: Record<Period, { total: number; trips: number; hours: number; chart: { label: string; amount: number }[] }> = {
  Today: {
    total: 47.50, trips: 6, hours: 3.5,
    chart: [{ label: "6AM", amount: 8 }, { label: "9AM", amount: 18 }, { label: "12PM", amount: 12 }, { label: "3PM", amount: 9.5 }],
  },
  "This Week": {
    total: 312.00, trips: 38, hours: 24,
    chart: [{ label: "Mon", amount: 45 }, { label: "Tue", amount: 62 }, { label: "Wed", amount: 55 }, { label: "Thu", amount: 70 }, { label: "Fri", amount: 48 }, { label: "Sat", amount: 32 }],
  },
  "This Month": {
    total: 1240.50, trips: 148, hours: 96,
    chart: [{ label: "W1", amount: 280 }, { label: "W2", amount: 320 }, { label: "W3", amount: 348 }, { label: "W4", amount: 292 }],
  },
};

export default function EarningsPage() {
  const [period, setPeriod] = useState<Period>("This Week");
  const data = DATA[period];

  return (
    <div className="min-h-screen bg-ocean-950 text-white pb-24">
      <div className="px-6 pt-12 pb-6">
        <h1 className="text-2xl font-bold mb-1">Earnings</h1>
        <p className="text-ocean-400 text-sm">Track your income</p>
      </div>
      {/* Period tabs */}
      <div className="px-6 mb-6">
        <div className="flex gap-2 bg-ocean-900 rounded-2xl p-1">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${period === p ? "bg-caribbean-500 text-white" : "text-ocean-400 hover:text-white"}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      {/* Total */}
      <div className="px-6 mb-6">
        <div className="bg-gradient-to-br from-caribbean-500 to-caribbean-700 rounded-3xl p-6">
          <p className="text-caribbean-200 text-sm mb-1">Total earnings</p>
          <p className="text-4xl font-bold">{formatCurrency(data.total)}</p>
        </div>
      </div>
      {/* Stats */}
      <div className="px-6 mb-6 grid grid-cols-2 gap-3">
        <div className="bg-ocean-900 rounded-2xl p-4 border border-ocean-800">
          <Car className="w-5 h-5 text-caribbean-400 mb-2" />
          <p className="text-2xl font-bold">{data.trips}</p>
          <p className="text-xs text-ocean-400">Trips completed</p>
        </div>
        <div className="bg-ocean-900 rounded-2xl p-4 border border-ocean-800">
          <Clock className="w-5 h-5 text-reef-400 mb-2" />
          <p className="text-2xl font-bold">{data.hours}h</p>
          <p className="text-xs text-ocean-400">Hours online</p>
        </div>
      </div>
      {/* Chart */}
      <div className="px-6">
        <p className="text-xs font-semibold text-ocean-400 uppercase tracking-widest mb-3">Earnings breakdown</p>
        <div className="bg-ocean-900 rounded-2xl p-4 border border-ocean-800">
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={data.chart}>
              <XAxis dataKey="label" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "12px", fontSize: 12 }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(v: any) => [formatCurrency(Number(v)), "Earned"]}
              />
              <Bar dataKey="amount" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
