"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { cookies } from "next/headers";

export const logout = async () => {
  const token = cookies().delete("token");

  return { message: "success" };
};
export const sendMessage = async (message: string) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  let promt = message;

  const result = await model.generateContent(promt);

  console.log(result.response.text());
};
