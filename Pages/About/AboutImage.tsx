import furkanpicture from "@/public/pics/furkan.png";
import Image from "next/image";
import React from "react";

export default function AboutImage() {
  return (
    <figure>
      <Image
        src={furkanpicture}
        width={3066}
        height={1720}
        alt={"Furkan Cengiz"}
        sizes="(min-width: 768px) 90vw, 75vw"
        quality={100}
        className="rounded-lg"
        placeholder="blur"
      />
    </figure>
  );
}
