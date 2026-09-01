import React from "react";
import Home, { type HomeProject } from "@/features/Home/Home";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getHomePage, getProjects } from "@/lib/directus/data";
import type { PortfolioLocale } from "@/lib/directus/types";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const portfolioLocale = locale as PortfolioLocale;
  const [content, projects, t, statusT] = await Promise.all([
    getHomePage(portfolioLocale),
    getProjects(portfolioLocale),
    getTranslations("Home"),
    getTranslations("Project.status"),
  ]);
  const featuredProjects: HomeProject[] = projects.slice(0, 3).map((project) => ({
    title: project.title,
    description: project.description,
    endpoint: project.slug,
    src: project.images[0].src,
    alt: project.images[0].alt,
    status: project.status,
    statusText: statusT(project.status),
    techStack: project.techStack.map((tech) => tech.name),
  }));
  return (
    <Home
      content={content}
      projectsLinkText={t("projects")}
      locale={locale}
      featuredProjects={featuredProjects}
    />
  );
}
