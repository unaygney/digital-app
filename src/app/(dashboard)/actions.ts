"use server";
import { db } from "@/db";
import { model } from "@/lib/gemini";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async () => {
  const token = cookies().delete("token");

  return { message: "success" };
};
export const sendFirstMessage = async (message: string) => {
  const sessionId = cookies().get("session_id")?.value;
  let promt = message;

  const result = await model.generateContent(promt);
  const title = await createChatTitle(message);

  //todo: if user already exist then you have to create the chat with the user
  // we assume that the user is not right now.

  const chat = await db.chat.create({
    data: {
      sessionId,
      title,
      messages: {
        createMany: {
          data: [
            {
              content: message,
              sender: "USER",
            },
            {
              content: result.response.text(),
              sender: "AI",
            },
          ],
        },
      },
    },
  });

  redirect(`/chat/${chat.id}`);
};
export const newChat = async () => {
  const sessionId = cookies().get("session_id")?.value;

  const chat = await db.chat.create({
    data: {
      sessionId,
    },
  });

  redirect(`/chat/${chat.id}`);
};

/* 
This function is used to create a chat title
*/
export const createChatTitle = async (title: string) => {
  let prompt = `Your task is to create a concise, descriptive, and engaging chat title based on the given title: "${title}". Please select and provide the best possible title in plain text without any additional formatting.`;

  const result = await model.generateContent(prompt);

  return result.response.text();
};
