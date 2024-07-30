"use server";

import { db } from "@/db";
import { verifyJwtToken } from "@/lib/auth";
import { cookies } from "next/headers";

export const getTokenAndVerify = async (): Promise<string> => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value ?? "";

  const isValidToken = await verifyJwtToken(token);
  if (!isValidToken || !isValidToken.email) throw new Error("Invalid User");

  return isValidToken.email as string;
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
