"use client";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import React from "react";
import projectsData from "@/db/static/projects";
import Image from "next/image";
export default function ProjectCard({ params }: { params: { title: string } }) {
  const parsedTitle = decodeURIComponent(params.title);
  return (
    <Card>
      <CardHeader>{params.title}</CardHeader>
      <CardBody>
        <Image
          width={800}
          height={600}
          src={
            projectsData.filter(
              (project) => project.endpoint === parsedTitle
            )[0].images[0].src
          }
          alt={
            projectsData.filter(
              (project) => project.endpoint === parsedTitle
            )[0].images[0].alt
          }
        />
      </CardBody>
    </Card>
  );
}
