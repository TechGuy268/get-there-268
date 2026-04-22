import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "XCD"): string {
  return new Intl.NumberFormat("en-AG", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${Math.round(minutes)} min`;
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function formatDistance(km: number): string {
  return km < 1 ? `${Math.round(km * 1000)}m` : `${km.toFixed(1)} km`;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getRideStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    REQUESTED: "Finding driver...",
    ACCEPTED: "Driver accepted",
    ARRIVING: "Driver arriving",
    IN_PROGRESS: "On the way",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
  };
  return labels[status] ?? status;
}

export function getRideStatusColor(status: string): string {
  const colors: Record<string, string> = {
    REQUESTED: "text-amber-600 bg-amber-50 border-amber-200",
    ACCEPTED: "text-caribbean-600 bg-caribbean-50 border-caribbean-200",
    ARRIVING: "text-blue-600 bg-blue-50 border-blue-200",
    IN_PROGRESS: "text-reef-600 bg-reef-50 border-reef-200",
    COMPLETED: "text-reef-700 bg-reef-50 border-reef-200",
    CANCELLED: "text-red-600 bg-red-50 border-red-200",
  };
  return colors[status] ?? "text-muted-foreground bg-muted";
}
