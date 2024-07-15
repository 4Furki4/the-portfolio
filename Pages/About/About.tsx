import React, { Suspense } from "react";
import { AboutMeParagraph } from "./AboutMeParagraph";
import Education from "./Education";
import GithubContributionTable from "./GithubContributionTable";
import GuestBook from "./GuestBook/GuestBook";
import AboutImage from "./AboutImage";
import { useTranslations } from "next-intl";
import TakenCourses from "./TakenCourses";
import { getTakenCourses } from "@/db/static/takenCourses";
export default function About({ locale }: { locale: string }) {
  const t = useTranslations("About");
  const takenCourses = getTakenCourses(locale);
  return (
    <section
      className="relative z-20 my-4 sm:my-16 mx-auto max-w-6xl p-6 backdrop-blur-xs grid gap-8 break-words hyphens-auto"
      style={{ wordBreak: "break-word" }}
    >
      <AboutImage />
      <AboutMeParagraph
        title={t("adventure.title")}
        firstParagraph={t("adventure.p1")}
        secondParagraph={t("adventure.p2")}
        thirdParagraph={t("adventure.p3")}
        fourthParagraph={t("adventure.p4")}
      />
      <Education locale={locale} title={t("education.title")} />
      <TakenCourses takenCourses={takenCourses} coursePage={t('taken-courses.course-page')}
        title={t('taken-courses.title')}
      />
      <Suspense>
        <GithubContributionTable />
        <GuestBook />
      </Suspense>
    </section>
  );
}
