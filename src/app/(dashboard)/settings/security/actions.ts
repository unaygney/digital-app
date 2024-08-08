"use server";

import { db } from "@/db";
import { getTokenAndVerify } from "@/lib/auth";
import bcrypt from "bcrypt";

export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  const email = await getTokenAndVerify();

  const user = await db.user.findUnique({
    where: { email },
    select: { password: true },
  });

  if (!user) return { message: "User not found" };

  const isValid = await bcrypt.compare(data.currentPassword, user.password);

  if (!isValid) return { message: "Current password is incorrect" };

  if (data.newPassword !== data.confirmPassword)
    return { message: "Passwords must match" };

  await db.user.update({
    where: { email },
    data: {
      password: await bcrypt.hash(data.newPassword, 10),
    },
  });

  return { message: "Password updated" };
};
