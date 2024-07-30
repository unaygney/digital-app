import { getTokenAndVerify } from "@/app/(dashboard)/actions";
import React from "react";
import { db } from "@/db";
import Image from "next/image";
import { cn, toBase64 } from "@/lib/utils";
import { shimmer } from "./icons";
import ImageUploader from "./image-uploader";

export default async function ImageUploaderCard() {
  const userEmail = await getTokenAndVerify();

  const user = await db.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) throw new Error("User not found");

  return (
    <section
      id="image-uploader-card"
      className="relative flex h-[428px] w-full max-w-3xl flex-col rounded-lg border border-neutral-200 bg-white shadow-lg md:h-[420px]"
    >
      <div className="relative h-[128px] w-full overflow-hidden rounded-t-lg md:h-[176px]">
        <Image
          src="/card-bg-image.png"
          alt="card background image"
          fill
          placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
        />
      </div>

      <div className="absolute left-0 right-0 top-[77px] flex w-full flex-col gap-6 px-4 pb-8 text-neutral-900 md:px-8">
        <div className="flex items-end justify-between">
          <div
            className={cn(
              "relative h-[96px] w-[96px] flex-shrink-0 overflow-hidden md:h-[160px] md:w-[160px]",
              {
                "border-[6px] border-white": user.profileImage,
              },
            )}
          >
            <Image
              src={user.profileImage ?? "/placeholder-profile.png"}
              alt="profile image"
              fill
              placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
              className="overflow-hidden rounded-full"
            />
          </div>
          <ImageUploader id={user.id} />
        </div>

        <h2>{user.name}</h2>

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3 text-neutral-900">
            <p>{user.username}</p>
            <p>•</p>
            <p>{user.jobTitle}</p>
            <p>at</p>
            {user.workPlace}
            <p>•</p>
            <p>{user.pronouns}</p>
          </div>
          <div className="flex items-center gap-3">
            <p>🇨🇦</p>
            <p>{`${user.city}, ${user.country}`}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
