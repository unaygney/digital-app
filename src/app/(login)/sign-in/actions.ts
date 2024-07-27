"use server";

import { db } from "@/db";
import bcrypt from "bcrypt";

export const login = async (data: { email: string; password: string }) => {
  console.log(data);

  let { email, password } = data;

  // Email should be lowercase
  email = email.toLowerCase();

  // Check if user exists
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return {
      errors: "Invalid email or password",
    };
  }

  // Compare if password is correct
  let isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return {
      errors: "Invalid email or password",
    };
  }

  // if user exists and password is correct , set jwt token

  return {
    message: "Logged in successfully",
  };
};
