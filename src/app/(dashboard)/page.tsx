import ChatWrapper from "@/components/chat-wrapper";
import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import { db } from "@/db";
import { getTokenAndVerify } from "@/lib/auth";
import { User } from "@prisma/client";
import { cookies } from "next/headers";

export default async function Home() {
  const email = await getTokenAndVerify();
  const sessionId = cookies().get("session_id")?.value;
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

  return (
    <div className="flex h-full w-full flex-col lg:flex-row">
      <Navbar user={user} />

      <SideBar
        user={user}
        className="hidden w-full max-w-[240px] border-r border-neutral-200 lg:flex"
        sessionId={sessionId}
      />

      <ChatWrapper />
    </div>
  );
}
