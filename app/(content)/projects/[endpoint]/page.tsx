import React from "react";
import projectsData from "@/db/static/projects";
import ProjectCard from "@/components/Card/ProjectCard";
import { Metadata } from "next";
import { getBase64 } from "@/lib/getBase64ImageUrl";
export function generateMetadata({
  params,
}: {
  params: { endpoint: string };
}): Metadata {
  const project = projectsData.filter(
    (project) => project.endpoint === params.endpoint
  )[0];
  return {
    title: `${project?.title} | Furkan Cengiz`,
    description: project?.description,
    openGraph: {
      type: "website",
      locale: "en_US",
      url:
        process.env.NODE_ENV === "development"
          ? `http://localhost:3000/projects/${project?.endpoint}`
          : `https://www.furkancengiz.software/projects/${project?.endpoint}`,
      title: `${project?.title} | Furkan Cengiz`,
      description: project?.description,
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
    <section className="max-w-5xl mx-auto p-4">
      <ProjectCard project={project} blurredImage={blurredImage} />
    </section>
  );
}
