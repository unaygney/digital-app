"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/button";
import Link from "next/link";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { CheckIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface Inputs {
  email: string;
  password: string;
  terms: boolean;
}

interface PasswordChecks {
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasMinLength: boolean;
  hasSpecialChar: boolean;
}

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const [passwordChecks, setPasswordChecks] = useState<PasswordChecks>({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasMinLength: false,
    hasSpecialChar: false,
  });

  const onPasswordChange = (password: string) => {
    setPasswordChecks({
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasMinLength: password.length >= 8 && password.length <= 64,
      hasSpecialChar: /[!@#$%^&*]/.test(password),
    });
  };

  const password = watch("password");

  useEffect(() => {
    onPasswordChange(password || "");
  }, [password]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await new Promise((res) =>
      setTimeout(() => {
        res(data);
      }, 2000),
    );
    console.log(response);
  };

  return (
    <div className="flex-1 items-center justify-center">
      <div className="flex h-full w-full flex-col items-center justify-center gap-6">
        <div className="flex w-full max-w-[456px] flex-col gap-6 xl:max-w-[384px]">
          <h1 className="text-3xl font-semibold leading-9 text-neutral-900">
            Create your account
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email", { required: true })}
                type="email"
                placeholder="john@example.com"
                name="email"
                id="email"
                autoComplete="email"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                {...register("password", { required: true })}
                type="password"
                placeholder="**********"
                name="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) => onPasswordChange(e.target.value)}
              />
            </div>
            <PasswordControl passwordChecks={passwordChecks} />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="h-4 w-4"
                id="terms"
                {...register("terms", { required: true })}
              />
              <Label
                className="cursor-pointer text-sm font-normal leading-6 text-neutral-600"
                htmlFor="terms"
              >
                I agree with CodePulse{" "}
                <span className="text-indigo-700">Terms of Service</span>
              </Label>
            </div>
            <Button
              type="submit"
              size="medium"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="animate-spin" />}
              Create account
            </Button>
          </form>
        </div>

        <Link
          className="text-sm font-medium leading-5 text-neutral-900"
          href={"/login"}
        >
          Already have an account?{" "}
          <span className="text-indigo-700">Sign in</span>
        </Link>
      </div>
    </div>
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
