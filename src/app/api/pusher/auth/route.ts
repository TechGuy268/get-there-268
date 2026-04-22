import { NextRequest, NextResponse } from "next/server";
import { pusherServer as pusher } from "@/lib/pusher";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const params = new URLSearchParams(body);
    const socketId = params.get("socket_id");
    const channel = params.get("channel_name");

    if (!socketId || !channel) {
      return NextResponse.json({ error: "socket_id and channel_name required" }, { status: 400 });
    }

    const auth = pusher.authorizeChannel(socketId, channel);
    return NextResponse.json(auth);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
