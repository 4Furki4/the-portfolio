import React from "react";
import projectsData from "@/db/static/projects";
import ProjectCards from "@/Pages/Projects/Cards/ProjectsCard";
import { getBase64 } from "@/lib/getBase64ImageUrl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({
    locale: locale,
    namespace: ["Projects.metadata"],
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
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("Projects");
  const blurredImage = await Promise.all(
    images.map((image) => getBase64(image))
  );
  const projectPreviewData: ProjectPreview[] = projectsData.map((project) => ({
    title: project.title[locale as "en" | "tr"],
    src: project.images[0].src,
    alt: project.images[0].alt,
    endpoint: project.endpoint,
    description: project.description[locale as "en" | "tr"],
  }));

  return (
    <section className="mb-auto">
      <h1 className="text-fs-700 text-center font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-purple-900 bg-300% animate-flow-gradient my-4">
        {t("title")}
      </h1>
      <div
        aria-hidden
        className="z-10 p-2 my-4 sm:my-16 lg:w-10/12 mx-auto grid md:grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {projectPreviewData.map((project, index) => (
          <ProjectCards
            projectPreview={project}
            blurredImage={blurredImage[index]}
            key={index}
            locale={locale}
          />
        ))}
      </div>
    </section>
  );
}
