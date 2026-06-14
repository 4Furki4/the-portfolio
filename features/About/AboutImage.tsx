import furkanpicture from "@/public/pics/furkan.jpeg";
import Image from "next/image";
import React from "react";

export default function AboutImage() {
  return (
    <figure className="relative min-h-[420px] overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] lg:h-[min(68svh,620px)]">
      <Image
        src={furkanpicture}
        alt={"Furkan Cengiz"}
        sizes="(min-width: 1024px) 420px, 100vw"
        quality={100}
        className="object-cover"
        placeholder="blur"
        fill
      />
    </figure>
  );
}
