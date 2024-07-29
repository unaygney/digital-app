"use client";
import React, { useState } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
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
  DialogClose,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useUploadThing } from "@/lib/uploadthing";
import {
  deletePhoto,
  getUserImages,
  makeProfileImage,
} from "@/app/(dashboard)/actions";
import { useQuery, useQueryClient } from "react-query";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

export default function ImageUploader() {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isInnerDialogOpen, setIsInnerDialogOpen] = useState<boolean>(false);
  const [uploadingImages, setUploadingImages] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const { toast } = useToast();

  const queryClient = useQueryClient();

  const email = "test@hotmail.com";
  const { data: imagesData } = useQuery(["images", email], () =>
    getUserImages(email),
  );

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (uploadedFiles) => {
      setIsInnerDialogOpen(true);
      queryClient.invalidateQueries(["images", email]);
      setUploadingImages((prev) =>
        prev.filter(
          (image) => !uploadedFiles.some((file) => file.name === image.id),
        ),
      );
    },
    onUploadProgress: (p) => {
      setUploadProgress(p);
    },
  });

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;
    setIsDragOver(false);
  };

  const onDropAccepted = (acceptedFiles: File[]) => {
    const newUploadingImages = acceptedFiles.map((file) => ({
      id: file.name,
      url: URL.createObjectURL(file),
      progress: 0,
    }));
    setUploadingImages((prev) => [...prev, ...newUploadingImages]);

    if (imagesData && imagesData.length + newUploadingImages.length > 5) return;

    startUpload(acceptedFiles, {
      userId: "ab366c53-581f-45b8-9fda-229cf4b0539b",
    });
    setIsDragOver(false);
  };

  const handleRadioChange = (id: number) => {
    setSelectedImage(id);
    console.log(id);
  };

  const handleUploadProfileImage = async (id: number) => {
    const selectedImage = imagesData?.find((image, i) => image.id === id);
    if (!selectedImage) return;
    const response = await makeProfileImage(email, selectedImage.originalUrl);

    console.log(response);

    toast({
      title: "Update",
      description: response.message,
    });
  };

  const handleDeleteImage = async (email: string, url: string) => {
    const response = await deletePhoto(email, url);
    console.log(response);
    if (response.message === "Photo deleted") {
      queryClient.invalidateQueries(["images", email]);
    }

    toast({
      description: response.message,
    });
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
              disabled={imagesData && imagesData.length >= 5}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  className="flex h-full w-full flex-1 flex-col items-center justify-center"
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  {imagesData && imagesData.length >= 5 ? (
                    <div className="flex flex-col items-center py-4">
                      <h6 className="text-base font-semibold leading-6 text-red-600">
                        You&apos;ve reached the image limit
                      </h6>
                      <p className="text-xs font-normal text-neutral-600">
                        You can only upload up to 5 images.
                      </p>
                    </div>
                  ) : (
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
                  )}
                </div>
              )}
            </Dropzone>
          </div>
          <div className="flex max-h-[252px] w-full flex-col gap-4 overflow-scroll">
            {imagesData && imagesData.length > 0 && (
              <>
                <div className="flex flex-col gap-4 bg-white">
                  {imagesData.map((image, index) => (
                    <label
                      htmlFor={`selectedImage-${index}`}
                      key={index}
                      className="relative flex gap-4"
                    >
                      <input
                        type="radio"
                        name={`selectedImage-${index}`}
                        id={`selectedImage-${index}`}
                        value={image.id}
                        checked={selectedImage === image.id}
                        onChange={() => handleRadioChange(image.id)}
                        className="absolute right-0 top-0 h-6 w-6 accent-indigo-600"
                      />
                      <div className="relative h-20 w-20 overflow-hidden rounded-md">
                        <Image
                          src={image.originalUrl}
                          alt={`Uploaded ${index}`}
                          fill
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="h-full w-full">
                          <h6 className="text-base font-semibold leading-6 text-neutral-900">
                            {image.name}
                          </h6>
                          <p className="text-xs font-normal leading-4 text-neutral-600">
                            {(image.size! / 1024).toFixed(2)} kb
                          </p>
                        </div>
                        <div className="mt-auto flex items-center gap-1.5">
                          <button className="flex items-center gap-1.5">
                            <Crop />
                            <p className="text-sm">Crop image</p>
                          </button>
                          <span>•</span>
                          <button
                            onClick={() =>
                              handleDeleteImage(email, image.originalUrl)
                            }
                            className="mt-auto flex items-center gap-1.5"
                          >
                            <Delete />
                            <p>Delete</p>
                          </button>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </>
            )}
            {uploadingImages.length > 0 && (
              <div className="flex flex-col gap-4 bg-white">
                {uploadingImages.map((image, index) => (
                  <div key={index} className="relative flex gap-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-md">
                      <Image src={image.url} alt={`Uploading ${index}`} fill />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="h-full w-full">
                        <h6 className="text-base font-semibold leading-6 text-neutral-900">
                          {image.id}
                        </h6>
                      </div>
                      <div className="mt-4 flex w-full items-center">
                        <Progress
                          className="h-[6px] flex-1 text-indigo-700"
                          value={uploadProgress}
                        />
                        <p className="mt-2 text-sm font-medium leading-5 text-neutral-600">
                          {uploadProgress}%
                        </p>
                      </div>
                    </div>
                    <button className="absolute right-0 top-0">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {imagesData && imagesData.length > 0 && (
            <div className="flex h-11 w-full gap-4">
              <DialogClose asChild>
                <Button className="flex-1" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                className="flex-1"
                variant="primary"
                disabled={selectedImage === null}
                onClick={() => handleUploadProfileImage(selectedImage!)}
              >
                Select Image
              </Button>
            </div>
          )}
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
              <Button
                className="rounded bg-indigo-600 px-4 py-2 text-white"
                onClick={() => setIsInnerDialogOpen(false)}
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </Dialog>
    </div>
  );
}
