"use client";
import React from "react";
import Link from "next/link";
import { GitPullRequest, Link2, Mail, MoveRight } from "lucide-react";
import Image from "next/image";
import Reveal from "@/components/portfolio/Reveal";
import {
  ActionLink,
  Eyebrow,
  StatusBadge,
  Surface,
  TechPill,
} from "@/components/portfolio/Primitives";
import { getLocalizedHref, getProjectHref } from "@/lib/localizedPath";

export type HomeProject = {
  title: string;
  description: string;
  endpoint: string;
  src: string;
  alt: string;
  status: Project["status"];
  statusText: string;
  techStack: string[];
};

export default function Home({
  className,
  title,
  subtitle,
  projectsLinkText,
  role,
  locale,
  featuredProjects,
}: Record<"title" | "subtitle" | "projectsLinkText" | "role", string> & {
  className?: string;
  locale: string;
  featuredProjects: HomeProject[];
}) {
  const socialLinks = [
    {
      icon: <GitPullRequest aria-hidden size={18} />,
      href: "https://github.com/4Furki4",
      label: "GitHub",
    },
    {
      icon: <Link2 aria-hidden size={18} />,
      href: "https://www.linkedin.com/in/4furkancengiz4/",
      label: "LinkedIn",
    },
    {
      icon: <Mail aria-hidden size={18} />,
      href: "mailto:muhammedcengiz1@gmail.com",
      label: "Email",
    },
  ];
  const leadProject = featuredProjects[0];
  const skillHighlights =
    locale === "tr"
      ? ["TypeScript", "PostgreSQL", "Kendi altyapım"]
      : ["TypeScript", "PostgreSQL", "Self-hosted"];

  return (
    <main
      className={`relative z-20 flex w-full flex-1 overflow-hidden px-4 py-10 sm:px-6 lg:px-8 ${className ?? ""}`}
    >
      <section className="mx-auto grid min-h-[calc(100svh-9rem)] w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,520px)] lg:items-center">
        <Reveal className="max-w-4xl space-y-8">
          <div className="space-y-5">
            <Eyebrow>{role}</Eyebrow>
            <h1 className="max-w-4xl text-6xl font-semibold leading-[0.86] tracking-normal text-foreground sm:text-7xl lg:text-8xl">
              {title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              {subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <ActionLink href={getLocalizedHref("/projects", locale)}>
              {projectsLinkText}
            </ActionLink>
            <ActionLink href="mailto:muhammedcengiz1@gmail.com" variant="secondary">
              {locale === "tr" ? "İletişime geç" : "Get in touch"}
            </ActionLink>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {socialLinks.map((link) => (
              <Link
                aria-label={link.label}
                className="grid size-11 place-items-center rounded-lg border border-white/10 bg-white/[0.045] text-muted-foreground transition-colors hover:border-teal-300/50 hover:text-teal-100"
                href={link.href}
                key={link.href}
                rel="noopener noreferrer"
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              >
                {link.icon}
              </Link>
            ))}
          </div>

          <div className="grid max-w-3xl gap-3 border-t border-white/10 pt-6 sm:grid-cols-3">
            {skillHighlights.map((skill) => (
              <div
                className="rounded-lg border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-semibold text-foreground/90"
                key={skill}
              >
                {skill}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="space-y-4" delay={0.12}>
          <Surface className="overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                {locale === "tr" ? "Öne Çıkan Proje" : "Featured project"}
              </span>
              <StatusBadge status={leadProject.status}>
                {leadProject.statusText}
              </StatusBadge>
            </div>
            <Link
              className="group block"
              href={getProjectHref(locale, leadProject.endpoint)}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  alt={leadProject.alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                  fill
                  priority
                  sizes="(min-width: 1024px) 520px, 100vw"
                  src={leadProject.src}
                />
              </div>
              <div className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold leading-tight text-foreground">
                      {leadProject.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                      {leadProject.description}
                    </p>
                  </div>
                  <MoveRight
                    aria-hidden
                    className="mt-1 shrink-0 text-teal-200 transition-transform group-hover:translate-x-1"
                    size={22}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {leadProject.techStack.slice(0, 4).map((tech) => (
                    <TechPill key={tech}>{tech}</TechPill>
                  ))}
                </div>
              </div>
            </Link>
          </Surface>

          <div className="grid gap-2">
            {featuredProjects.slice(1, 3).map((project) => (
              <Link
                className="group flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:border-rose-300/40 hover:text-foreground"
                href={getProjectHref(locale, project.endpoint)}
                key={project.endpoint}
              >
                {project.title}
                <MoveRight
                  aria-hidden
                  className="text-rose-200 transition-transform group-hover:translate-x-1"
                  size={18}
                />
              </Link>
            ))}
          </div>
        </Reveal>
      </section>
    </main>
  );
}
