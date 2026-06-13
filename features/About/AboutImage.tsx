import furkanpicture from "@/public/pics/furkan.png";
import Image from "next/image";
import React from "react";

export default function AboutImage() {
  return (
    <figure className="relative h-full min-h-[420px] overflow-hidden rounded-lg border border-white/10 bg-white/[0.035]">
      <Image
        src={furkanpicture}
        alt={"Furkan Cengiz"}
        sizes="(min-width: 1024px) 420px, 100vw"
        quality={100}
        className="h-full w-full object-cover"
        placeholder="blur"
      />
    </figure>
  );
}
