import AccountSettings from "@/components/account-settings";
import { db } from "@/db";
import { getTokenAndVerify } from "@/lib/auth";
import React from "react";
import { deleteToken } from "./actions";

export default async function AccountPage() {
  const email = await getTokenAndVerify();

  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) deleteToken();

  return <AccountSettings id={user?.id!} />;
}
