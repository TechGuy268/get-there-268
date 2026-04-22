import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pusherServer as pusher } from "@/lib/pusher";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const messages = await db.message.findMany({
      where: { rideId: id },
      include: { sender: { select: { id: true, name: true, role: true } } },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(messages);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { senderId, content } = await req.json();
    if (!senderId || !content?.trim()) {
      return NextResponse.json({ error: "senderId and content required" }, { status: 400 });
    }

    const message = await db.message.create({
      data: { rideId: id, senderId, content: content.trim() },
      include: { sender: { select: { id: true, name: true, role: true } } },
    });

    await pusher.trigger(`ride-${id}`, "new-message", {
      id: message.id,
      content: message.content,
      sender: message.sender,
      createdAt: message.createdAt,
    });

    return NextResponse.json(message, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
