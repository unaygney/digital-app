"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function NoBillingModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const handleClick = () => {
    setOpen(false);
    router.push("/settings/billing");
  };
  return (
    <Dialog open={open}>
      <DialogContent className="max-w-[320px]">
        <DialogHeader>
          <DialogTitle>Oops, no billing information found</DialogTitle>
          <DialogDescription>
            Please add your billing details to begin upgrading your plan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button onClick={handleClick} className="w-full">
            Add billing information
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
