"use client";
import React from "react";

export const AboutMeParagraph = ({
  firstParagraph,
  secondParagraph,
  thirdParagraph,
  fourthParagraph,
  title,
}: Record<
  | "firstParagraph"
  | "secondParagraph"
  | "thirdParagraph"
  | "fourthParagraph"
  | "title",
  string
>) => {
  return (
    <article>
      <h1 className="my-4 text-fs-700 font-bold">{title}</h1>
      <section className="flex flex-col gap-4 text-fs-300">
        <p>{firstParagraph}</p>
        <p>{secondParagraph}</p>
        <p>{thirdParagraph}</p>
        <p>{fourthParagraph}</p>
      </section>
    </article>
  );
};
