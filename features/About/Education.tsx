import React from "react";
import { format } from "date-fns";
import { SchoolIcon } from "lucide-react";
import { SectionHeader, Surface } from "@/components/portfolio/Primitives";
import Reveal from "@/components/portfolio/Reveal";
import type { EducationItem } from "@/lib/directus/types";

export default function Education({
  education,
  title,
  locale,
}: {
  education: EducationItem[];
  title: string;
  locale: string;
}) {
  return (
    <section className="grid gap-6">
      <SectionHeader
        eyebrow={locale === "tr" ? "03 / Yol" : "03 / Path"}
        title={title}
      />
      <div className="relative grid gap-4 pl-5 before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-teal-300 before:via-white/20 before:to-rose-300">
        {education.map((item, index) => (
          <Reveal delay={index * 0.06} key={item.id}>
            <article className="relative">
              <span className="absolute -left-[27px] top-5 grid size-4 place-items-center rounded-full border border-teal-300/60 bg-background">
                <span className="size-1.5 rounded-full bg-teal-200" />
              </span>
              <Surface className="grid gap-5 p-5 sm:grid-cols-[1fr_auto] sm:p-6">
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <SchoolIcon aria-hidden className="text-teal-200" size={19} />
                    <h3 className="text-2xl font-semibold text-foreground">
                      {item.title}
                    </h3>
                  </div>
                  <p className="font-semibold text-rose-100">{item.institution}</p>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
                    {item.description}
                  </p>
                </div>
                <time className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:text-right">
                  {format(new Date(`${item.startDate}T00:00:00`), "dd.MM.yyyy")} -{" "}
                  {item.endDate
                    ? format(new Date(`${item.endDate}T00:00:00`), "dd.MM.yyyy")
                    : locale === "tr"
                      ? "Bugün"
                      : "Present"}
                </time>
              </Surface>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
