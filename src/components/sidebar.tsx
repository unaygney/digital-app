"use client";
import React, { useState } from "react";
import {
  Logo,
  Close,
  Flashlight,
  Sparkling,
  MoreLine,
  Settings,
  Logout,
  File,
} from "./icons";
import { cn, getInitials } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { Chat, User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getChats, logout, newChat } from "@/app/(dashboard)/actions";
import { usePathname } from "next/navigation";
import { useQuery, useQueryClient } from "react-query";
import { useCustomNavigationGuard } from "@/hooks/use-unsaved-changes";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import path from "path";

export default function SideBar({
  open,
  setOpen,
  className,
  user,
  sessionId,
}: {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  className?: string;
  user?: Partial<User> | null;
  sessionId?: string | null;
}) {
  const queryClient = useQueryClient();
  const {
    data: chats = [],
    isLoading,
    error,
  } = useQuery(["chats", sessionId], async () => await getChats(sessionId!), {
    enabled: !!sessionId,
  });

  const handleLogout = async () => {
    const res = await logout();
  };

  const handleNewChat = async () => {
    await newChat();
    queryClient.invalidateQueries(["chats", sessionId]);
  };

  const pathname = usePathname();
  const activeChatId = pathname.split("/")[2];

  const activeChat = chats?.find((chat: any) => chat.id === activeChatId);
  const pastChats = chats?.filter((chat: any) => chat.id !== activeChatId);

  const [leaveState, setLeaveState] = useState<boolean>(false);

  const shouldShowModal = (chats: Chat[]): boolean => {
    if (chats.length === 0) return false;

    if (chats[0].userId) return false;

    return !!sessionId;
  };

  const { pendingUrl } = useCustomNavigationGuard(
    shouldShowModal(chats),
    setLeaveState,
  );

  const handleConfirmLeave = () => {
    setLeaveState(false);
    window.location.href = pendingUrl as string;
    console.log(pendingUrl);
  };

  const handleCancelLeave = () => {
    setLeaveState(false);
  };

  return (
    <aside className={cn("flex h-full w-full flex-col px-4 py-6", className)}>
      <div
        className={cn("flex items-center justify-between px-3 py-4", {
          "px-0.5": !open,
        })}
      >
        <Link href={"/"} className="flex items-center gap-0.5">
          <Logo />
          <p className="text-base font-bold leading-6 tracking-[-0.96px] text-neutral-900">
            Chat AI
          </p>
        </Link>

        <button className="lg:hidden" onClick={() => setOpen && setOpen(!open)}>
          <Close />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {activeChat && (
          <Link
            key={activeChat.id}
            className="flex gap-2 rounded bg-neutral-50 p-1.5"
            href={`/chat/${activeChat.id}`}
          >
            <Flashlight />
            <p className="truncate text-sm font-medium leading-5 text-indigo-700">
              {activeChat.title ?? "Untitled"}
            </p>
          </Link>
        )}
        {pastChats && pastChats.length > 0 && (
          <>
            <p className="mt-4 text-xs font-medium leading-4 text-neutral-600">
              Past
            </p>
            {pastChats.map((chat: any) => (
              <Link
                key={chat.id}
                className="flex gap-3"
                href={`/chat/${chat.id}`}
              >
                <File />
                <p className="truncate text-sm font-medium leading-5 text-neutral-600">
                  {chat.title ?? "Untitled"}
                </p>
              </Link>
            ))}
          </>
        )}
      </div>

      <div className="mt-auto flex flex-col gap-4">
        <Button
          variant="secondary"
          className="w-full justify-start gap-1 font-medium"
          onClick={handleNewChat}
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
                <DropdownMenuItem asChild>
                  <Link className="flex h-full w-full gap-3" href={"/settings"}>
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

        <LeaveAlertDialog
          leaveState={leaveState}
          onConfirm={handleConfirmLeave}
          onCancel={handleCancelLeave}
          sessionId={sessionId}
        />
      </div>
    </aside>
  );
}

function LeaveAlertDialog({
  leaveState,
  onConfirm,
  onCancel,
  sessionId,
}: {
  leaveState: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  sessionId?: string | undefined | null;
}) {
  return (
    <AlertDialog open={leaveState}>
      <AlertDialogContent className="max-w-[320px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Save your chat history?</AlertDialogTitle>
          <AlertDialogDescription>
            Your chat history will be lost. Sign in or create an account to keep
            your data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-3 lg:!flex-col lg:!space-x-0">
          <div className="flex gap-3">
            <AlertDialogCancel asChild>
              <Button
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "flex-1",
                )}
                onClick={() =>
                  (window.location.href = `/sign-up?redirect=${sessionId}`)
                }
              >
                Create account
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                className={cn(buttonVariants({ variant: "primary" }), "flex-1")}
                onClick={() =>
                  (window.location.href = `/sign-in?redirect=${sessionId}`)
                }
              >
                Sign in
              </Button>
            </AlertDialogAction>
          </div>

          <Button onClick={onConfirm} variant="linkColor" className="w-full">
            Leave anyway
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
