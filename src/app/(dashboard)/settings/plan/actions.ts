"use server";

import { db } from "@/db";
import { getTokenAndVerify } from "@/lib/auth";
import { PlanFormData, planSchema } from "@/lib/validations";

export const updateBillingPlan = async (data: PlanFormData) => {
  // check plan is valid
  const isValid = planSchema.safeParse(data);

  // if plan is not valid, return error message
  if (!isValid.success) {
    const errors = isValid.error.flatten().fieldErrors;
    const errorMessage = Object.values(errors).flat().join(", ");
    return { message: errorMessage };
  }

  const email = await getTokenAndVerify();

  if (!email) {
    return { message: "Unauthorized" };
  }

  const user = await db.user.findUnique({
    where: { email },
    include: {
      subscription: true,
      billingInformation: true,
      subscriptionHistory: true,
    },
  });

  if (!user?.billingInformation) {
    return { message: "Billing information not found" };
  }

  if (!user) {
    return { message: "User not found" };
  }

  if (!user.subscription) {
    return { message: "Subscription not found" };
  }

  // get plan and update or downgrade
  const { plan } = data;

  //! Make a request to the stripe API to payment
  /*
First , we need a custom payment flow to handle the payment for the subscription.
We will use the stripe API to handle the payment flow.
Current Subscription Plan must be Pending.
We will update the plan when webhook is received from stripe (only if success ).

*/

  // handle price and expiry date based on plan
  let pricing = 0;
  let expiryDate = null;

  if (plan === "starter") {
    pricing = 0;
    expiryDate = null;
  } else if (plan === "basic") {
    pricing = 6;
    expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);
  } else if (plan === "pro") {
    pricing = 12;
    expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);
  }

  // update currenct subcribe plan
  const subscribe = await db.subscription.update({
    where: { userId: user.id },
    data: {
      planType: plan,
      previousPlan: user.subscription?.planType,
      pricing,
      expiryDate,
      status: "pending",
    },
  });

  return { message: "Plan updated successfully", subscribe };
};
