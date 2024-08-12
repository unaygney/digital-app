"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";
import {
  BillingInformationFormData,
  billingInformationSchema,
} from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createBillingInformation,
  createSetupIntent,
  updateBillingInformationWithPaymentMethod,
} from "@/app/(dashboard)/settings/billing/actions";

import { useCustomNavigationGuard } from "@/hooks/use-unsaved-changes";
import { LeaveAlertDialog } from "./leave-modal";
import PaymentHistory from "./payment-history";

import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";

export default function BillingInformation() {
  const [leaveState, setLeaveState] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();

  const form = useForm<BillingInformationFormData>({
    resolver: zodResolver(billingInformationSchema),
  });
  const {
    reset,
    formState: { isSubmitting, isDirty },
  } = form;

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret",
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const { pendingUrl } = useCustomNavigationGuard(isDirty, setLeaveState);

  async function onSubmit(values: BillingInformationFormData) {
    if (!stripe || !elements) {
      return;
    }

    const { clientSecret } = await createSetupIntent();

    if (!clientSecret) {
      console.log("Error creating setup intent");
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      console.error(submitError.message);
      return;
    }

    const result = await stripe.confirmSetup({
      clientSecret,
      elements,
      redirect: "if_required",
    });

    if (result.error) {
      toast({
        description: result.error.message,
      });
    } else if ("setupIntent" in result && result.setupIntent) {
      const { payment_method } = result.setupIntent;

      const res = await updateBillingInformationWithPaymentMethod(
        payment_method as string,
      );

      const res2 = await createBillingInformation(values);

      toast({
        description: "Payment information saved successfully!",
      });

      reset(values);
    }
  }

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleConfirmLeave = () => {
    setLeaveState(false);
    window.location.href = pendingUrl as string;
  };

  const handleCancelLeave = () => {
    setLeaveState(false);
  };

  const options: StripePaymentElementOptions = {
    layout: { type: "tabs" },
  };

  if (mounted) {
    return (
      <section
        id="account-settings"
        className="flex w-full max-w-[1216px] flex-col gap-8"
      >
        <PaymentHistory />

        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold leading-7 text-neutral-900">
            Billing Information
          </h3>
          <p className="text-sm font-normal leading-5 text-neutral-500">
            Update your billing details and address
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-6"
          >
            {/* Payment Details */}
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="w-full md:max-w-[213px] lg:max-w-[385px]">
                <h4 className="text-base font-medium leading-6 text-neutral-900">
                  Payment Details
                </h4>
              </div>
              <PaymentElement
                className="w-full"
                id="payment-element"
                options={options}
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-6 border-y border-neutral-200 py-8 md:flex-row">
              <div className="w-full md:max-w-[213px] lg:max-w-[385px]">
                <h4 className="text-base font-medium leading-6 text-neutral-900">
                  Email address
                </h4>
              </div>
              <div className="flex flex-1 flex-col gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="user@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* Address details */}
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="w-full md:max-w-[213px] lg:max-w-[385px]">
                <h4 className="text-base font-medium leading-6 text-neutral-900">
                  Address details
                </h4>
              </div>
              <div className="flex flex-1 flex-col gap-6">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>Country / Region</FormLabel>
                      <FormControl>
                        <Input placeholder="Country / Region" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Street address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address2"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormControl>
                        <Input
                          placeholder="Apartment, suite, etc (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-3 gap-8">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="City" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="State" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zip"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>Zip</FormLabel>
                        <FormControl>
                          <Input placeholder="12345" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              size="large"
              type="submit"
              className="ml-auto self-start"
            >
              {isSubmitting && <Loader2 className="animate-spin" />}
              Save Changes
            </Button>
          </form>
        </Form>

        <LeaveAlertDialog
          leaveState={leaveState}
          onConfirm={handleConfirmLeave}
          onCancel={handleCancelLeave}
        />
      </section>
    );
  }
}
