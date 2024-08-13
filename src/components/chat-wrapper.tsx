"use client";
import React from "react";
import { Chat, Mail, Pen, SendPlane, Timeline } from "./icons";
import { Button } from "./ui/button";
import { Input } from "./input";

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
  return (
    <section className="flex h-full w-full justify-center px-4 md:px-8 lg:flex-1 lg:px-16">
      <div className="flex h-full w-full flex-col gap-16 pb-6 pt-12 lg:max-w-[712px] lg:gap-20 lg:pt-20">
        <h1 className="text-2xl font-medium leading-8 text-neutral-600 sm:max-w-[30ch] md:max-w-[40ch] md:text-3xl">
          <span className="font-semibold text-neutral-900">
            Hey, I’m Chat AI.
          </span>{" "}
          Your AI assistant and companion for any occasion.
        </h1>

        <div className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-4 lg:gap-4">
          {SUGGESTION.map((suggestion) => (
            <button
              className="flex w-full flex-col gap-6 rounded-lg border border-neutral-200 bg-white p-4 text-start transition-colors duration-300 hover:bg-slate-100"
              key={suggestion.id}
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
            </button>
          ))}
        </div>

        <div className="mt-auto">
          <ChatInput />
        </div>
      </div>
    </section>
  );
}

function ChatInput() {
  return (
    <div className="flex w-full gap-4">
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Ask me anything..."
          className="w-full rounded-lg border border-neutral-200"
        />
      </div>
      <Button disabled className="w-[104px]">
        <SendPlane />
        Submit
      </Button>
    </div>
  );
}
