"use server";

import { db } from "@/db";
import { getTokenAndVerify, verifyJwtToken } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import {
  BillingInformationFormData,
  billingInformationSchema,
} from "@/lib/validations";

export const createBillingInformation = async (
  data: BillingInformationFormData,
) => {
  const email = await getTokenAndVerify();

  const isValid = billingInformationSchema.safeParse(data);

  if (!isValid.success) {
    const errors = isValid.error.flatten().fieldErrors;
    const errorMessage = Object.values(errors).flat().join(", ");
    return { message: errorMessage };
  }

  const {
    email: billingEmail,

    address,
    city,
    zip,
    country,

    state,
    address2,
  } = data;

  const user = await db.user.findUnique({
    where: { email },
    include: { billingInformation: true },
  });

  if (!user) return { message: "User not found" };

  if (user.billingInformation) {
    return { message: "Billing information already exists" };
  }

  const billingInformation = await db.billingInformation.upsert({
    where: { userId: user.id },
    update: {
      email: billingEmail,
      address,
      city,
      zip,
      country,
      state,
      address2,
    },
    create: {
      email: billingEmail,
      address,
      city,
      zip,
      country,
      state,
      address2,
      userId: user.id,
    },
  });

  return { message: "Billing information created" };
};
export const getPayments = async () => {
  const user = await db.user.findUnique({
    where: { email: await getTokenAndVerify() },
    include: { subscriptionHistory: true },
  });

  if (!user) return [];

  return user.subscriptionHistory;
};
export const createSetupIntent = async () => {
  const email = await getTokenAndVerify();
  if (!email) return { message: "User not found" };

  const user = await db.user.findUnique({
    where: { email },
    include: { billingInformation: true },
  });

  if (!user) return { message: "User not found" };

  const customer = await stripe.customers.create({
    email: user.email,
  });

  const setupIntent = await stripe.setupIntents.create({
    payment_method_types: ["card"],
    customer: customer.id ?? null,
    metadata: { email, userId: user.id, customerId: customer.id },
  });

  await db.subscription.update({
    where: { userId: user.id },
    data: {
      customerId: customer.id,
    },
  });
  return { clientSecret: setupIntent.client_secret };
};
export const updateBillingInformationWithPaymentMethod = async (
  paymentId: string,
) => {
  try {
    const email = await getTokenAndVerify();
    const user = await db.user.findUnique({
      where: { email },
      include: { billingInformation: true, subscription: true },
    });

    if (!user) return { message: "User not found" };

    if (!user.billingInformation) {
      return { message: "Billing information not found" };
    }

    if (!user.subscription) {
      return { message: "Subscription not found" };
    }

    await db.subscription.update({
      where: { id: user.subscription.id },
      data: {
        paymentId,
      },
    });

    return { message: "Billing information updated" };
  } catch (e) {
    console.log("Error updating billing information:", e);
    return { message: "Error updating billing information" };
  }
};
