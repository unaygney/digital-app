"use server";

import { db } from "@/db";
import { getJwtSecretKey } from "@/lib/auth";
import bcrypt from "bcrypt";
import { signInSchema } from "@/lib/validations";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const login = async (data: { email: string; password: string }) => {
  try {
    const cookieStore = cookies();

    let { email, password } = data;

    let isValid = signInSchema.safeParse(data);
    // Check if data is valid
    if (!isValid.success) {
      return {
        errors: isValid.error.flatten().fieldErrors,
      };
    }

    // Email should be lowercase
    email = email.toLowerCase();

    // Check if user exists
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    // if user does not exist, return error
    if (!user) {
      return {
        errors: "Invalid email or password",
      };
    }

    // Compare if password is correct
    let isValidPassword = await bcrypt.compare(password, user.password);
    // if password is incorrect, return error
    if (!isValidPassword) {
      return {
        errors: "Invalid email or password",
      };
    }

    // if user exists and password is correct , set jwt token
    const token = await new SignJWT({ email: email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(getJwtSecretKey());

    // set cookie
    cookieStore.set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 2,
    });
    // return success message
    return {
      message: "Logged in successfully",
    };
  } catch (e) {
    console.log(e);
  }
  redirect("/");
};
