"use client";
import React, { useState } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";
import { Cloud } from "./icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ImageUploader() {
  const { toast } = useToast();
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const router = useRouter();

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;

    setIsDragOver(false);

    toast({
      title: `${file.file.type} type is not supported.`,
      description: "Please choose a PNG, JPG, or JPEG image instead.",
      variant: "destructive",
    });
  };

  const onDropAccepted = (acceptedFiles: File[]) => {
    console.log("accepted files");
  };

  return (
    <Dialog>
      <DialogTrigger className="rounded px-4 py-2.5 shadow transition-colors duration-300 hover:bg-neutral-50">
        Update picture
      </DialogTrigger>
      <DialogContent className="flex h-[344px] w-full max-w-xl flex-col gap-8 rounded-lg px-6 py-8">
        <DialogHeader className="flex flex-col items-start justify-start">
          <DialogTitle className="text-xl font-medium leading-7 text-neutral-900">{`Upload image(s)`}</DialogTitle>
          <DialogDescription>You may upload up to 5 images</DialogDescription>
        </DialogHeader>
        <div
          className={cn(
            "relative flex h-full w-full rounded bg-neutral-50 p-2 ring-1 ring-inset ring-neutral-200",
            {
              "ring-indigo-600": isDragOver,
            },
          )}
        >
          <Dropzone
            onDropRejected={onDropRejected}
            onDropAccepted={onDropAccepted}
            accept={{
              "image/png": [".png"],
              "image/jpeg": [".jpeg"],
              "image/jpg": [".jpg"],
            }}
            onDragEnter={() => setIsDragOver(true)}
            onDragLeave={() => setIsDragOver(false)}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                className="flex h-full w-full flex-1 flex-col items-center justify-center"
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-5 py-6">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow">
                    <Cloud />
                  </span>
                  <div className="flex flex-col items-center gap-1 text-center">
                    <h6 className="text-lg font-medium leading-7 text-neutral-900">
                      Click or drag and drop to upload
                    </h6>
                    <p className="text-sm font-normal leading-5 text-neutral-600">{`PNG, or JPG(Max 5 MB)`}</p>
                  </div>
                </div>
              </div>
            )}
          </Dropzone>
        </div>
      </DialogContent>
    </Dialog>
  );
}
