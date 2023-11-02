import React from "react";
import projectsData from "@/db/static/projects";
import ProjectCards from "@/components/Card/ProjectsCard";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Projects",
  description: "Furkan Cengiz's projects with source code and live demos",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.furkancengiz.software/projects",
    title: "Projects",
    description: "Furkan Cengiz's projects with source code and live demos",
  },
  alternates: {
    canonical: "/",
  },
};

export default async function Projects() {
  return (
    <>
      <section>
        <h1 className="text-fs-700 text-center font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-purple-900 bg-300% animate-flow-gradient my-4">
          {"Projects Previews"}
        </h1>
      </section>
      <div
        aria-hidden
        className="z-10 p-2 my-4 sm:my-16 lg:w-10/12 mx-auto grid md:grid-cols-1 lg:grid-cols-2 lg:auto-rows-[1fr] gap-8 justify-center"
      >
        {projectsData.map((project, index) => (
          <ProjectCards project={project} index={index} key={index} />
        ))}
      </div>
    </>
  );
}
