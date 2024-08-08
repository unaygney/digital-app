import BillingPlan, { Subscribe } from "@/components/billing-plan";
import { db } from "@/db";
import { getTokenAndVerify } from "@/lib/auth";
import { subscribe } from "diagnostics_channel";
import React from "react";

export default async function PlanPage() {
  const email = await getTokenAndVerify();

  const user = await db.user.findUnique({
    where: { email },
    include: { subscription: true },
  });

  const subscribe = user?.subscription;

  return <BillingPlan subscribe={subscribe as Subscribe} />;
}
