import React from "react";
import projectsData from "@/db/static/projects";
import ProjectCards from "@/components/Card/ProjectsCard";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Projects",
  description: "Furkan Cengiz's projects with source code and live demos",
};

export default function Projects() {
  return (
    <div
      aria-description="styling element"
      className="z-50 p-2 my-4 sm:my-16 lg:w-10/12 mx-auto grid lg:grid-cols-2 gap-4"
    >
      <ProjectCards projectsData={projectsData} />
    </div>
  );
}
