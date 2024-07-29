"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { CloseEye, Eye } from "@/components/icons";
import { cn } from "@/lib/utils";
import { SignInFormData, signInSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "./actions";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({ resolver: zodResolver(signInSchema) });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordEntered, setPasswordEntered] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const subscription = watch((value) => setPasswordEntered(!!value.password));
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    const res = await login(data);

    if (res && res.errors) {
      toast({
        description: String(res.errors),
      });
    }
    if (res && res.message) {
      toast({
        description: String(res.message),
      });

      setTimeout(() => {
        reset();
        router.push("/");
      }, 2000);
    }
  };

  return (
    <div className="flex-1 items-center justify-center">
      <div className="flex h-full w-full flex-col items-center justify-center gap-6">
        <div className="flex w-full max-w-[456px] flex-col gap-6 xl:max-w-[384px]">
          <h1 className="text-3xl font-semibold leading-9 text-neutral-900">
            Log in to your account
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
                className={cn({
                  "border-red-600 transition-colors duration-200": errors.email,
                })}
              />
              {errors.email && (
                <p className="text-sm font-normal leading-5 text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  {...register("password", { required: true })}
                  type={showPassword ? "text" : "password"}
                  placeholder="**********"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  className={cn({
                    "border-red-600 transition-colors duration-200":
                      errors.password,
                  })}
                />
                {passwordEntered && (
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <CloseEye /> : <Eye />}
                  </button>
                )}
              </div>
              {errors.password && (
                <p className="text-sm font-normal leading-5 text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              size="medium"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="animate-spin" />}
              Submit
            </Button>
          </form>
        </div>

        <Link
          className="text-sm font-medium leading-5 text-neutral-900"
          href={"/sign-up"}
        >
          Don&apos;t have an account?{" "}
          <span className="text-indigo-700">Sign up</span>
        </Link>
      </div>
    </div>
  );
}
