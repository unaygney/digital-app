"use client";
import React from "react";
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
import { createBillingInformation } from "@/app/(dashboard)/settings/billing/actions";
import { useRouter } from "next/navigation";

export default function BillingInformation() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<BillingInformationFormData>({
    resolver: zodResolver(billingInformationSchema),
  });

  const {
    watch,
    reset,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: BillingInformationFormData) {
    const res = await createBillingInformation(values);

    toast({
      description: res.message,
    });
    router.refresh();
  }

  return (
    <section
      id="account-settings"
      className="flex w-full max-w-[1216px] flex-col gap-8"
    >
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
            <div className="flex flex-1 flex-col gap-6">
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Card number</FormLabel>
                    <FormControl>
                      <Input placeholder="1234 1234 1234 1234" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cardHolder"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Cardholder name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name on card" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="expiration"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>Expiry</FormLabel>
                      <FormControl>
                        <Input placeholder="MM/YY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>CVV</FormLabel>
                      <FormControl>
                        <Input placeholder="123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
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
    </section>
  );
}
