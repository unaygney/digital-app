"use server";

import { db } from "@/db";
import { getTokenAndVerify } from "@/lib/auth";
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
    cardNumber,
    cardHolder,
    email: billingEmail,
    cvv,
    address,
    city,
    zip,
    country,
    expiration,
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

  await db.billingInformation.create({
    data: {
      cardNumber,
      cardHolder,
      email: billingEmail,
      cvv,
      address,
      city,
      zip,
      country,
      expiration,
      state,
      address2,
      userId: user.id,
    },
  });

  return { message: "Billing information created" };
};

type Payment = {
  amount: number;
  plan: string;
  status: string;
  invoice_url: string;
  created_at: string;
};

export const getPayments = async () => {
  const res = await fetch(
    "https://www.greatfrontend.com/api/projects/challenges/account/billing/history",
  );
  const data = await res.json();
  return data.data as Payment[];
};
