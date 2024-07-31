"use server";

import { db } from "@/db";
import { getTokenAndVerify } from "@/lib/auth";

import { accountSettingsSchema } from "@/lib/validations";

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
export const uploadAccountSettings = async (data: {
  firstName?: string;
  lastName?: string;
  email: string;
  userName: string;
}) => {
  const email = await getTokenAndVerify();

  let isValid = accountSettingsSchema.safeParse(data);
  if (!isValid.success) {
    const errors = isValid.error.flatten().fieldErrors;
    const errorMessage = Object.values(errors).flat().join(", ");
    return { message: errorMessage };
  }

  const { firstName, lastName, userName, email: userEmail } = data;

  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) return { message: "User not found" };

  let formattedUsername = "@" + userName.toLowerCase().replace(/\s/g, "");

  await db.user.update({
    where: { email },
    data: {
      firstName,
      lastName,
      userName: formattedUsername,
      email: userEmail,
    },
  });

  return { message: "Account settings updated" };
};
