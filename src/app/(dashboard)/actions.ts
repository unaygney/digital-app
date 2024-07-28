"use server";

import { db } from "@/db";

export const getUserImages = async (email: string) => {
  const userWithImages = await db.user.findUnique({
    where: { email },
    select: { images: true },
  });

  if (!userWithImages) [];

  return userWithImages?.images;
};
