import React from "react";
import projectsData from "@/db/static/projects";
import ProjectCard from "@/Pages/Projects/Cards/ProjectCard";
import { Metadata } from "next";
import { getBase64 } from "@/lib/getBase64ImageUrl";
import { unstable_setRequestLocale } from "next-intl/server";
export function generateMetadata({
  params,
}: {
  params: { endpoint: string; locale: string };
}): Metadata {
  unstable_setRequestLocale(params.locale);
  const project = projectsData.filter(
    (project) => project.endpoint === params.endpoint
  )[0];
  return {
    title: project.title,
    description: project?.description,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `/projects/${project?.endpoint}`,
      title: `${project?.title} | Furkan Cengiz`,
      description: project?.description,
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
  return projectsData.map((project) => ({ endpoint: project.endpoint }));
}

export default async function Project({
  params,
}: {
  params: { endpoint: string };
}) {
  const endpoint = params.endpoint;
  const project = projectsData.filter(
    (project) => project.endpoint === endpoint
  )[0];

  const blurredImage = await getBase64(project.images[0].src);
  return (
    <section className="max-w-5xl mx-auto p-4 z-20 mb-auto">
      <ProjectCard project={project} blurredImage={blurredImage} />
    </section>
  );
}
