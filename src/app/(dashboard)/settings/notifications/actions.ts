"use server";

import { db } from "@/db";
import { getTokenAndVerify } from "@/lib/auth";
import { NotificationsSettingsFormData } from "@/lib/validations";

type UserPreferences = NotificationsSettingsFormData;

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
