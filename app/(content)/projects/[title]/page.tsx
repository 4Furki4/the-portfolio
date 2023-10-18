"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";
import projectsData from "@/db/static/projects";
import ProjectCard from "@/components/Card/ProjectCard";
// export function generateMetadata({ params }: { params: { title: string } }) {
//   return {
//     title: params.title,
//     description: "Furkan Cengiz's projects with source code and live demos",
//   };
// }

export default function Project({ params }: { params: { title: string } }) {
  return <ProjectCard params={params} />;
}
