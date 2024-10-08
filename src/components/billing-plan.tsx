"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Brifcase } from "./icons";
import { planSchema } from "@/lib/validations";
import { Loader2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { updateBillingPlan } from "@/app/(dashboard)/settings/plan/actions";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { PaymentModal } from "./payment-modal";
import NoBillingModal from "./no-billing-modal";
import { useCustomNavigationGuard } from "@/hooks/use-unsaved-changes";
import { LeaveAlertDialog } from "./leave-modal";
import PaymentHistory from "./payment-history";
export interface Subscribe {
  id: number;
  userId: string;
  planType: "basic" | "starter" | "pro";
  previousPlan: "basic" | "starter" | "pro" | null;
  pricing: number;
  expiryDate: null | Date;
  createdAt: Date;
  updatedAt: Date;
}

export default function BillingPlan({ subscribe }: { subscribe: Subscribe }) {
  const { toast } = useToast();
  const router = useRouter();
  const [noBilling, setNoBilling] = useState<boolean>(false);
  const [leaveState, setLeaveState] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(
    subscribe?.planType || "starter",
  );

  const form = useForm<z.infer<typeof planSchema>>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      plan: subscribe?.planType || "starter",
    },
  });

  const {
    reset,
    formState: { isSubmitting, isDirty },
  } = form;

  const { pendingUrl } = useCustomNavigationGuard(isDirty, setLeaveState);

  async function onSubmit(values: z.infer<typeof planSchema>) {
    const res = await updateBillingPlan(values);

    toast({
      description: res.message,
    });

    if (res.message === "Billing information not found") {
      setNoBilling(true);
    }
    router.refresh();
    reset(values);
  }

  const handleConfirmLeave = () => {
    setLeaveState(false);
    window.location.href = pendingUrl as string;
  };

  const handleCancelLeave = () => {
    setLeaveState(false);
  };

  return (
    <section id="account-settings" className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold leading-7 text-neutral-900">
          Billing plans
        </h3>
        <p className="text-sm font-normal leading-5 text-neutral-500">
          Explore billing plans tailored for teams of all sizes, from solo
          ventures to groups of up to 50.
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col space-y-8 lg:flex-1"
          >
            <FormField
              control={form.control}
              name="plan"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedPlan(value);
                      }}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem
                        className={`relative flex items-center space-y-0 rounded-lg border p-5 ${
                          selectedPlan === "starter"
                            ? "border-indigo-700"
                            : "border-neutral-200"
                        }`}
                      >
                        <FormLabel className="font-normal" htmlFor="starter">
                          <FormControl>
                            <RadioGroupItem
                              value="starter"
                              id="starter"
                              className="absolute right-5 top-1/2 -translate-y-1/2"
                            />
                          </FormControl>
                          <div className="flex items-center gap-5">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                              <Brifcase className="text-indigo-700" />
                            </span>
                            <div className="flex flex-col gap-1">
                              <h6 className="text-lg font-semibold leading-7 text-neutral-900">
                                Starter plan • $0/month
                              </h6>
                              <p className="text-sm font-normal leading-5 text-neutral-600">
                                Includes up to 10 users, 20GB individual data
                                and access to all features.
                              </p>
                            </div>
                          </div>
                        </FormLabel>
                      </FormItem>
                      <FormItem
                        className={`relative flex items-center space-y-0 rounded-lg border p-5 ${
                          selectedPlan === "basic"
                            ? "border-indigo-700"
                            : "border-neutral-200"
                        }`}
                      >
                        <FormLabel className="font-normal" htmlFor="basic">
                          <FormControl>
                            <RadioGroupItem
                              value="basic"
                              id="basic"
                              className="absolute right-5 top-1/2 -translate-y-1/2"
                            />
                          </FormControl>
                          <div className="flex items-center gap-5">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                              <Brifcase className="text-green-700" />
                            </span>
                            <div className="flex flex-col gap-1">
                              <div className="flex gap-2">
                                <h6 className="text-lg font-semibold leading-7 text-neutral-900">
                                  Basic plan • $6/month
                                </h6>
                                <Badge variant="success" size="medium">
                                  Recommended
                                </Badge>
                              </div>
                              <p className="text-sm font-normal leading-5 text-neutral-600">
                                Includes up to 20 users, 40GB individual data
                                and access to all features.
                              </p>
                            </div>
                          </div>
                        </FormLabel>
                      </FormItem>
                      <FormItem
                        className={`relative flex items-center space-y-0 rounded-lg border p-5 ${
                          selectedPlan === "pro"
                            ? "border-indigo-700"
                            : "border-neutral-200"
                        }`}
                      >
                        <FormLabel className="font-normal" htmlFor="pro">
                          <FormControl>
                            <RadioGroupItem
                              value="pro"
                              id="pro"
                              className="absolute right-5 top-1/2 -translate-y-1/2"
                            />
                          </FormControl>
                          <div className="flex items-center gap-5">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
                              <Brifcase className="text-amber-500" />
                            </span>
                            <div className="flex flex-col gap-1">
                              <h6 className="text-lg font-semibold leading-7 text-neutral-900">
                                Professional plan • $12/month
                              </h6>
                              <p className="text-sm font-normal leading-5 text-neutral-600">
                                Includes up to 50 users, 100GB individual data
                                and access to all features.
                              </p>
                            </div>
                          </div>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              size="large"
              disabled={isSubmitting}
              className="ml-auto self-start"
            >
              Save changes
            </Button>
          </form>
        </Form>
        <div className="flex flex-col gap-3 self-start rounded-lg border border-neutral-200 bg-white p-4 lg:w-[280px]">
          <h3 className="mb-3 text-lg font-semibold leading-7 text-neutral-900">
            Your current subscription
          </h3>
          <div className="flex items-center justify-between">
            <h6 className="text-sm font-normal leading-5 text-neutral-400">
              Plan Type
            </h6>
            <p className="text-sm font-medium capitalize leading-5 text-neutral-900">
              {subscribe?.planType} Plan
            </p>
          </div>
          <hr />
          <div className="flex items-center justify-between">
            <h6 className="text-sm font-normal leading-5 text-neutral-400">
              Pricing
            </h6>
            <p className="text-sm font-medium leading-5 text-neutral-900">
              ${subscribe?.pricing} per month
            </p>
          </div>

          {subscribe?.expiryDate && (
            <>
              <hr />
              <div className="flex items-center justify-between">
                <h6 className="text-sm font-normal leading-5 text-neutral-400">
                  Next Billing
                </h6>
                <p className="text-sm font-medium leading-5 text-neutral-900">
                  {formatDate(subscribe?.expiryDate)}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <NoBillingModal open={noBilling} setOpen={setNoBilling} />
      <LeaveAlertDialog
        leaveState={leaveState}
        onCancel={handleCancelLeave}
        onConfirm={handleConfirmLeave}
      />

      <PaymentModal open={isSubmitting} />
    </section>
  );
}
