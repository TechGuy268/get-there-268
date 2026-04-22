import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pusherServer as pusher } from "@/lib/pusher";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const ride = await db.ride.findUnique({ where: { id }, include: { messages: true, review: true, payment: true } });
    if (!ride) return NextResponse.json({ error: "Ride not found" }, { status: 404 });
    return NextResponse.json(ride);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, driverId, fareActual } = body;

    const now = new Date();
    const timestamps: Record<string, Date> = {};
    if (status === "ACCEPTED") timestamps.acceptedAt = now;
    if (status === "IN_PROGRESS") timestamps.startedAt = now;
    if (status === "COMPLETED") timestamps.completedAt = now;
    if (status === "CANCELLED") timestamps.cancelledAt = now;

    const ride = await db.ride.update({
      where: { id },
      data: { ...(status && { status }), ...(driverId && { driverId }), ...(fareActual && { fareActual }), ...timestamps },
    });

    await pusher.trigger(`ride-${id}`, "status-update", { status: ride.status, rideId: id });

    return NextResponse.json(ride);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
