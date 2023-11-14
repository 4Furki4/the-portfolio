"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import React from "react";
import { CheckCircle, ExternalLink, HardHat, X } from "lucide-react";
import Image from "next/image";
import { Accordion, AccordionItem } from "@nextui-org/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Fancybox from "@/components/FancyBox";

export default function ProjectCard({
  project,
  blurredImage,
}: {
  project: Project;
  blurredImage: string;
}) {
  if (!project) notFound();
  return (
    <Card className="bg-background">
      <CardHeader className="relative flex-col sm:flex-row items-start sm:items-center">
        <h1 className="text-fs-500 font-bold">{project.title}</h1>
        <div className="sm:ml-auto sm:mr-4 pl-1 sm:pl-0">
          {project.status === "completed" ? (
            <p className="text-success flex gap-2">
              <span>Completed</span>
              <CheckCircle />
            </p>
          ) : project.status === "in-progress" ? (
            <p className="text-warning flex gap-2">
              <span>In Progress</span>
              <HardHat />
            </p>
          ) : project.status === "planned" ? (
            <span className="text-danger">Planned</span>
          ) : null}
        </div>
      </CardHeader>
      <CardBody>
        <Fancybox
          options={{
            Carousel: {
              infinite: true,
            },
          }}
        >
          <>
            <Image
              data-fancybox-trigger="gallery"
              className="cursor-pointer mb-4"
              src={project.images[0].src}
              alt={project.images[0].alt}
              width={1920}
              height={1080}
              placeholder="blur"
              blurDataURL={blurredImage}
            />
            <div
              style={{
                display: project.images.length > 1 ? "flex" : "none",
              }}
              className="gap-4 items-center grid grid-cols-2 sm-flex sm:flex-nowrap"
            >
              {project.images.map((image, index) => (
                <a key={index} data-fancybox="gallery" href={image.src}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1920}
                    height={1080}
                  />
                </a>
              ))}
            </div>
          </>
        </Fancybox>
        <p className="text-fs-300 my-4">{project.description}</p>
        {/* @ts-ignore which causes nonsense error in Accordion component when I render an AccordionItem conditionally */}
        <Accordion variant="bordered" selectionMode="multiple">
          <AccordionItem title={"Tech Stack"}>
            <div className="w-full flex flex-wrap gap-4 items-center">
              {project.techStack.map((tech, index) => (
                <Link
                  target="_blank"
                  href={tech.url ?? "#"}
                  key={index}
                  className="text-fs-300 bg-accent/40 rounded-full px-4 py-2"
                >
                  {tech.name}
                </Link>
              ))}
            </div>
          </AccordionItem>
          {project.contributors ? (
            <AccordionItem title={"Contributors"}>
              <div className="w-full flex flex-wrap gap-4 items-center">
                {project.contributors?.map((contributor, index) => (
                  <Link
                    key={index}
                    href={contributor.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fs-300 bg-accent/40 rounded-full px-4 py-2"
                  >
                    {contributor.name}
                  </Link>
                ))}
              </div>
            </AccordionItem>
          ) : null}
        </Accordion>
      </CardBody>
      <Divider />
      <CardFooter className="flex-col">
        {project.repoLink ? (
          <Link
            href={project.repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fs-300 z-50 flex items-center gap-1"
          >
            {project.endpoint === "Turkish-Dictionary" ? (
              "Contribute to the Project"
            ) : (
              <>{"Visit Source Code on GitHub "}</>
            )}
            <ExternalLink size={16} />
          </Link>
        ) : null}
        {project.demoLink ? (
          <Link
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fs-300 z-50 flex items-center gap-1"
          >
            Live Demo <ExternalLink size={16} />
          </Link>
        ) : null}
      </CardFooter>
    </Card>
  );
}
