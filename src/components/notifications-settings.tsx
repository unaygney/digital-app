"use client";

import { getPreferences, updatePreferences } from "@/app/(dashboard)/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Button } from "./ui/button";
import {
  NotificationsSettingsFormData,
  notificationsSettingsSchema,
} from "@/lib/validations";
import { Loader2 } from "lucide-react";
import { useToast } from "./ui/use-toast";

type Preferences = NotificationsSettingsFormData;

export default function NotificationsSettings() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    data: preferences,
    isLoading,
    error,
  } = useQuery<Preferences>({
    queryKey: ["notifications"],
    queryFn: async () => await getPreferences(),
    initialData: {
      comments: { email: false, push: false, sms: false },
      features: { email: false, push: false, sms: false },
      friend_requests: { email: false, push: false, sms: false },
      friend_updates: { email: false, push: false, sms: false },
      marketing: { email: false, push: false, sms: false },
    },
  });

  const form = useForm<NotificationsSettingsFormData>({
    resolver: zodResolver(notificationsSettingsSchema),
    defaultValues: preferences,
  });

  const {
    formState: { errors, isDirty, isSubmitting },
  } = form;

  async function onSubmit(data: NotificationsSettingsFormData) {
    console.log(data);
    const res = await updatePreferences(data);
    if (res) {
      queryClient.invalidateQueries("notifications");
      toast({
        description: res.message,
      });
    }
  }
  const sections = [
    { name: "comments", label: "Comments" },
    { name: "features", label: "Features" },
    { name: "friend_requests", label: "Friend Requests" },
    { name: "friend_updates", label: "Friend Updates" },
    { name: "marketing", label: "Marketing" },
  ] as const;

  React.useEffect(() => {
    form.reset(preferences);
  }, [preferences, form]);

  return (
    <section
      id="account-settings"
      className="flex w-full max-w-[1216px] flex-col gap-8"
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold leading-7 text-neutral-900">
          Manage Your Notifications
        </h3>
        <p className="text-sm font-normal leading-5 text-neutral-500">
          Choose how you want to be notified about the latest updates and
          messages.
        </p>
      </div>

      <div className="flex w-full max-w-[592px] flex-col">
        <div className="flex w-full justify-end gap-6 border-b border-neutral-200 py-2 pr-6 md:gap-20">
          <span className="text-sm font-semibold leading-5 text-neutral-900">
            Email
          </span>
          <span className="text-sm font-semibold leading-5 text-neutral-900">
            Push
          </span>
          <span className="text-sm font-semibold leading-5 text-neutral-900">
            SMS
          </span>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-6 space-y-6"
          >
            <div className="mt-4 space-y-4">
              {sections.map((section) => (
                <div className="flex justify-between" key={section.name}>
                  <FormLabel className="w-[225px] text-sm font-normal leading-5 text-neutral-900">
                    {section.label}
                  </FormLabel>
                  <div className="flex items-center gap-5 md:gap-20">
                    <FormField
                      control={form.control}
                      name={`${section.name}.email`}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between space-y-0">
                          <FormControl className="">
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`${section.name}.push`}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <FormControl className="">
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`${section.name}.sms`}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between pr-5">
                          <FormControl className="">
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Button
              size={"large"}
              type="submit"
              className="ml-auto self-start"
              disabled={isSubmitting || !isDirty}
            >
              {isSubmitting && <Loader2 className="animate-spin" />}
              Save Changes
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
