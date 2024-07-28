"use client";
import React, { useState } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";
import { Cloud, Crop, Delete } from "./icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useUploadThing } from "@/lib/uploadthing";

export default function ImageUploader() {
  const { toast } = useToast();
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [images, setImages] = useState<
    { url: string; name: string; size: number }[]
  >([]);
  const [isInnerDialogOpen, setIsInnerDialogOpen] = useState<boolean>(false);
  const router = useRouter();

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (uploadedFiles) => {
      const newImages = uploadedFiles.map((file) => ({
        url: file.url,
        name: file.name,
        size: file.size,
      }));
      setIsInnerDialogOpen(true);
    },
    onUploadProgress: (p) => {
      setUploadProgress(p);
    },
  });

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;

    setIsDragOver(false);

    // toast({
    //   title: ${file.file.type} type is not supported.,
    //   description: "Please choose a PNG, JPG, or JPEG image instead.",
    //   variant: "destructive",
    // });
  };

  const onDropAccepted = (acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
    startUpload(acceptedFiles, {
      userId: "ab366c53-581f-45b8-9fda-229cf4b0539b",
    });
    setIsDragOver(false);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger className="rounded px-4 py-2.5 shadow transition-colors duration-300 hover:bg-neutral-50">
          Update picture
        </DialogTrigger>
        <DialogContent className="flex w-full max-w-xl flex-col gap-8 overflow-auto rounded-lg bg-white px-6 py-8">
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
          {isUploading && (
            <div className="flex flex-col gap-4 overflow-scroll bg-white">
              {images.length > 0 &&
                images.map((image, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-md">
                      <Image src={image.url} alt={`Uploaded ${index}`} fill />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="h-full w-full">
                        <h6 className="text-base font-semibold leading-6 text-neutral-900">
                          {image.name}
                        </h6>
                        <p className="text-xs font-normal leading-4 text-neutral-600">
                          {(image.size / 1024).toFixed(2)} kb
                        </p>
                      </div>
                      <div className="mt-auto flex items-center gap-1.5">
                        <div className="mt-4 w-full">
                          <Progress
                            className="h-[6px] text-indigo-700"
                            value={uploadProgress}
                          />
                          <p className="mt-2 text-sm font-medium leading-5 text-neutral-600">
                            Uploading: {uploadProgress}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
          <div className="flex flex-col gap-4 overflow-scroll bg-white">
            {images.length > 0 &&
              images.map((image, index) => (
                <div key={index} className="flex gap-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-md">
                    <Image src={image.url} alt={`Uploaded ${index}`} fill />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="h-full w-full">
                      <h6 className="text-base font-semibold leading-6 text-neutral-900">
                        {image.name}
                      </h6>
                      <p className="text-xs font-normal leading-4 text-neutral-600">
                        {(image.size / 1024).toFixed(2)} kb
                      </p>
                    </div>
                    <div className="mt-auto flex items-center gap-1.5">
                      <button className="flex items-center gap-1.5">
                        <Crop />
                        <p className="text-sm">Crop image</p>
                      </button>
                      <span>•</span>
                      <button className="mt-auto flex items-center gap-1.5">
                        <Delete />
                        <p>Delete</p>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </DialogContent>

        <Dialog open={isInnerDialogOpen} onOpenChange={setIsInnerDialogOpen}>
          <DialogContent className="flex h-[200px] w-full max-w-md flex-col gap-8 rounded-lg px-6 py-8">
            <DialogHeader className="flex flex-col items-start justify-start">
              <DialogTitle className="text-xl font-medium leading-7 text-neutral-900">
                Image Upload Successful
              </DialogTitle>
              <DialogDescription>
                Your image has been uploaded successfully.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-center">
              <button
                className="rounded bg-indigo-600 px-4 py-2 text-white"
                onClick={() => setIsInnerDialogOpen(false)}
              >
                Close
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </Dialog>
    </div>
  );
}
