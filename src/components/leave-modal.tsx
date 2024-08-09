"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";

export function LeaveAlertDialog({
  leaveState,
  onConfirm,
  onCancel,
}: {
  leaveState: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <AlertDialog open={leaveState}>
      <AlertDialogContent className="max-w-[320px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to leave?</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved changes. If you leave, your changes will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex">
          <AlertDialogCancel asChild onClick={onCancel}>
            <Button className="flex-1" variant="secondary">
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction className="flex-1" onClick={onConfirm}>
            Leave
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
