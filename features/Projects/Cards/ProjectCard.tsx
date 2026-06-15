"use client";
import React from "react";
import {
  ExternalLink,
  GitPullRequest,
  Images,
  Layers,
  MonitorUp,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Fancybox from "@/components/FancyBox";
import {
  ActionLink,
  SectionHeader,
  StatusBadge,
  Surface,
  TechPill,
} from "@/components/portfolio/Primitives";

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
  return (
    <article className="space-y-8">
      <header className="grid gap-6 border-b border-white/10 pb-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <SectionHeader
          description={project.description[locale as "en" | "tr"]}
          eyebrow={locale === "tr" ? "Proje detayi" : "Project detail"}
          title={project.title[locale as "en" | "tr"]}
        />
        <div className="flex flex-col gap-3 lg:items-end">
          <StatusBadge status={project.status}>{status}</StatusBadge>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            {project.repoLink ? (
              <ActionLink external href={project.repoLink} variant="secondary">
                <GitPullRequest aria-hidden size={16} />
                {repoLinkText}
              </ActionLink>
            ) : null}
            {project.demoLink ? (
              <ActionLink external href={project.demoLink}>
                <MonitorUp aria-hidden size={16} />
                {liveLinkText}
              </ActionLink>
            ) : null}
          </div>
        </div>
      </header>

      <Surface className="overflow-hidden">
        <Fancybox
          className="space-y-4 p-3 sm:p-4"
          options={{
            Carousel: {
              infinite: true,
            },
          }}
        >
          <>
            <a
              className="group relative block overflow-hidden rounded-lg"
              data-fancybox="gallery"
              href={project.images[0].src}
            >
              <Image
                alt={project.images[0].alt}
                blurDataURL={blurredImage}
                className="h-auto w-full cursor-zoom-in object-cover transition-transform duration-700 group-hover:scale-[1.015]"
                height={1080}
                placeholder="blur"
                priority
                src={project.images[0].src}
                unoptimized
                width={1920}
              />
            </a>
            {project.images.length > 1 ? (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {project.images.slice(1).map((image, index) => (
                  <a
                    className="group relative block overflow-hidden rounded-lg border border-white/10"
                    data-fancybox="gallery"
                    href={image.src}
                    key={index}
                  >
                    <Image
                      alt={image.alt}
                      className="aspect-video h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      height={1080}
                      src={image.src}
                      unoptimized
                      width={1920}
                    />
                  </a>
                ))}
              </div>
            ) : null}
          </>
        </Fancybox>
      </Surface>

      <div className="grid gap-5 lg:grid-cols-[1.4fr_0.8fr]">
        <Surface className="p-5 sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <Layers aria-hidden className="text-teal-200" size={20} />
            <h2 className="text-2xl font-semibold text-foreground">{techStack}</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <TechPill href={tech.url} key={tech.name}>
                {tech.name}
              </TechPill>
            ))}
          </div>
        </Surface>
        <Surface className="p-5 sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            {project.contributors ? (
              <Users aria-hidden className="text-rose-200" size={20} />
            ) : (
              <Images aria-hidden className="text-rose-200" size={20} />
            )}
            <h2 className="text-2xl font-semibold text-foreground">
              {project.contributors ? contributors : locale === "tr" ? "Bağlantılar" : "Links"}
            </h2>
          </div>
          {project.contributors ? (
            <div className="grid gap-2">
              {project.contributors.map((contributor) => (
                <Link
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-teal-300/40 hover:text-foreground"
                  href={contributor.github}
                  key={contributor.github}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {contributor.name}
                  <ExternalLink aria-hidden size={14} />
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-6 text-muted-foreground">
              {locale === "tr"
                ? "Kaynak kodu ve canlı demo bağlantıları sayfanın üst kısmında."
                : "Source and live demo links are available in the page header."}
            </p>
          )}
        </Surface>
      </div>
    </article>
  );
}
