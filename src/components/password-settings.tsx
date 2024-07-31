"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  passwordSettingsSchema,
  PasswordSettingsFormData,
} from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { CheckIcon, CloseEye, Eye } from "./icons"; // Assuming you have an OpenEye icon
import { cn } from "@/lib/utils";
import { changePassword } from "@/app/(dashboard)/actions";
import { Loader2 } from "lucide-react";

interface PasswordChecks {
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasMinLength: boolean;
  hasSpecialChar: boolean;
}

export default function PasswordSettings({ id }: { id: string }) {
  const [passwordChecks, setPasswordChecks] = useState<PasswordChecks>({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasMinLength: false,
    hasSpecialChar: false,
  });
  const [showPasswords, setShowPasswords] = useState<{
    [key: string]: boolean;
  }>({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { toast } = useToast();

  const form = useForm<PasswordSettingsFormData>({
    resolver: zodResolver(passwordSettingsSchema),
  });

  const {
    watch,
    reset,
    formState: { isSubmitting },
  } = form;
  const currentPass = watch("currentPassword");
  const newPass = watch("newPassword");
  const confirmPass = watch("confirmPassword");

  const onPasswordChange = (password: string) => {
    setPasswordChecks({
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasMinLength: password.length >= 8 && password.length <= 64,
      hasSpecialChar: /[!@#$%^&*]/.test(password),
    });
  };
  useEffect(() => {
    onPasswordChange(newPass || "");
  }, [newPass]);

  async function onSubmit(values: PasswordSettingsFormData) {
    const res = await changePassword(values);

    toast({
      description: res.message,
    });
    reset({ currentPassword: "", newPassword: "", confirmPassword: "" });
  }

  const togglePasswordVisibility = (field: string) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  useEffect(() => {
    setIsButtonDisabled(!currentPass || !newPass || !confirmPass);
  }, [currentPass, newPass, confirmPass]);

  console.log(isSubmitting);

  return (
    <section
      id="account-settings"
      className="flex w-full max-w-[1216px] flex-col gap-8 p-5"
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold leading-7 text-neutral-900">
          Manage Security
        </h3>
        <p className="text-sm font-normal leading-5 text-neutral-500">
          Protect your data and ensure secure interactions.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full max-w-[784px] flex-col gap-8"
        >
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input
                    type={showPasswords.currentPassword ? "text" : "password"}
                    placeholder="Enter your current password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("currentPassword")}
                  className="absolute right-4 top-10"
                >
                  {showPasswords.currentPassword ? <Eye /> : <CloseEye />}
                </button>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type={showPasswords.newPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("newPassword")}
                  className="absolute right-4 top-10"
                >
                  {showPasswords.newPassword ? <Eye /> : <CloseEye />}
                </button>
              </FormItem>
            )}
          />
          <PasswordControl passwordChecks={passwordChecks} />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="relative w-full">
                <FormLabel>Confirm new password</FormLabel>
                <FormControl>
                  <Input
                    type={showPasswords.confirmPassword ? "text" : "password"}
                    placeholder="Repeat your new password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className="absolute right-4 top-10"
                >
                  {showPasswords.confirmPassword ? <Eye /> : <CloseEye />}
                </button>
              </FormItem>
            )}
          />

          <div className="flex w-full">
            <Button
              variant="primary"
              size="medium"
              type="submit"
              className="ml-auto w-[176px]"
              disabled={isButtonDisabled || isSubmitting}
            >
              {isSubmitting && <Loader2 className="animate-spin" />}
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}

function PasswordControl({
  passwordChecks,
}: {
  passwordChecks: PasswordChecks;
}) {
  const {
    hasMinLength,
    hasLowerCase,
    hasNumber,
    hasSpecialChar,
    hasUpperCase,
  } = passwordChecks;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <CheckIcon
          className={cn("text-neutral-400 transition-colors duration-300", {
            "text-green-700": hasMinLength,
          })}
        />

        <p className="text-xs font-normal leading-4 text-neutral-600">
          8-64 characters
        </p>
      </div>
      <div className="flex items-center gap-3">
        <CheckIcon
          className={cn("text-neutral-400 transition-colors duration-300", {
            "text-green-700": hasUpperCase,
          })}
        />

        <p className="text-xs font-normal leading-4 text-neutral-600">
          One uppercase letter
        </p>
      </div>
      <div className="flex items-center gap-3">
        <CheckIcon
          className={cn("text-neutral-400 transition-colors duration-300", {
            "text-green-700": hasLowerCase,
          })}
        />

        <p className="text-xs font-normal leading-4 text-neutral-600">
          One lowercase letter
        </p>
      </div>
      <div className="flex items-center gap-3">
        <CheckIcon
          className={cn("text-neutral-400 transition-colors duration-300", {
            "text-green-700": hasNumber,
          })}
        />
        <p className="text-xs font-normal leading-4 text-neutral-600">
          One number
        </p>
      </div>
      <div className="flex items-center gap-3">
        <CheckIcon
          className={cn("text-neutral-400 transition-colors duration-300", {
            "text-green-700": hasSpecialChar,
          })}
        />

        <p className="text-xs font-normal leading-4 text-neutral-600">
          One special character (e.g., ! @ # $ % ^ & *)
        </p>
      </div>
    </div>
  );
}
