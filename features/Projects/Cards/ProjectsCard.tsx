import { Card, CardContent, CardFooter, CardHeader } from "@heroui/react";
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
    <section className="h-full w-full">
      <Link href={`/projects/${project.endpoint}`} className="block h-full w-full">
        <Card className="shadow-lg backdrop-blur-xs relative z-20 h-full w-full group transition-all duration-500 hover:shadow-xl hover:shadow-red-700/5">
          <CardHeader className="justify-between shadow-small p-4 bg-background/60">
            <h2 className="text-fs-400 font-bold bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-700 group-hover:to-purple-900 transition-all duration-500">
              {project.title}
            </h2>
          </CardHeader>
          <CardContent className="w-full overflow-hidden relative p-0 min-h-[200px] sm:min-h-[300px] 2xl:min-h-[350px]">
            <figure className="absolute inset-0 transform transition-transform duration-500 group-hover:scale-105 md:scale-100">
              <Image
                src={project.src}
                alt={project.alt}
                className="w-full h-full object-cover"
                sizes="(min-width: 768px) 40vw), 100vw"
                placeholder="blur"
                quality={90}
                blurDataURL={blurredImage}
                fill={true}
              />
            </figure>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent md:opacity-0 md:group-hover:opacity-100 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20 md:translate-y-[120%] md:group-hover:translate-y-0 transition-transform duration-500 ease-out">
              <p className="text-sm font-medium line-clamp-3 drop-shadow-md">
                {project.description}
              </p>
            </div>
          </CardContent>
          <CardFooter className="shadow-small justify-end items-center bg-background/60">
            <span className="text-sm text-default-500 group-hover:text-default-900 transition-colors duration-500 flex items-center gap-2">
              {locale === "en" ? "Learn More" : "Daha Fazla"}
              <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-500">→</span>
            </span>
          </CardFooter>
        </Card>
      </Link>
    </section>
  );
}
