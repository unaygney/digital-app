import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getTokenAndVerify } from "@/lib/auth";

export async function POST(req: NextRequest, res: NextResponse) {
  const email = await getTokenAndVerify();

  const setupIntent = await stripe.setupIntents.create({
    payment_method_types: ["card"],
    metadata: { email },
  });

  return NextResponse.json({
    clientSecret: setupIntent.client_secret,
  });
}
