import ChatWrapper from "@/components/chat-wrapper";
import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import { db } from "@/db";
import { getTokenAndVerify } from "@/lib/auth";
import React from "react";

export default async function ChatPage({ params }: { params: { id: string } }) {
  const email = await getTokenAndVerify();
  const { id } = params;

  const user =
    (await db.user.findUnique({
      where: {
        email,
      },
    })) ?? null;

  const chats = await db.chat.findUnique({
    where: {
      id,
    },
    include: {
      messages: {
        orderBy: {
          timestamp: "asc",
        },
      },
    },
  });

  return (
    <div className="flex h-full w-full flex-col lg:flex-row">
      <Navbar user={user} />

      <SideBar
        user={user}
        className="hidden w-full max-w-[240px] border-r border-neutral-200 lg:flex"
      />

      <ChatWrapper noSuggestion={true} chats={chats?.messages} />
    </div>
  );
}
