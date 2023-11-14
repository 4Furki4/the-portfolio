import { Card, CardBody, CardFooter } from "@nextui-org/react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
export default async function ProjectCards({
  project,
  blurredImage,
}: {
  project: Project;
  blurredImage: string;
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
            className="shadow-lg drop backdrop-blur-xs transition-[background-color] duration-300 relative z-20 h-full w-full"
          >
            <CardBody className="w-full overflow-visible relative p-0 min-h-[200px] sm:min-h-[300px] 2xl:min-h-[350px]">
              <figure>
                <Image
                  src={project.images[0].src}
                  alt={project.images[0].alt}
                  className="w-full object-cover"
                  sizes="(min-width: 768px) 40vw), 100vw"
                  placeholder="blur"
                  blurDataURL={blurredImage}
                  fill={true}
                />
              </figure>
            </CardBody>
            <CardFooter className="justify-center shadow-small h-full">
              <h2 className="text-fs-400 font-bold">{project.title}</h2>
            </CardFooter>
          </Card>
        </section>
      }
    </>
  );
}
