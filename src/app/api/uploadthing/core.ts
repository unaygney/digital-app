import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import sharp from "sharp";
import { db } from "@/db";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .input(z.object({ userId: z.string().uuid() }))
    .middleware(async ({ input }) => {
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { userId } = metadata.input;

      // Dosyanın metadata bilgisini alıyoruz
      const res = await fetch(file.url);
      const buffer = await res.arrayBuffer();
      const imgMetadata = await sharp(Buffer.from(buffer)).metadata();
      const { width, height } = imgMetadata;

      await db.image.create({
        data: {
          originalUrl: file.url,
          userId,
          width: width || 0,
          height: height || 0,
        },
      });
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
