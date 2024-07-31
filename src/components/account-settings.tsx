"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import ImageUploader from "./image-uploader";
import { useForm } from "react-hook-form";
import {
  AccountSettingsFormData,
  accountSettingsSchema,
} from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useQuery } from "react-query";
import { getUser, uploadAccountSettings } from "@/app/(dashboard)/actions";
import { useToast } from "./ui/use-toast";

export default function AccountSettings({ id }: { id: string }) {
  const [defaultValues, setDefaultValues] = React.useState<any>(null);
  const { toast } = useToast();
  const { data, error, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => await getUser(),
  });

  useEffect(() => {
    if (data && "email" in data) {
      const { email, firstName, lastName, profileImage } = data;
      setDefaultValues({
        firstName: firstName || "",
        lastName: lastName || "",
        email,
        profileImage,
      });
    }
  }, [data]);

  const form = useForm<AccountSettingsFormData>({
    resolver: zodResolver(accountSettingsSchema),
  });
  const { setValue } = form;

  useEffect(() => {
    if (defaultValues) {
      for (const key in defaultValues) {
        setValue(key as keyof AccountSettingsFormData, defaultValues[key]);
      }
    }
  }, [defaultValues, setValue]);

  async function onSubmit(values: AccountSettingsFormData) {
    const res = await uploadAccountSettings(values);

    toast({
      description: res.message,
    });
  }

  return (
    <section
      id="account-settings"
      className="flex w-full max-w-[1216px] flex-col gap-8 p-5"
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold leading-7 text-neutral-900">
          Manage Your Account
        </h3>
        <p className="text-sm font-normal leading-5 text-neutral-500">
          Update your account details below for a tailored experience on our
          platform.
        </p>
      </div>

      <div className="flex gap-4">
        <div className="relative h-[104px] w-[104px] overflow-hidden rounded-full">
          <Image
            src={defaultValues?.profileImage || "/placeholder-profile.png"}
            alt="profile image"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-4">
          <div className="w-[126px]">
            <ImageUploader id={id} />
          </div>
          <p>At least 800x800 px. JPG or PNG only.</p>
        </div>
      </div>

      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full max-w-[784px] flex-col gap-8"
          >
            <div className="grid grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Appleseed" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@mail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johnappleseed" {...field} />
                  </FormControl>
                  <FormDescription>
                    Allows others to find and interact with you easily.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full">
              <Button
                variant="primary"
                size="medium"
                type="submit"
                className="ml-auto w-[176px]"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
