import Image from "next/image";
import waitingSpongebob from "@/public/gifs/waiting-spongebob.gif";
import React from "react";

export default function EntryNotFound() {
  return (
    <>
      <p className="text-center text-fs-300 italic">
        There are no messages yet.
      </p>
      <Image
        className="w-full h-auto object-cover rounded-sm"
        src={waitingSpongebob}
        alt="waiting spongebob"
        sizes="(min-width: 768px) 90vw, 75vw"
        quality={100}
      />
    </>
  );
}
