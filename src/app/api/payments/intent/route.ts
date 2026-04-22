import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { rideId, amount } = await req.json();
    if (!rideId || !amount) {
      return NextResponse.json({ error: "rideId and amount required" }, { status: 400 });
    }

    const paymentIntent = await getStripe().paymentIntents.create({
      amount: Math.round(amount * 100), // cents
      currency: "xcd",
      metadata: { rideId },
    });

    await db.payment.upsert({
      where: { rideId },
      create: { rideId, amount, method: "CARD", stripePaymentIntentId: paymentIntent.id },
      update: { stripePaymentIntentId: paymentIntent.id },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
