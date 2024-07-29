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
export const makeProfileImage = async (email: string, url: string) => {
  const user = await db.user.findUnique({
    where: { email },
    select: { images: true, profileImage: true },
  });

  if (user?.profileImage === url)
    return { message: "Profile image already set" };

  if (!user) return { message: "User not found" };

  await db.user.update({
    where: { email },
    data: {
      profileImage: url,
    },
  });

  return { message: "Profile image updated" };
};
export const deletePhoto = async (email: string, url: string) => {
  console.log("deletePhoto", email, url);
  const user = await db.user.findUnique({
    where: { email },
    select: { images: true },
  });

  if (!user) return { message: "User not found" };

  const deleteImage = await db.image.delete({
    where: {
      originalUrl: url,
    },
  });

  return { message: "Photo deleted" };
};
