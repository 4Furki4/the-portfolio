import Image from "next/image";
import React, { Suspense } from "react";
import { AboutMeParagraph } from "./AboutMeParagraph";
import Education from "./Education";
import GithubContributionTable from "./GithubContributionTable";
import GuestBook from "./GuestBook/GuestBook";
import AboutImage from "./AboutImage";
export default function About() {
  return (
    <section
      className="relative z-20 my-4 sm:my-16 mx-auto max-w-6xl p-6 backdrop-blur-xs grid gap-8 break-words hyphens-auto"
      style={{ wordBreak: "break-word" }}
    >
      <AboutImage />
      <AboutMeParagraph />
      <Education />
      <Suspense>
        <GithubContributionTable />
        <GuestBook />
      </Suspense>
    </section>
  );
}
