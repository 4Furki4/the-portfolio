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
import ServerSideLearning from "./ServerSideLearning";

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
          <Surface className="flex h-full min-h-[420px] flex-col justify-center p-5 sm:p-8 lg:min-h-0 lg:p-10">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-teal-300">
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
      <ServerSideLearning
        cards={[
          {
            label: t("server.self-hosted.label"),
            title: t("server.self-hosted.title"),
            description: t("server.self-hosted.description"),
          },
          {
            label: t("server.organization.label"),
            title: t("server.organization.title"),
            description: t("server.organization.description"),
          },
          {
            label: t("server.direction.label"),
            title: t("server.direction.title"),
            description: t("server.direction.description"),
          },
        ]}
        description={t("server.description")}
        eyebrow={t("server.eyebrow")}
        note={t("server.note")}
        title={t("server.title")}
      />
      <Education locale={locale} title={t("education.title")} />
      <TakenCourses
        coursePage={t("taken-courses.course-page")}
        description={t("taken-courses.description")}
        locale={locale}
        takenCourses={takenCourses}
        title={t("taken-courses.title")}
      />
      <Suspense>
        <GithubContributionTable />
      </Suspense>
    </PageShell>
  );
}
