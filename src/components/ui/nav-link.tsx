"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";
export default function NavLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const pathname = usePathname();

  let isActivePage = pathname === href;

  return (
    <Link
      className={cn(
        buttonVariants({
          variant: isActivePage ? "secondary" : "linkGray",
          size: "medium",
        }),
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
