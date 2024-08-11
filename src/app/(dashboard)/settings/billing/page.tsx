"use client";
import React, { useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import BillingInformation from "@/components/billing-information";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function BillingPage() {
  const [clientSecret, setClientSecret] = React.useState<string>("");

  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-setup-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const appearance = {
    theme: "stripe" as const,
  };
  const options: StripeElementsOptions = {
    clientSecret: clientSecret!,
    appearance,
    locale: "en",
  };

  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <BillingInformation />
        </Elements>
      )}
    </>
  );
}
