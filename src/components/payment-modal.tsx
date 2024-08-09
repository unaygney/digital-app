"use client";

import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

export function PaymentModal({ open }: { open: boolean }) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="flex max-w-[320px] flex-col items-center justify-center gap-5">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow">
          <Loader2 className="animate-spin text-indigo-700" size={24} />
        </span>
        <h4 className="text-center text-xl font-medium leading-7 text-neutral-900">
          Payment is processing
        </h4>
      </AlertDialogContent>
    </AlertDialog>
  );
}
