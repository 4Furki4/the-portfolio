"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@heroui/react";
import React from "react";
import { CheckCircle, ExternalLink, HardHat, X } from "lucide-react";
import Image from "next/image";
import { Accordion, AccordionItem } from "@heroui/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Fancybox from "@/components/FancyBox";

type IntlProps = Record<
  | "repoLinkText"
  | "liveLinkText"
  | "techStack"
  | "contributors"
  | "status"
  | "locale",
  string
>;

export default function ProjectCard({
  project,
  blurredImage,
  status,
  liveLinkText,
  repoLinkText,
  contributors,
  techStack,
  locale,
}: {
  project: Project;
  blurredImage: string;
} & IntlProps) {
  if (!project) notFound();
  return (
    <Card className="bg-background">
      <CardHeader className="relative flex-col sm:flex-row items-start sm:items-center">
        <h1 className="text-fs-500 font-bold">
          {project.title[locale as "en" | "tr"]}
        </h1>
        <div className="sm:ml-auto sm:mr-4 pl-1 sm:pl-0">
          {project.status === "completed" ? (
            <p className="text-success flex gap-2">
              <span>{status}</span>
              <CheckCircle />
            </p>
          ) : project.status === "in-progress" ? (
            <p className="text-warning flex gap-2">
              <span>{status}</span>
              <HardHat />
            </p>
          ) : project.status === "planned" ? (
            <span className="text-danger">{status}</span>
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
        <p className="text-fs-300 my-4">
          {project.description[locale as "en" | "tr"]}
        </p>
        {/* @ts-ignore which causes nonsense error in Accordion component when I render an AccordionItem conditionally */}
        <Accordion
          defaultExpandedKeys={["1"]}
          variant="bordered"
          selectionMode="multiple"
        >
          <AccordionItem key="1" title={techStack}>
            <div className="w-full flex flex-wrap gap-4 items-center">
              {project.techStack.map((tech, index) => (
                <Link
                  target="_blank"
                  href={tech.url ?? "#"}
                  key={index}
                  className="text-fs-300 bg-foreground-foreground rounded-full px-4 py-2"
                >
                  {tech.name}
                </Link>
              ))}
            </div>
          </AccordionItem>
          {project.contributors ? (
            <AccordionItem title={contributors}>
              <div className="w-full flex flex-wrap gap-4 items-center">
                {project.contributors?.map((contributor, index) => (
                  <Link
                    key={index}
                    href={contributor.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fs-300 bg-foreground-foreground rounded-full px-4 py-2"
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
            {repoLinkText}
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
            {liveLinkText} <ExternalLink size={16} />
          </Link>
        ) : null}
      </CardFooter>
    </Card>
  );
}
