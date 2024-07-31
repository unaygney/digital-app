"use server";

import { db } from "@/db";
import { getTokenAndVerify } from "@/lib/auth";

export const getUser = async () => {
  const email = await getTokenAndVerify();

  const user = await db.user.findUnique({
    where: { email },
    select: {
      email: true,
      firstName: true,
      lastName: true,
      profileImage: true,
    },
  });

  if (!user) return { message: "User not found" };

  return user;
};
export const getUserImages = async () => {
  const email = await getTokenAndVerify();

  const userWithImages = await db.user.findUnique({
    where: { email },
    select: { images: true },
  });

  if (!userWithImages) return [];

  return userWithImages.images;
};
export const makeProfileImage = async (url: string) => {
  const email = await getTokenAndVerify();

  const user = await db.user.findUnique({
    where: { email },
    select: { images: true, profileImage: true },
  });

  if (!user) return { message: "User not found" };
  if (user.profileImage === url)
    return { message: "Profile image already set" };

  await db.user.update({
    where: { email },
    data: {
      profileImage: url,
    },
  });

  return { message: "Profile image updated" };
};
export const deletePhoto = async (url: string) => {
  const email = await getTokenAndVerify();

  const user = await db.user.findUnique({
    where: { email },
    select: { images: true },
  });

  if (!user) return { message: "User not found" };

  await db.image.delete({
    where: {
      originalUrl: url,
    },
  });

  return { message: "Photo deleted" };
};
export const handleCroppedImage = async (
  data: {
    width: number;
    height: number;
    x: number;
    y: number;
  },
  url: string,
) => {
  const email = await getTokenAndVerify();

  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) return { message: "User not found" };

  await db.image.update({
    where: { originalUrl: url },
    data: {
      cropHeight: data.height,
      cropWidth: data.width,
      cropX: data.x,
      cropY: data.y,
    },
  });

  return { message: "Cropped image updated" };
};
