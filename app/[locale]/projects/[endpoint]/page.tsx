import React from "react";
import projectsData from "@/db/static/projects";
import ProjectCard from "@/features/Projects/Cards/ProjectCard";
import { Metadata } from "next";
import { getBase64 } from "@/lib/getBase64ImageUrl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/navigation";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ endpoint: string; locale: string }>;
}): Promise<Metadata> {
  const { locale, endpoint } = await params;
  const project = projectsData.filter(
    (project) => project.endpoint === endpoint
  )[0];
  return {
    title: project?.title[locale as "en" | "tr"],
    description: project?.description[locale as "en" | "tr"],
    openGraph: {
      type: "website",
      locale: locale,
      url: `/projects/${project?.endpoint}`,
      title: `${project?.title[locale as "en" | "tr"]} | Furkan Cengiz`,
      description: project?.description[locale as "en" | "tr"],
      images: [
        {
          url: project?.images[0].src,
          alt: project?.images[0].alt,
        },
      ],
    },
    alternates: {
      canonical: `/projects/${project?.endpoint}`,
      languages: {
        en: `/projects/${project?.endpoint}`,
        tr: `/tr/projeler/${project?.endpoint}`,
      },
    },
  };
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projectsData.map((project) => ({ locale, endpoint: project.endpoint })),
  );
}

export default async function Project({
  params,
}: {
  params: Promise<{ endpoint: string; locale: string }>;
}) {
  const { endpoint, locale } = await params;
  setRequestLocale(locale);
  const project = projectsData.filter(
    (project) => project.endpoint === endpoint
  )[0];

  if (!project) notFound();
  const t = await getTranslations("Project");
  const blurredImage = await getBase64(project.images[0].src);
  return (
    <section className="relative z-20 mx-auto mb-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <ProjectCard
        project={project}
        blurredImage={blurredImage}
        repoLinkText={
          endpoint === "Turkish-Dictionary"
            ? t("repo-link.contribute")
            : t("repo-link.visit")
        }
        liveLinkText={t("live-link")}
        contributors={t("contributors")}
        techStack={t("tech-stack")}
        status={t(`status.${project.status}`)}
        locale={locale}
      />
    </section>
  );
}
