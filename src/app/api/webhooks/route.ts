import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    if (event.type === "payment_intent.succeeded") {
      const session = event.data.object as Stripe.PaymentIntent;

      // get the customer
      const customerId = session.customer as string;
      const customer = await stripe.customers.retrieve(customerId);

      // get the email
      let email = "";
      if ((customer as Stripe.Customer).email) {
        email = (customer as Stripe.Customer).email as string;
      } else {
        console.log(
          "This customer might be deleted or does not have an email.",
        );
      }

      const user = await db.user.findUnique({
        where: { email },
      });
      if (!user)
        NextResponse.json({ error: "User not found" }, { status: 400 });

      // Update the user's subscription status in the database
      await db.subscription.update({
        where: { userId: user?.id },
        data: {
          status: "paid",
        },
      });
      //! not correct code but you get the idea
      await db.subscriptionHistory.updateMany({
        where: {
          status: "pending",
        },
        data: {
          status: "paid",
        },
      });

      const response = NextResponse.json({
        success: true,
        message: "Subscription status update",
      });
      return response;
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 },
    );
  }
}
