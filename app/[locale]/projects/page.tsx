import React from "react";
import projectsData from "@/db/static/projects";
import ProjectCards from "@/features/Projects/Cards/ProjectsCard";
import { getBase64 } from "@/lib/getBase64ImageUrl";
import { getTranslations, setRequestLocale } from "next-intl/server";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale,
    namespace: "Projects.metadata",
  });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      type: "website",
      locale: locale,
      url: locale === "en" ? "/en/projects" : "/tr/projeler",
      title: `${t("title")} | Furkan Cengiz`,
      description: t("description"),
    },
    alternates: {
      canonical: "/projects",
      languages: {
        en: "/projects",
        tr: "/tr/projeler",
      },
    },
  };
}
const images = projectsData.map((project) => project.images[0].src);
export default async function Projects({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Projects");
  const statusT = await getTranslations("Project.status");
  const blurredImage = await Promise.all(
    images.map((image) => getBase64(image))
  );

  return (
    <section className="relative z-20 mb-auto w-full">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <header className="mb-10 grid gap-6 border-b border-white/10 pb-8 lg:grid-cols-[1fr_320px] lg:items-end">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-teal-300">
              {t("eyebrow")}
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-normal text-foreground sm:text-6xl">
              {t("title")}
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              {t("subtitle")}
            </p>
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground lg:text-right">
            {projectsData.length} {t("count-label")}
          </p>
        </header>
        <div className="grid gap-5">
          {projectsData.map((project, index) => (
          <ProjectCards
            project={project}
            blurredImage={blurredImage[index]}
            key={index}
            index={index}
            locale={locale}
            statusText={statusT(project.status)}
          />
        ))}
        </div>
      </div>
    </section>
  );
}
