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

import { Loader2 } from "lucide-react";
import {
  BillingInformationFormData,
  billingInformationSchema,
} from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";

export default function BillingInformation() {
  const form = useForm<BillingInformationFormData>({
    resolver: zodResolver(billingInformationSchema),
  });

  const {
    watch,
    reset,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: BillingInformationFormData) {
    console.log(values);
  }

  return (
    <section
      id="account-settings"
      className="flex w-full max-w-[1216px] flex-col gap-8 p-5"
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
          className="flex w-full max-w-[784px] flex-col gap-8"
        >
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your current password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
