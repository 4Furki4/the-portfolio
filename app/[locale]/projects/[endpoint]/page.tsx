import React from "react";
import ProjectCard from "@/features/Projects/Cards/ProjectCard";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/directus/data";
import type { PortfolioLocale } from "@/lib/directus/types";
import { getBase64 } from "@/lib/getBase64ImageUrl";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ endpoint: string; locale: string }>;
}): Promise<Metadata> {
  const { locale, endpoint } = await params;
  const project = await getProjectBySlug(endpoint, locale as PortfolioLocale);
  if (!project) notFound();

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      type: "website",
      locale: locale,
      url: `/projects/${project.slug}`,
      title: `${project.title} | Furkan Cengiz`,
      description: project.description,
      images: [
        {
          url: project.images[0].src,
          alt: project.images[0].alt,
        },
      ],
    },
    alternates: {
      canonical: `/projects/${project.slug}`,
      languages: {
        en: `/projects/${project.slug}`,
        tr: `/tr/projeler/${project.slug}`,
      },
    },
  };
}

export default async function Project({
  params,
}: {
  params: Promise<{ endpoint: string; locale: string }>;
}) {
  const { endpoint, locale } = await params;
  setRequestLocale(locale);
  const project = await getProjectBySlug(endpoint, locale as PortfolioLocale);

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
