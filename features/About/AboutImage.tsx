import Image from "next/image";
import React from "react";

export default function AboutImage({ alt, src }: { alt: string; src: string }) {
  return (
    <figure className="relative min-h-[420px] overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] lg:h-[min(68svh,620px)]">
      <Image
        src={src}
        alt={alt}
        sizes="(min-width: 1024px) 420px, 100vw"
        quality={100}
        className="object-cover"
        fill
        unoptimized
      />
    </figure>
  );
}
