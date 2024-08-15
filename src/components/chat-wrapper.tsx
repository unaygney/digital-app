"use client";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { sendFirstMessage, sendMessage } from "@/app/(dashboard)/actions";
import { $Enums, Message, SenderType } from "@prisma/client";
import ReactMarkdown from "react-markdown";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import removeMarkdown from "remove-markdown";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import { Input } from "./input";
import { AIAvatar, Copy, Check, Sparkling, SendPlane } from "./icons";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { TextEffect } from "./text-effect";

export default function ChatWrapper({
  noSuggestion = false,
  chats: initialChats,
  chatId,
}: {
  noSuggestion?: boolean;
  chats?: Message[];
  chatId?: string;
}) {
  const queryClient = useQueryClient();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const {
    data: chats = [],
    isLoading,
    error,
  } = useQuery(
    ["chats", chatId],
    async () => {
      const response = await fetch(`/api/get-data?chatId=${chatId}`);
      return response.json();
    },
    { enabled: !!chatId },
  );

  const addMessage = (message: Message) => {
    queryClient.setQueryData(
      ["chats", chatId],
      (oldData: Message[] | undefined) => [...(oldData || []), message],
    );
  };

  const [inputValue, setInputValue] = useState("");
  const pathname = usePathname();

  const mutation = useMutation({
    mutationFn: async () => {
      if (pathname === "/") {
        await sendFirstMessage(inputValue);
      } else {
        await sendMessage(inputValue, chatId!);
      }
    },
    onSuccess: () => {
      console.log("basarılı");
      queryClient.invalidateQueries(["chats", chatId]);
    },
    onError: (error) => {
      console.error("Error during message send:", error);
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const userMessage = {
      id: Math.random(),
      chatId: chatId || "",
      sender: SenderType.USER,
      content: inputValue,
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setInputValue("");

    mutation.mutate();
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  return (
    <section className="flex h-full w-full justify-center px-4 md:px-8 lg:flex-1 lg:px-16">
      <div className="flex h-full w-full flex-col gap-16 pb-6 pt-12 lg:max-w-[712px] lg:gap-20 lg:pt-20">
        {/* Chats area */}
        <div className="flex h-full w-full flex-col gap-6 overflow-y-auto">
          {chats?.map((chat: Message) => (
            <MessageItem message={chat} key={chat.id} />
          ))}
          {/* Scroll hedefi */}
          <div ref={bottomRef} />
        </div>

        <div className="mt-auto">
          <form onSubmit={handleSubmit} className="flex w-full gap-4">
            <div className="flex-1">
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className="w-full rounded-lg border border-neutral-200"
              />
            </div>
            <Button
              disabled={mutation.isLoading || !inputValue}
              className="w-[104px]"
            >
              <SendPlane />
              Submit
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

function MessageItem({ message }: { message: Message }) {
  return message.sender === $Enums.SenderType.USER ? (
    <UserMessage message={message} />
  ) : (
    <AIMessage message={message} />
  );
}

function UserMessage({ message }: { message: Message }) {
  return (
    <div className="ml-auto rounded-lg bg-gray-50 p-3">
      <ReactMarkdown>{message.content}</ReactMarkdown>
    </div>
  );
}

function AIMessage({ message }: { message: Message }) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    const plainText = removeMarkdown(message.content);
    navigator.clipboard.writeText(plainText);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 2500);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  return (
    <div className="mr-auto flex max-w-lg flex-col gap-3 rounded-lg border border-neutral-200 bg-white p-3">
      <div className="flex gap-3">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50">
          <AIAvatar />
        </span>
        <div>
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      </div>
      <div className="ml-auto flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="relative inline-flex h-5 w-5 items-center justify-center"
                onClick={handleCopy}
              >
                <AnimatePresence initial={false}>
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      style={{ position: "absolute" }}
                    >
                      <Check className="text-green-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      style={{ position: "absolute" }}
                    >
                      <Copy />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </TooltipTrigger>
            <TooltipContent className="rounded-lg bg-black px-3 py-2 text-white">
              <p>Copy response</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button variant="linkColor" size="medium">
          <Sparkling className="text-indigo-700" />
          Regenerate
        </Button>
      </div>
    </div>
  );
}
