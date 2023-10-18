"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function ProjectCards({
  projectsData,
}: {
  projectsData: Project[];
}) {
  const router = useRouter();
  return (
    <>
      {projectsData.map((project, index) => (
        <Card
          onPress={() => router.push(`/projects/${project.endpoint}`)}
          isBlurred
          isFooterBlurred
          isPressable
          key={index}
          className="shadow-lg drop backdrop-blur-xs transition-[background-color] duration-300 relative z-50"
        >
          <Image
            src={project.images[0].src}
            alt={project.images[0].alt}
            width={800}
            height={600}
            className="w-full object-contain"
          />
          <CardFooter className="justify-center before:bg-background/5 overflow-hidden absolute bottom-0 shadow-small z-10">
            <h2 className="text-fs-400">{project.title}</h2>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
