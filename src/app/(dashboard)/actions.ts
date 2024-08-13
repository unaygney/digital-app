"use server";

import { cookies } from "next/headers";

export const logout = async () => {
  const token = cookies().delete("token");

  return { message: "success" };
};
