import { cn } from "@/lib/utils";
import React from "react";

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={cn(
        "mx-auto min-h-screen w-full max-w-[1408px] bg-white shadow-lg",
        className,
      )}
    >
      {children}
    </main>
  );
}
