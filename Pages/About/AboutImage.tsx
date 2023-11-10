import { getBase64 } from "@/lib/getBase64ImageUrl";
import Image from "next/image";
import React from "react";

export default async function AboutImage() {
  const blurredImage = await getBase64("pics/furkan.png");
  return (
    <figure>
      <Image
        src={"/pics/furkan.png"}
        width={3066}
        height={1720}
        alt={"Furkan Cengiz"}
        sizes="(min-width: 768px) 90vw, 75vw"
        quality={100}
        className="rounded-lg"
        placeholder="blur"
        blurDataURL={blurredImage}
      />
    </figure>
  );
}
