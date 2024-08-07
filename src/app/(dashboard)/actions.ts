"use server";

import { db } from "@/db";
import { getTokenAndVerify } from "@/lib/auth";
import bcrypt from "bcrypt";
import {
  accountSettingsSchema,
  BillingInformationFormData,
  billingInformationSchema,
  NotificationsSettingsFormData,
} from "@/lib/validations";
import { cookies } from "next/headers";

type UserPreferences = NotificationsSettingsFormData;

export const deleteToken = async () => {
  const cookiesStore = cookies();

  cookiesStore.set("token", "", { expires: new Date(0) });
};
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
export const getPreferences =
  async (): Promise<NotificationsSettingsFormData> => {
    const email = await getTokenAndVerify();

    const user = await db.user.findUnique({
      where: { email },
      select: { preferences: true },
    });

    if (!user || !user.preferences) {
      return {
        comments: { email: false, push: false, sms: false },
        features: { email: false, push: false, sms: false },
        friend_requests: { email: false, push: false, sms: false },
        friend_updates: { email: false, push: false, sms: false },
        marketing: { email: false, push: false, sms: false },
      };
    }

    const preferences: UserPreferences = user.preferences as UserPreferences;

    return {
      comments: preferences.comments || {
        email: false,
        push: false,
        sms: false,
      },
      features: preferences.features || {
        email: false,
        push: false,
        sms: false,
      },
      friend_requests: preferences.friend_requests || {
        email: false,
        push: false,
        sms: false,
      },
      friend_updates: preferences.friend_updates || {
        email: false,
        push: false,
        sms: false,
      },
      marketing: preferences.marketing || {
        email: false,
        push: false,
        sms: false,
      },
    };
  };

export const updatePreferences = async (
  data: NotificationsSettingsFormData,
) => {
  const email = await getTokenAndVerify();

  await db.user.update({
    where: { email },
    data: {
      preferences: data,
    },
  });

  return { message: "Preferences updated" };
};
export const createBillingInformation = async (
  data: BillingInformationFormData,
) => {
  const email = await getTokenAndVerify();

  const isValid = billingInformationSchema.safeParse(data);

  if (!isValid.success) {
    const errors = isValid.error.flatten().fieldErrors;
    const errorMessage = Object.values(errors).flat().join(", ");
    return { message: errorMessage };
  }

  const {
    cardNumber,
    cardHolder,
    email: billingEmail,
    cvv,
    address,
    city,
    zip,
    country,
    expiration,
    state,
    address2,
  } = data;

  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) return { message: "User not found" };

  await db.billingInformation.create({
    data: {
      cardNumber,
      cardHolder,
      email: billingEmail,
      cvv,
      address,
      city,
      zip,
      country,
      expiration,
      state,
      address2,
      user: { connect: { id: user.id } },
    },
  });

  return { message: "Billing information updated" };
};
