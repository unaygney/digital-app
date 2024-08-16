import ChatWrapper from "@/components/chat-wrapper";
import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import { db } from "@/db";
import { getTokenAndVerify } from "@/lib/auth";
import { User } from "@prisma/client";
import { cookies } from "next/headers";
import React from "react";

export default async function ChatPage({ params }: { params: { id: string } }) {
  const email = await getTokenAndVerify();
  const sessionId = cookies().get("session_id")?.value ?? null;
  const { id } = params;

  let user: Partial<User> | null = null;

  if (email) {
    user =
      (await db.user.findUnique({
        where: {
          email,
        },
      })) ?? null;
  }

  const sideBarId = user?.id || sessionId;

  return (
    <div className="flex h-full w-full flex-col lg:flex-row">
      <Navbar user={user} />

      <SideBar
        user={user}
        className="hidden w-full max-w-[240px] border-r border-neutral-200 lg:flex"
        sessionId={sideBarId}
      />

      <ChatWrapper noSuggestion={true} chatId={id} />
    </div>
  );
}
