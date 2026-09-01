import React from "react";
import ProjectCards from "@/features/Projects/Cards/ProjectsCard";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getProjects, getProjectsPage } from "@/lib/directus/data";
import type { PortfolioLocale } from "@/lib/directus/types";
import { getBase64 } from "@/lib/getBase64ImageUrl";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = await getProjectsPage(locale as PortfolioLocale);
  return {
    title: content.seoTitle,
    description: content.seoDescription,
    openGraph: {
      type: "website",
      locale: locale,
      url: locale === "en" ? "/en/projects" : "/tr/projeler",
      title: `${content.seoTitle} | Furkan Cengiz`,
      description: content.seoDescription,
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
export default async function Projects({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const portfolioLocale = locale as PortfolioLocale;
  const [content, projects, t, statusT] = await Promise.all([
    getProjectsPage(portfolioLocale),
    getProjects(portfolioLocale),
    getTranslations("Projects"),
    getTranslations("Project.status"),
  ]);
  const blurredImages = await Promise.all(
    projects.map((project) => getBase64(project.images[0].src)),
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
              {content.heading}
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              {t("subtitle")}
            </p>
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground lg:text-right">
            {projects.length} {t("count-label")}
          </p>
        </header>
        <div className="grid gap-5">
          {projects.map((project, index) => (
            <ProjectCards
              project={project}
              blurredImage={blurredImages[index]}
              key={project.id}
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
