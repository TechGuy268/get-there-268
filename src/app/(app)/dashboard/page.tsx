import type { Metadata } from "next";
import { Header } from "@/components/shared/Header";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartWidget } from "@/components/dashboard/ChartWidget";
import type { KPIMetric, ChartData } from "@/types";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Executive analytics dashboard with live KPIs and charts",
};

const kpis: KPIMetric[] = [
  {
    label: "Total Revenue",
    value: 4820000,
    delta: 12.4,
    deltaLabel: "vs last month",
    format: "currency",
    trend: [320, 380, 350, 420, 390, 460, 482],
  },
  {
    label: "Active Users",
    value: 24830,
    delta: 8.1,
    deltaLabel: "vs last month",
    format: "number",
    trend: [180, 210, 195, 240, 220, 260, 248],
  },
  {
    label: "Conversion Rate",
    value: 3.8,
    delta: -0.4,
    deltaLabel: "vs last month",
    format: "percent",
    trend: [4.2, 4.0, 3.9, 4.1, 3.7, 3.9, 3.8],
  },
  {
    label: "Avg Query Confidence",
    value: 87.3,
    delta: 2.1,
    deltaLabel: "vs last week",
    format: "percent",
    trend: [82, 84, 83, 86, 85, 87, 87],
  },
];

const revenueChart: ChartData = {
  type: "area",
  xKey: "month",
  yKeys: ["revenue", "target"],
  data: [
    { month: "Oct", revenue: 3200000, target: 3000000 },
    { month: "Nov", revenue: 3800000, target: 3500000 },
    { month: "Dec", revenue: 3500000, target: 3800000 },
    { month: "Jan", revenue: 4200000, target: 4000000 },
    { month: "Feb", revenue: 3900000, target: 4200000 },
    { month: "Mar", revenue: 4600000, target: 4400000 },
    { month: "Apr", revenue: 4820000, target: 4600000 },
  ],
};

const queryVolumeChart: ChartData = {
  type: "bar",
  xKey: "day",
  yKeys: ["queries"],
  data: [
    { day: "Mon", queries: 142 },
    { day: "Tue", queries: 198 },
    { day: "Wed", queries: 176 },
    { day: "Thu", queries: 224 },
    { day: "Fri", queries: 189 },
    { day: "Sat", queries: 87 },
    { day: "Sun", queries: 63 },
  ],
};

const topSourcesChart: ChartData = {
  type: "pie",
  xKey: "source",
  yKeys: ["queries"],
  data: [
    { source: "Sales DB", queries: 412 },
    { source: "Marketing", queries: 287 },
    { source: "Finance", queries: 198 },
    { source: "Operations", queries: 143 },
    { source: "Support", queries: 89 },
  ],
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <Header
        title="Dashboard"
        description="Live analytics overview — updated in real time"
      />
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* KPI Grid */}
        <section>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
            Key Metrics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((metric) => (
              <KPICard key={metric.label} metric={metric} />
            ))}
          </div>
        </section>

        {/* Charts */}
        <section>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
            Performance
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ChartWidget
              title="Revenue vs Target"
              data={revenueChart}
              className="lg:col-span-1"
            />
            <ChartWidget
              title="Query Volume (This Week)"
              data={queryVolumeChart}
            />
          </div>
        </section>

        <section>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <ChartWidget
              title="Top Data Sources"
              data={topSourcesChart}
            />
            <div className="lg:col-span-2">
              <div className="rounded-xl border bg-card p-5 h-full">
                <h3 className="text-sm font-medium text-muted-foreground mb-4">
                  Recent AI Queries
                </h3>
                <div className="space-y-3">
                  {[
                    { q: "What was our highest revenue day last month?", conf: 94, time: "2m ago" },
                    { q: "Show me customer churn by region", conf: 87, time: "8m ago" },
                    { q: "Top 10 products by profit margin this quarter", conf: 91, time: "15m ago" },
                    { q: "Compare MRR growth vs our 3 competitors", conf: 72, time: "32m ago" },
                    { q: "Alert me when daily active users drops below 20k", conf: 96, time: "1h ago" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between gap-4 py-2 border-b border-border last:border-0">
                      <p className="text-sm text-foreground truncate flex-1">{item.q}</p>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            item.conf >= 90
                              ? "bg-reef-100 text-reef-700"
                              : item.conf >= 75
                              ? "bg-caribbean-100 text-caribbean-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {item.conf}%
                        </span>
                        <span className="text-xs text-muted-foreground">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
