import React from "react";
import Image from "next/image";
import Link from "next/link";
import Tag from "@/components/Tag";
import Reveal from "@/components/portfolio/Reveal";
import { SectionHeader, Surface } from "@/components/portfolio/Primitives";

export default function TakenCourses({
  takenCourses,
  coursePage,
  description,
  title,
}: {
  takenCourses: TakenCourses[];
  coursePage: string;
  description: string;
  title: string;
}) {
  return (
    <section className="grid gap-6">
      <SectionHeader
        description={description}
        eyebrow="03 / Stack"
        title={title}
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {takenCourses.map((takenCourse, index) => (
          <Reveal delay={Math.min(index * 0.04, 0.2)} key={takenCourse.courseTitle}>
            <Surface className="flex h-full flex-col overflow-hidden transition-colors hover:border-teal-300/40">
              <div className="relative aspect-video w-full border-b border-white/10">
                <Image
                  alt={takenCourse.courseTitle}
                  className="h-full w-full object-cover"
                  fill
                  sizes="(min-width: 1280px) 380px, (min-width: 768px) 50vw, 100vw"
                  src={takenCourse.image}
                />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-5">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold leading-tight text-foreground">
                    {takenCourse.courseTitle}
                  </h3>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {takenCourse.summarize}
                  </p>
                  <Link
                    className="inline-flex text-sm font-semibold text-teal-200 transition-colors hover:text-teal-100"
                    href={takenCourse.courseLink}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {coursePage}
                  </Link>
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  {takenCourse.tags.map((tag) => (
                    <Tag key={tag} tag={tag} />
                  ))}
                </div>
              </div>
            </Surface>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
