import React from "react";
import Home, { type HomeProject } from "@/features/Home/Home";
import { getTranslations, setRequestLocale } from "next-intl/server";
import projectsData from "@/db/static/projects";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  const statusT = await getTranslations("Project.status");
  const featuredProjects: HomeProject[] = projectsData.slice(0, 3).map((project) => ({
    title: project.title[locale as "en" | "tr"],
    description: project.description[locale as "en" | "tr"],
    endpoint: project.endpoint,
    src: project.images[0].src,
    alt: project.images[0].alt,
    status: project.status,
    statusText: statusT(project.status),
    techStack: project.techStack.map((tech) => tech.name),
  }));
  return (
    <Home
      title={t("title")}
      subtitle={t("subtitle")}
      projectsLinkText={t("projects")}
      role={t("role")}
      locale={locale}
      featuredProjects={featuredProjects}
    />
  );
}
