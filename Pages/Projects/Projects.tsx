import React from "react";
import ProjectCards from "./Cards/ProjectsCard";
import projectsData from "@/db/static/projects";
import { useTranslations } from "next-intl";
export default function Projects() {
  const t = useTranslations("Projects");
  return (
    <>
      <section>
        <h1 className="text-fs-700 text-center font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-purple-900 bg-300% animate-flow-gradient my-4">
          {t("title")}
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
