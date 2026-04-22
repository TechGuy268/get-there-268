import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pusherServer as pusher } from "@/lib/pusher";
import { calculateFare, getDefaultPricing } from "@/lib/fare";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { riderId, pickupAddress, pickupLat, pickupLng, destAddress, destLat, destLng, paymentMethod, distanceKm, durationMin } = body;

    if (!riderId || !pickupAddress || !destAddress) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const pricing = await db.pricingConfig.findFirst() ?? getDefaultPricing();
    const fare = calculateFare(distanceKm ?? 5, durationMin ?? 10, pricing);

    const ride = await db.ride.create({
      data: {
        riderId,
        pickupAddress,
        pickupLat: pickupLat ?? 17.1274,
        pickupLng: pickupLng ?? -61.8468,
        destAddress,
        destLat: destLat ?? 17.1367,
        destLng: destLng ?? -61.7929,
        fareEstimate: fare.total,
        paymentMethod: paymentMethod ?? "CASH",
        distanceKm: distanceKm ?? 5,
        durationMin: durationMin ?? 10,
      },
    });

    // Notify available drivers
    const onlineDrivers = await db.driverProfile.findMany({ where: { isOnline: true, isApproved: true } });
    for (const driver of onlineDrivers) {
      await pusher.trigger(`driver-${driver.userId}`, "ride-request", {
        rideId: ride.id,
        pickup: pickupAddress,
        destination: destAddress,
        fareEstimate: fare.total,
        distanceKm: distanceKm ?? 5,
      });
    }

    return NextResponse.json(ride, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const riderId = searchParams.get("riderId");
  const driverId = searchParams.get("driverId");

  try {
    const rides = await db.ride.findMany({
      where: riderId ? { riderId } : driverId ? { driverId } : {},
      orderBy: { requestedAt: "desc" },
      take: 50,
    });
    return NextResponse.json(rides);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
