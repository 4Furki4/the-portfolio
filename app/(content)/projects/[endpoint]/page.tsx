import React from "react";
import projectsData from "@/db/static/projects";
import ProjectCard from "@/components/Card/ProjectCard";
import { Metadata } from "next";
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
          : `https://furkancengiz.software/projects/${project?.endpoint}`,
      title: `${project?.title} | Furkan Cengiz`,
      description: project?.description,
    },
  };
}

export function generateStaticParams() {
  return projectsData.map((project) => ({ endpoint: project.endpoint }));
}

export default function Project({ params }: { params: { endpoint: string } }) {
  const endpoint = params.endpoint;
  return (
    <section className="max-w-5xl mx-auto p-4">
      <ProjectCard endpoint={endpoint} />
    </section>
  );
}
