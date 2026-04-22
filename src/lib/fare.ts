import type { FareEstimate, PricingConfig } from "@/types";

export function calculateFare(
  distanceKm: number,
  durationMin: number,
  config: PricingConfig
): FareEstimate {
  const base = config.baseFare;
  const distanceCharge = distanceKm * config.perKm;
  const timeCharge = durationMin * config.perMinute;
  const subtotal = base + distanceCharge + timeCharge;
  const surge = config.surgeActive ? subtotal * (config.surgeMultiplier - 1) : 0;
  const total = Math.ceil((subtotal + surge) * 2) / 2; // round to nearest $0.50

  return {
    base,
    distanceCharge,
    timeCharge,
    surge,
    total,
    distanceKm,
    durationMin,
    currency: config.currency,
  };
}

export function getDefaultPricing(): PricingConfig {
  return {
    id: "default",
    baseFare: 3.0,
    perKm: 1.5,
    perMinute: 0.25,
    surgeActive: false,
    surgeMultiplier: 1.0,
    currency: "XCD",
  };
}
