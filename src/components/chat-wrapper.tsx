"use client";
import React, { useState, useTransition } from "react";
import { Chat, Mail, Pen, SendPlane, Timeline } from "./icons";
import { Button } from "./ui/button";
import { Input } from "./input";
import { motion } from "framer-motion";
import { sendMessage } from "@/app/(dashboard)/actions";

const SUGGESTION = [
  {
    id: 0,
    title: "Draft email",
    description: "Generate email for any occasion you need.",
    icon: <Mail />,
    background: "#EEF2FF",
  },
  {
    id: 1,
    title: "Write an Essay",
    description: "Generate essay for any occasion you need..",
    icon: <Pen />,
    background: "#F0FDF4",
  },
  {
    id: 2,
    title: "Planning",
    description: "Plan for any occasion, from holiday to family.",
    icon: <Timeline />,
    background: "#FDF4FF",
  },
  {
    id: 3,
    title: "Assistant",
    description: "Become your personal assistant. Helping you.",
    icon: <Chat />,
    background: "#FFFBEB",
  },
] as const;

export default function ChatWrapper() {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section className="flex h-full w-full justify-center px-4 md:px-8 lg:flex-1 lg:px-16">
      <div className="flex h-full w-full flex-col gap-16 pb-6 pt-12 lg:max-w-[712px] lg:gap-20 lg:pt-20">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-medium leading-8 text-neutral-600 sm:max-w-[30ch] md:max-w-[40ch] md:text-3xl"
        >
          <span className="font-semibold text-neutral-900">
            Hey, I’m Chat AI.
          </span>
          Your AI assistant and companion for any occasion.
        </motion.h1>

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-4 lg:gap-4"
        >
          {SUGGESTION.map((suggestion) => (
            <motion.button
              className="flex w-full flex-col gap-6 rounded-lg border border-neutral-200 bg-white p-4 text-start transition-colors duration-300 hover:bg-slate-100"
              key={suggestion.id}
              variants={item}
            >
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ backgroundColor: suggestion.background }}
              >
                {suggestion.icon}
              </span>
              <div className="flex flex-col gap-2">
                <h2 className="text-sm font-semibold leading-5 text-neutral-900">
                  {suggestion.title}
                </h2>
                <p className="text-xs font-normal leading-4 text-neutral-600">
                  {suggestion.description}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        <div className="mt-auto">
          <ChatInput />
        </div>
      </div>
    </section>
  );
}

function ChatInput() {
  const [inputValue, setInputValue] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    startTransition(async () => {
      try {
        await sendMessage(inputValue);
        setInputValue("");
      } catch (error) {
        console.error("Error:", error);
      }
    });
  };

  return (
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
        type="submit"
        disabled={isPending || !inputValue}
        className="w-[104px]"
      >
        <SendPlane />
        Submit
      </Button>
    </form>
  );
}
