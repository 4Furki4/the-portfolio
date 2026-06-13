import React from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/portfolio/Reveal";
import {
  StatusBadge,
  Surface,
  TechPill,
} from "@/components/portfolio/Primitives";
import { getProjectHref } from "@/lib/localizedPath";
import { MoveRight } from "lucide-react";

export default function ProjectCards({
  blurredImage,
  index,
  locale,
  project,
  statusText,
}: {
  project: Project;
  blurredImage: string;
  index: number;
  locale: string;
  statusText: string;
}) {
  const title = project.title[locale as "en" | "tr"];
  const description = project.description[locale as "en" | "tr"];

  return (
    <Reveal delay={Math.min(index * 0.06, 0.24)}>
      <Link href={getProjectHref(locale, project.endpoint)} className="group block">
        <Surface className="grid overflow-hidden transition-colors hover:border-cyan-300/40 lg:grid-cols-[minmax(0,420px)_1fr]">
          <div className="relative min-h-64 overflow-hidden lg:min-h-80">
              <Image
                fill={true}
                alt={project.images[0].alt}
                blurDataURL={blurredImage}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                placeholder="blur"
                quality={90}
                sizes="(min-width: 1024px) 420px, 100vw"
                src={project.images[0].src}
              />
            <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
          </div>
          <div className="flex min-h-full flex-col gap-6 p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <StatusBadge status={project.status}>{statusText}</StatusBadge>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold leading-tight text-foreground">
                {title}
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                {description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.slice(0, 6).map((tech) => (
                <TechPill key={tech.name}>{tech.name}</TechPill>
              ))}
            </div>
            <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">
              {locale === "tr" ? "Projeyi incele" : "View project"}
              <MoveRight
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
                size={18}
              />
            </span>
          </div>
        </Surface>
      </Link>
    </Reveal>
  );
}
