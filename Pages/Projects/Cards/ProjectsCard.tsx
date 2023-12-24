import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function ProjectCards({
  blurredImage,
  locale,
  projectPreview: project,
}: {
  projectPreview: ProjectPreview;
  blurredImage: string;
  locale: string;
}) {
  return (
    <>
      {
        <section className="h-full w-full">
          <Card
            isBlurred
            isFooterBlurred
            isPressable
            as={Link}
            href={`/projects/${project.endpoint}`}
            className="shadow-lg backdrop-blur-xs relative z-20 h-full w-full hover:scale-105"
          >
            <CardHeader className="justify-center shadow-small">
              <h2 className="text-fs-400 font-bold">{project.title}</h2>
            </CardHeader>
            <CardBody className="w-full overflow-visible relative p-0 min-h-[200px] sm:min-h-[300px] 2xl:min-h-[350px]">
              <figure>
                <Image
                  src={project.src}
                  alt={project.alt}
                  className="w-full object-cover"
                  sizes="(min-width: 768px) 40vw), 100vw"
                  placeholder="blur"
                  quality={90}
                  blurDataURL={blurredImage}
                  fill={true}
                />
              </figure>
            </CardBody>
            <CardFooter className="shadow-small">
              <p className="text-fs-200 max-w-[calc(100vw-50px)] md:max-w-[calc(100vw-75px)] overflow-hidden text-ellipsis whitespace-nowrap">
                {project.description}
              </p>
            </CardFooter>
          </Card>
        </section>
      }
    </>
  );
}
