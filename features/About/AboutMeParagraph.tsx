import React from "react";
import { Surface } from "@/components/portfolio/Primitives";

export const AboutMeParagraph = ({
  body,
  title,
}: Record<"body" | "title", string>) => {
  return (
    <Surface>
      <article className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[260px_1fr]">
        <h2 className="text-3xl font-semibold leading-tight text-foreground">
          {title}
        </h2>
        <section
          className="grid gap-4 text-base leading-8 text-muted-foreground [&_a]:text-teal-200 [&_a]:underline [&_li]:ml-6 [&_ol]:list-decimal [&_ul]:list-disc"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </article>
    </Surface>
  );
};
