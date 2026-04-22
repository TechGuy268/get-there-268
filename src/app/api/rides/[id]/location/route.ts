import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pusherServer as pusher } from "@/lib/pusher";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { lat, lng, driverId } = await req.json();
    if (!lat || !lng || !driverId) {
      return NextResponse.json({ error: "lat, lng, driverId required" }, { status: 400 });
    }

    await db.driverProfile.update({ where: { userId: driverId }, data: { currentLat: lat, currentLng: lng } });
    await pusher.trigger(`ride-${id}`, "driver-location", { lat, lng, timestamp: Date.now() });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
