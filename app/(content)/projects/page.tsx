import Card from "@/components/Card/Card";
import React from "react";
import projects from "@/db/static/projects";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Furkan Cengiz's projects with source code and live demos",
};

export default function Page() {
  return (
    <div className="z-50 p-2 my-16 lg:w-10/12 mx-auto grid lg:grid-cols-2 gap-4">
      {projects.map((project, index) => (
        <Card key={index} {...project} />
      ))}
    </div>
  );
}
