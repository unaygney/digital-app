"use client";
import React, { useEffect, useRef, useState, useTransition } from "react";
import {
  reGenerate,
  sendFirstMessage,
  sendMessage,
} from "@/app/(dashboard)/actions";
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
import { Button, buttonVariants } from "./ui/button";
import { Input } from "./input";
import { AIAvatar, Copy, Check, Sparkling, SendPlane, Loading } from "./icons";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { ArrowDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
export default function ChatWrapper({
  noSuggestion = false,
  chatId,
}: {
  noSuggestion?: boolean;
  chatId?: string;
}) {
  const queryClient = useQueryClient();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
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
      createdAt: new Date(),
      updateAt: new Date(),
    };

    addMessage(userMessage);
    setInputValue("");

    mutation.mutate();
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowScrollButton(false);
        } else {
          setShowScrollButton(true);
        }
      },
      { threshold: 1 },
    );

    // Ref değerini bir değişkene atıyoruz
    const currentBottomRef = bottomRef.current;

    if (currentBottomRef) {
      observer.observe(currentBottomRef);
    }

    return () => {
      if (currentBottomRef) {
        observer.unobserve(currentBottomRef);
      }
    };
  }, [bottomRef]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  return (
    <section className="flex h-full w-full justify-center px-4 md:px-8 lg:flex-1 lg:px-16">
      <div className="h-100vh relative flex w-full flex-col gap-16 pb-6 pt-12 lg:max-w-[712px] lg:gap-20 lg:pt-20">
        {/* Chats area */}
        <AnimatePresence>
          <div className="no-scrollbar relative flex h-full w-full flex-col gap-6 overflow-y-auto">
            {/* Loading State */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="m-auto flex w-full max-w-[320px] flex-col items-center gap-5 p-6"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full shadow">
                  <Loader2 className="animate-spin text-indigo-700" />
                </span>
                <div className="flex flex-col items-center text-center">
                  <h6 className="text-xl font-medium leading-7 text-neutral-900">
                    Loading...
                  </h6>
                  <p className="text-base font-normal leading-6 text-neutral-900">
                    Fetching data, it may take a while
                  </p>
                </div>
              </motion.div>
            )}
            {chats?.map((chat: Message) => (
              <MessageItem message={chat} key={chat.id} />
            ))}

            {/* Scroll hedefi */}
            <div ref={bottomRef} />
          </div>
        </AnimatePresence>

        {/* Loading State */}
        <AnimatePresence>
          {mutation.isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex w-full max-w-[504px] items-center gap-3 rounded-lg border border-neutral-200 p-3"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50">
                <AIAvatar />
              </span>
              <Loading />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showScrollButton && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={scrollToBottom}
              className={cn(
                buttonVariants({
                  variant: "secondary",
                  size: "medium",
                }),
                "fixed bottom-20 left-1/2 mx-auto flex -translate-x-1/2 transform items-center gap-2",
              )}
            >
              <ArrowDown className="h-4 w-4 text-neutral-900" />
              Jump to bottom
            </motion.button>
          )}
        </AnimatePresence>

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
  const [loading, setLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const handleCopy = () => {
    const plainText = removeMarkdown(message.content);
    navigator.clipboard.writeText(plainText);
    setCopied(true);
  };

  const handleGenerate = async (messageId: number) => {
    setLoading(true);
    await reGenerate(messageId);
    queryClient.invalidateQueries(["chats", message.chatId]);
    setLoading(false);
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
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="mr-auto flex w-full flex-col gap-3 rounded-lg border border-neutral-200 bg-white p-3 lg:max-w-xl"
    >
      <div className="flex gap-3">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50">
          <AIAvatar />
        </span>
        <div className="no-scrollbar relative w-full overflow-scroll">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");
                const codeContent = String(children).replace(/\n$/, "");

                return !inline && match ? (
                  <div className="relative">
                    <SyntaxHighlighter
                      style={oneLight}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {codeContent}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
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
        <Button
          onClick={() => handleGenerate(message.id)}
          variant="linkColor"
          size="medium"
          disabled={loading}
        >
          <Sparkling
            className={loading ? "text-neutral-400" : "text-indigo-700"}
          />
          Regenerate
        </Button>
      </div>
    </motion.div>
  );
}
