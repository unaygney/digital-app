"use server";
import { db } from "@/db";
import { getTokenAndVerify } from "@/lib/auth";
import { model } from "@/lib/gemini";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async () => {
  const token = cookies().delete("token");

  redirect("/");
};
export const sendFirstMessage = async (message: string) => {
  const email = await getTokenAndVerify();
  const sessionId = cookies().get("session_id")?.value;
  let prompt = message;

  const result = await model.generateContent(prompt);
  const title = await createChatTitle(message);

  let chat;

  if (email) {
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    chat = await db.chat.create({
      data: {
        userId: user.id,
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
  } else {
    chat = await db.chat.create({
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
  }

  redirect(`/chat/${chat.id}`);
};

export const newChat = async () => {
  const email = await getTokenAndVerify();
  const sessionId = cookies().get("session_id")?.value;

  let chat;

  if (email) {
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    chat = await db.chat.create({
      data: {
        userId: user.id,
      },
    });
  } else {
    chat = await db.chat.create({
      data: {
        sessionId,
      },
    });
  }

  redirect(`/chat/${chat.id}`);
};
export const sendMessage = async (message: string, chatId: string) => {
  const chat = await db.chat.findUnique({
    where: { id: chatId },
    include: { messages: true },
  });

  if (!chat) {
    throw new Error("Chat not found");
  }

  if (!chat.title) {
    const title = await createChatTitle(message);
    await db.chat.update({
      where: { id: chatId },
      data: { title },
    });
  }

  const result = await model.generateContent(message);

  await db.message.createMany({
    data: [
      {
        chatId,
        content: message,
        sender: "USER",
      },
      {
        chatId,
        content: result.response.text(),
        sender: "AI",
      },
    ],
  });

  return { message: "success" };
};
export const createChatTitle = async (title: string) => {
  let prompt = `Your task is to create a concise, descriptive, and engaging chat title based on the given title: "${title}". Please select and provide the best possible title in plain text without any additional formatting.`;

  const result = await model.generateContent(prompt);

  return result.response.text();
};
export const getChats = async (chatId: string) => {
  const chats = await db.chat.findMany({
    where: {
      OR: [{ sessionId: chatId }, { userId: chatId }],
    },
    include: {
      messages: {
        orderBy: {
          timestamp: "asc",
        },
      },
    },
  });

  return chats;
};
