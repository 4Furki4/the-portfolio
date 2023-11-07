import Image from "next/image";
import React, { Suspense } from "react";
import { AboutMeParagraph } from "./AboutMeParagraph";
import Education from "./Education";
import GithubContributionTable from "./GithubContributionTable";
import GuestBook from "./GuestBook/GuestBook";
export default function About({ blurredImage }: { blurredImage: string }) {
  return (
    <section
      className="relative z-20 my-4 sm:my-16 mx-auto max-w-6xl p-6 backdrop-blur-xs grid gap-8 break-words hyphens-auto"
      style={{ wordBreak: "break-word" }}
    >
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
      <AboutMeParagraph />
      <Education />
      <Suspense>
        <GithubContributionTable />
        <GuestBook />
      </Suspense>
    </section>
  );
}
