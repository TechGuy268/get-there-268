import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const onlineOnly = searchParams.get("online") === "true";
  try {
    const drivers = await db.driverProfile.findMany({
      where: { isApproved: true, ...(onlineOnly && { isOnline: true }) },
      include: { user: { select: { id: true, name: true, email: true, phone: true } } },
    });
    return NextResponse.json(drivers);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
