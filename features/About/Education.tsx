import React from "react";
import { format } from "date-fns";
import { SchoolIcon } from "lucide-react";
import { SectionHeader, Surface } from "@/components/portfolio/Primitives";
import Reveal from "@/components/portfolio/Reveal";

type Education = {
  title: {
    en: string;
    tr: string;
  };
  place: string;
  description: {
    en: string;
    tr: string;
  };
  yearStart: Date;
  yearEnd?: Date;
};
export default function Education({
  title,
  locale,
}: Record<"title" | "locale", string>) {
  const educations: Education[] = [
    {
      title: {
        en: "Frontend Web Development BootCamp",
        tr: "Frontend Web Development BootCamp",
      },
      place: "Recoded",
      description: {
        en: "I learned how to collaborate with teammates, provide feedback, manage time, and more. Furthermore, I honed my self-taught skills since our teachers encouraged us to self-teach.",
        tr: "Takım çalışmasını, geri bildirim sağlamayı, zaman yönetimini ve daha fazlasını öğrendim. Ayrıca, öğretmenlerimiz bizi kendi kendimize öğrenmeye teşvik ettikleri için kendi kendime öğrendiğim becerilerimi geliştirdim.",
      },
      yearStart: new Date(2023, 2, 5),
      yearEnd: new Date(2023, 8, 5),
    },
    {
      title: {
        en: "Industrial Engineering",
        tr: "Endüstri Mühendisliği",
      },
      place: "Abdullah Gul University",
      description: {
        en: "Completed the prep school and left the university at the end of the first year.",
        tr: "Hazırlık okulunu tamamladım ve birinci sınıfın sonunda üniversiteden ayrıldım.",
      },
      yearStart: new Date(2021, 9, 5),
      yearEnd: new Date(2022, 6, 15),
    },
  ];
  return (
    <section className="grid gap-6">
      <SectionHeader
        eyebrow={locale === "tr" ? "02 / Yol" : "02 / Path"}
        title={title}
      />
      <div className="relative grid gap-4 pl-5 before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-cyan-300 before:via-white/20 before:to-rose-300">
        {educations.map((education, i) => (
          <Reveal delay={i * 0.06} key={education.place}>
            <article className="relative">
              <span className="absolute -left-[27px] top-5 grid size-4 place-items-center rounded-full border border-cyan-300/60 bg-background">
                <span className="size-1.5 rounded-full bg-cyan-200" />
              </span>
              <Surface className="grid gap-5 p-5 sm:grid-cols-[1fr_auto] sm:p-6">
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <SchoolIcon aria-hidden className="text-cyan-200" size={19} />
                    <h3 className="text-2xl font-semibold text-foreground">
                      {education.title[locale as "en" | "tr"]}
                    </h3>
                  </div>
                  <p className="font-semibold text-rose-100">{education.place}</p>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
                  {education.description[locale as "en" | "tr"]}
                </p>
                </div>
                <time className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:text-right">
                  {format(education.yearStart, "dd.MM.yyyy")} -{" "}
                  {education.yearEnd
                    ? format(education?.yearEnd, "dd.MM.yyyy")
                    : locale === "tr" ? "Bugün" : "Present"}
                </time>
              </Surface>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
