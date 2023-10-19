import React from "react";
import projectsData from "@/db/static/projects";
import ProjectCard from "@/components/Card/ProjectCard";
export function generateMetadata({ params }: { params: { title: string } }) {
  const title = projectsData.filter(
    (project) => project.endpoint === params.title
  )[0].title;
  return {
    title: `${title} | Furkan Cengiz`,
    description: "Furkan Cengiz's projects with source code and live demos",
  };
}

export default function Project({ params }: { params: { title: string } }) {
  return (
    <section className="max-w-5xl mx-auto p-4">
      <ProjectCard params={params} />
    </section>
  );
}
