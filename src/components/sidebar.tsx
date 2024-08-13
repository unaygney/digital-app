"use client";
import React from "react";
import {
  Logo,
  Close,
  Flashlight,
  Sparkling,
  MoreLine,
  Settings,
  Logout,
} from "./icons";
import { cn, getInitials } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/app/(dashboard)/actions";

export default function SideBar({
  open,
  setOpen,
  className,
  user,
}: {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  className?: string;
  user?: Partial<User> | null;
}) {
  const handleLogout = async () => {
    const res = await logout();

    if (res.message === "success") {
      window.location.reload();
    }
  };
  return (
    <aside className={cn("flex h-full w-full flex-col px-4 py-6", className)}>
      <div
        className={cn("flex items-center justify-between px-3 py-4", {
          "px-0.5": !open,
        })}
      >
        <div className="flex items-center gap-0.5">
          <Logo />
          <h2 className="text-base font-bold leading-6 tracking-[-0.96px] text-neutral-900">
            Chat AI
          </h2>
        </div>

        <button className="lg:hidden" onClick={() => setOpen && setOpen(!open)}>
          <Close />
        </button>
      </div>

      <div className="flex gap-2 rounded bg-neutral-50 p-1.5">
        <Flashlight />
        <p className="text-sm font-medium leading-5 text-indigo-700">
          Ongoing prompt
        </p>
      </div>

      <div>this area will be used for the chat history</div>

      <div className="mt-auto flex flex-col gap-4">
        <Button
          variant="secondary"
          className="w-full justify-start gap-1 font-medium"
        >
          <Sparkling />
          Start new chat
        </Button>

        {!user && (
          <div className="flex flex-col gap-6 rounded-lg border border-neutral-200 p-4">
            <div>
              <h3 className="text-sm font-medium leading-5 text-neutral-900">
                Let&apos;s create an account
              </h3>
              <p className="text-xs font-normal leading-4 text-neutral-600">
                Save your chat history, share chat, and personalize your
                experience.
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <Link
                href={"/sign-in"}
                className={buttonVariants({ variant: "primary" })}
              >
                Sign in
              </Link>
              <Link
                href={"/sign-up"}
                className={buttonVariants({ variant: "linkColor" })}
              >
                Create account
              </Link>
            </div>
          </div>
        )}

        {user && (
          <div className="flex items-center gap-1 px-3.5 py-2.5">
            <Avatar className="h-5 w-5">
              <AvatarImage
                src={
                  user?.profileImage
                    ? user.profileImage
                    : "/placeholder-profile.png"
                }
              />
              <AvatarFallback className="text-xs">
                {getInitials(user?.firstName, user?.lastName)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h6 className="text-sm font-medium leading-5 text-neutral-900">
                {user?.firstName} {user?.lastName}
              </h6>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreLine />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[229px] p-2">
                <DropdownMenuItem>
                  <Link className="flex gap-3" href={"/settings"}>
                    <Settings />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="flex gap-3">
                  <Logout />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </aside>
  );
}
