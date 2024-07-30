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
    include: { images: true },
  });

  if (!user) throw new Error("User not found");

  const profileImage = user.images.find(
    (img) => img.originalUrl === user.profileImage,
  );

  return (
    <section
      id="image-uploader-card"
      className="relative flex h-[428px] w-full max-w-3xl flex-col rounded-lg border border-neutral-200 bg-white shadow-lg md:h-[420px]"
    >
      <div className="relative h-[128px] w-full overflow-hidden rounded-t-lg md:h-[176px]">
        <Image
          src="/card-bg-image.png"
          alt="card background image"
          layout="fill"
          objectFit="cover"
          placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
        />
      </div>

      <div className="absolute left-0 right-0 top-[77px] flex w-full flex-col gap-6 px-4 pb-8 text-neutral-900 md:px-8">
        <div className="flex items-end justify-between">
          <div
            className={cn(
              "relative h-[96px] w-[96px] flex-shrink-0 overflow-hidden rounded-full border-4 border-white md:h-[160px] md:w-[160px]",
            )}
          >
            {profileImage ? (
              <div className="relative h-full w-full overflow-hidden rounded-full">
                <Image
                  src={profileImage.originalUrl}
                  alt="profile image"
                  layout="fill"
                  objectFit="cover"
                  objectPosition={`-${profileImage.cropX}px -${profileImage.cropY}px`}
                />
              </div>
            ) : (
              <Image
                src="/placeholder-profile.png"
                alt="profile image"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
                placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
              />
            )}
          </div>
          <ImageUploader id={user.id} />
        </div>

        <h2 className="text-2xl font-semibold leading-8 text-neutral-900 md:text-3xl">
          {user.name}
        </h2>

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3 text-neutral-900">
            {user.username && (
              <p className="text-xl font-normal leading-7 text-neutral-900">
                {user.username}
              </p>
            )}
            <p className="text-xl font-normal leading-7 text-neutral-600">•</p>
            <p className="text-xl font-normal leading-7 text-neutral-900">
              {user?.jobTitle}
            </p>
            <p className="-ml-1 text-xl font-normal leading-7 text-neutral-600">
              at
            </p>
            <p className="inline-flex items-center gap-1.5 text-xl font-normal leading-7 text-neutral-900">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="15"
                  viewBox="0 0 25 15"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24.5 0L16.8419 14.971H9.64869L12.8538 8.76647H12.7098C10.0659 12.1985 6.12083 14.458 0.5 14.971V8.8523C0.5 8.8523 4.09578 8.63981 6.20975 6.41738H0.5V0.000328125H6.91705V5.27817L7.061 5.27756L9.68328 0.000328125H14.5365V5.24484L14.6804 5.24456L17.4011 0H24.5Z"
                    fill="#4338CA"
                  />
                </svg>
              </span>
              {user?.workPlace ?? "unknown"}
            </p>

            <p className="text-neutral-400">•</p>
            <p className="text-xl font-normal leading-7 text-neutral-600">
              {user?.pronouns}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p>🇨🇦</p>
            <p className="text-lg font-normal leading-6 text-neutral-600">{`${user?.city}, ${user?.country}`}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
