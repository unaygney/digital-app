"use server";

import { db } from "@/db";
import { signUpSchema } from "@/lib/validations";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function create(data: {
  email: string;
  password: string;
  terms: boolean;
}) {
  try {
    let isValid = signUpSchema.safeParse(data);

    if (!isValid.success) {
      return { errors: isValid.error.flatten().fieldErrors };
    }

    // all emails should be lowercase to avoid duplicates
    data.email = data.email.toLowerCase();

    // Check if email is already in use
    let user = await db.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (user) {
      return { errors: "Email is already in use" };
    }

    // hast to password
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(data.password, salt);

    // Set up defaultPreferences
    const defaultPreferences = {
      comments: {
        email: false,
        push: false,
        sms: false,
      },
      features: {
        email: false,
        push: false,
        sms: false,
      },
      friend_requests: {
        email: false,
        push: false,
        sms: false,
      },
      friend_updates: {
        email: false,
        push: false,
        sms: false,
      },
      marketing: {
        email: false,
        push: false,
        sms: false,
      },
    };

    const invoiceStart = new Date();
    const invoiceEnd = new Date();
    invoiceEnd.setMonth(invoiceEnd.getMonth() + 1);
    // Create user
    let newUser = await db.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        preferences: defaultPreferences,
        subscription: {
          create: {
            planType: "starter",
            previousPlan: null,
            expiryDate: null,
            pricing: 0,
            status: "paid",
          },
        },
        subscriptionHistory: {
          create: {
            amount: 0,
            planType: "starter",
            invoiceStart: invoiceStart,
            invoiceEnd: invoiceEnd,
            downloadLink:
              "https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/projects-images/billing-history-section/starter/invoices/GFE-0004.pdf",
            status: "paid",
          },
        },
      },
    });

    return { message: "User created successfully" };
  } catch (e) {
    console.log(e);
  }

  redirect("/sign-in");
}
