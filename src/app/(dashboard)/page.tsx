import ChatWrapper from "@/components/chat-wrapper";
import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import { db } from "@/db";
import { getTokenAndVerify } from "@/lib/auth";
import { User } from "@prisma/client";
import { cookies } from "next/headers";

export default async function Home() {
  const email = await getTokenAndVerify();
  const sessionId = cookies().get("session_id")?.value ?? null;
  let user: Partial<User> | null = null;

  if (email) {
    user = await db.user.findUnique({
      omit: {
        password: true,
      },
      where: {
        email,
      },
    });
  }

  const sideBarId = user?.id || sessionId;

  return (
    <div className="flex h-full w-full flex-col lg:flex-row">
      <Navbar user={user} sideBardId={sideBarId} />

      <SideBar
        user={user}
        className="hidden w-full max-w-[240px] border-r border-neutral-200 lg:flex"
        sessionId={sideBarId}
      />

      <ChatWrapper />
    </div>
  );
}
