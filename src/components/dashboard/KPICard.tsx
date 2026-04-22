"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn, formatNumber, formatCurrency, formatPercent } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { KPIMetric } from "@/types";

interface KPICardProps {
  metric: KPIMetric;
  loading?: boolean;
}

export function KPICard({ metric, loading }: KPICardProps) {
  if (loading) {
    return (
      <Card>
        <CardContent className="p-5">
          <Skeleton className="h-4 w-24 mb-3" />
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-3 w-16" />
        </CardContent>
      </Card>
    );
  }

  const { label, value, delta, deltaLabel, trend, format } = metric;

  const formattedValue =
    format === "currency"
      ? formatCurrency(Number(value))
      : format === "percent"
      ? formatPercent(Number(value))
      : formatNumber(Number(value), true);

  const trendData = trend?.map((v, i) => ({ i, v })) ?? [];

  const isPositive = delta !== undefined && delta > 0;
  const isNegative = delta !== undefined && delta < 0;
  const isNeutral = delta === undefined || delta === 0;

  return (
    <Card className="group hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-5">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
          {label}
        </p>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-2xl font-bold text-foreground tabular-nums">
              {typeof value === "string" ? value : formattedValue}
            </p>
            {delta !== undefined && (
              <div
                className={cn(
                  "flex items-center gap-1 mt-1 text-xs font-medium",
                  isPositive && "text-reef-600",
                  isNegative && "text-destructive",
                  isNeutral && "text-muted-foreground"
                )}
              >
                {isPositive && <TrendingUp className="w-3 h-3" />}
                {isNegative && <TrendingDown className="w-3 h-3" />}
                {isNeutral && <Minus className="w-3 h-3" />}
                <span>
                  {isPositive ? "+" : ""}
                  {formatPercent(delta)} {deltaLabel ?? "vs last period"}
                </span>
              </div>
            )}
          </div>
          {trendData.length > 0 && (
            <div className="w-24 h-12 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <Tooltip
                    content={() => null}
                  />
                  <Line
                    type="monotone"
                    dataKey="v"
                    stroke={
                      isPositive
                        ? "#10b981"
                        : isNegative
                        ? "#ef4444"
                        : "#0ea5e9"
                    }
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
