import React from "react";
import Image from "next/image";
import { toBase64 } from "@/lib/utils";
import { shimmer } from "@/components/icons";
export default function ImageContainer() {
  return (
    <div className="relative hidden w-full flex-1 overflow-hidden rounded xl:block">
      <Image
        src="/sign-in-image.png"
        fill
        alt="create your image"
        className="object-cover"
        placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
      />
    </div>
  );
}
