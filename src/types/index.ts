export type Role = "RIDER" | "DRIVER" | "ADMIN";
export type RideStatus = "REQUESTED" | "ACCEPTED" | "ARRIVING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
export type PayMethod = "CARD" | "CASH";
export type PayStatus = "PENDING" | "PAID" | "FAILED";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: Role;
  avatarUrl?: string | null;
  driverProfile?: DriverProfile | null;
  createdAt: string;
}

export interface DriverProfile {
  id: string;
  userId: string;
  licenseNumber: string;
  vehicleMake: string;
  vehicleModel: string;
  vehiclePlate: string;
  vehicleColor: string;
  isOnline: boolean;
  isApproved: boolean;
  rating: number;
  totalTrips: number;
  currentLat?: number | null;
  currentLng?: number | null;
}

export interface Ride {
  id: string;
  riderId: string;
  rider?: User;
  driverId?: string | null;
  driver?: User | null;
  pickupAddress: string;
  pickupLat: number;
  pickupLng: number;
  destAddress: string;
  destLat: number;
  destLng: number;
  status: RideStatus;
  fareEstimate: number;
  fareActual?: number | null;
  paymentMethod: PayMethod;
  distanceKm?: number | null;
  durationMin?: number | null;
  requestedAt: string;
  acceptedAt?: string | null;
  startedAt?: string | null;
  completedAt?: string | null;
  cancelledAt?: string | null;
  messages?: Message[];
  review?: Review | null;
  payment?: Payment | null;
}

export interface Message {
  id: string;
  rideId: string;
  senderId: string;
  sender?: User;
  content: string;
  createdAt: string;
}

export interface Review {
  id: string;
  rideId: string;
  fromUserId: string;
  toUserId: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
}

export interface Payment {
  id: string;
  rideId: string;
  amount: number;
  method: PayMethod;
  status: PayStatus;
  stripePaymentIntentId?: string | null;
  createdAt: string;
}

export interface PricingConfig {
  id: string;
  baseFare: number;
  perKm: number;
  perMinute: number;
  surgeActive: boolean;
  surgeMultiplier: number;
  currency: string;
}

export interface FareEstimate {
  base: number;
  distanceCharge: number;
  timeCharge: number;
  surge: number;
  total: number;
  distanceKm: number;
  durationMin: number;
  currency: string;
}
