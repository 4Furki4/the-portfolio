import React from "react";
import projectsData from "@/db/static/projects";
import { Metadata } from "next";
import ProjectCards from "@/Pages/Projects/Cards/ProjectsCard";
import { getBase64 } from "@/lib/getBase64ImageUrl";
import { unstable_setRequestLocale } from "next-intl/server";
export const metadata: Metadata = {
  title: "Projects",
  description: "Furkan Cengiz's projects with source code and live demos",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/projects",
    title: "Projects | Furkan Cengiz",
    description: "Furkan Cengiz's projects with source code and live demos",
  },
  alternates: {
    canonical: "/projects",
  },
};

export default async function Projects({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const images = projectsData.map((project) => project.images[0].src);
  const blurredImage = await Promise.all(
    images.map((image) => getBase64(image))
  );
  return (
    <section className="mb-auto">
      <h1 className="text-fs-700 text-center font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-purple-900 bg-300% animate-flow-gradient my-4">
        {"Projects Previews"}
      </h1>
      <div
        aria-hidden
        className="z-10 p-2 my-4 sm:my-16 lg:w-10/12 mx-auto grid md:grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {projectsData.map((project, index) => (
          <ProjectCards
            project={project}
            blurredImage={blurredImage[index]}
            key={index}
          />
        ))}
      </div>
    </section>
  );
}
