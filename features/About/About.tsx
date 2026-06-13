import React, { Suspense } from "react";
import { AboutMeParagraph } from "./AboutMeParagraph";
import Education from "./Education";
import GithubContributionTable from "./GithubContributionTable";
import AboutImage from "./AboutImage";
import { useTranslations } from "next-intl";
import TakenCourses from "./TakenCourses";
import { getTakenCourses } from "@/db/static/takenCourses";
import { PageShell, Surface } from "@/components/portfolio/Primitives";
import Reveal from "@/components/portfolio/Reveal";

export default function About({ locale }: { locale: string }) {
  const t = useTranslations("About");
  const takenCourses = getTakenCourses(locale);
  return (
    <PageShell className="grid gap-12 break-words hyphens-auto">
      <section className="grid gap-6 lg:grid-cols-[minmax(280px,420px)_1fr] lg:items-stretch">
        <Reveal>
          <AboutImage />
        </Reveal>
        <Reveal delay={0.08}>
          <Surface className="flex h-full flex-col justify-end p-5 sm:p-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-cyan-300">
              {t("intro.eyebrow")}
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-[0.95] tracking-normal text-foreground sm:text-5xl lg:text-6xl">
              {t("intro.title")}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              {t("intro.subtitle")}
            </p>
          </Surface>
        </Reveal>
      </section>

      <Reveal>
        <AboutMeParagraph
          title={t("adventure.title")}
          firstParagraph={t("adventure.p1")}
          secondParagraph={t("adventure.p2")}
          thirdParagraph={t("adventure.p3")}
          fourthParagraph={t("adventure.p4")}
        />
      </Reveal>
      <Education locale={locale} title={t("education.title")} />
      <TakenCourses
        coursePage={t("taken-courses.course-page")}
        description={t("taken-courses.description")}
        takenCourses={takenCourses}
        title={t("taken-courses.title")}
      />
      <Suspense>
        <GithubContributionTable />
      </Suspense>
    </PageShell>
  );
}
