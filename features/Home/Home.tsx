"use client";
import React from "react";
import Link from "next/link";
import { GitPullRequest, Link2, Mail } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import tsIcon from "@/public/svgs/ts.svg";
import reactIcon from "@/public/svgs/react.svg";
import nextIcon from "@/public/svgs/next.svg";
import tailwindIcon from "@/public/svgs/tailwind.svg";
import mongodbIcon from "@/public/svgs/mongodb.svg";
import gitIcon from "@/public/svgs/git.svg";
import trpc from "@/public/svgs/trpc.svg";
import drizzle from "@/public/svgs/drizzle-orm.png";
import postgresIcon from "@/public/svgs/postgres.svg"
interface Skill {
  name: string;
  icon: StaticImageData;
}

const skills: Skill[] = [
  { name: "TypeScript", icon: tsIcon },
  { name: "React", icon: reactIcon },
  { name: "Next.js", icon: nextIcon },
  { name: "tRPC", icon: trpc },
  { name: "Tailwind CSS", icon: tailwindIcon },
  { name: "Drizzle ORM", icon: drizzle },
  { name: "PostgreSQL", icon: postgresIcon },
  { name: "MongoDB", icon: mongodbIcon },
  { name: "Git", icon: gitIcon },
];

export default function Home({
  className,
  title,
  subtitle,
  projectsLinkText,
  role,
}: Record<"title" | "subtitle" | "projectsLinkText" | "role", string> & {
  className?: string;
}) {
  const socialLinks = [
    { icon: <GitPullRequest className="w-6 h-6" />, href: "https://github.com/4Furki4" },
    { icon: <Link2 className="w-6 h-6" />, href: "https://www.linkedin.com/in/4furkancengiz4/" },
    { icon: <Mail className="w-6 h-6" />, href: "mailto:muhammedcengiz1@gmail.com" },
  ];

  return (
    <main
      className={`relative my-auto h-full w-full px-3 py-4 sm:px-10 sm:py-10 z-20 gap-6 items-center justify-center ${className ?? ""}`}
    >
      {/* Hero Section */}
      <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left Column - Main Content */}
        <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <div className="inline-block">
              <span className="text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-primary/20 bg-primary/5">
                {role}
              </span>
            </div>

            <div className="overflow-hidden">
              <div className="w-fit mx-auto lg:mx-0">
                <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  {title}
                </h1>
              </div>
            </div>

            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
              {subtitle}
            </p>
          </div>

          <div className="flex gap-3 sm:gap-4 pointer-events-auto justify-center lg:justify-start">
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-2.5 md:p-3 rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors"
              >
                {link.icon}
              </Link>
            ))}
          </div>

          <div className="pointer-events-auto flex justify-center lg:justify-start">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full bg-gradient-to-r from-red-700 to-purple-900 text-white font-medium hover:opacity-90 transition-opacity text-xs sm:text-sm md:text-base"
            >
              {projectsLinkText}
            </Link>
          </div>
        </div>

        {/* Right Column - Animated Code Block */}
        <div className="relative mt-8 lg:mt-0">
          <div className="absolute inset-0 bg-gradient-to-r from-red-700/20 to-purple-900/20 blur-3xl" />
          <div>
            <pre className="relative backdrop-blur-sm rounded-lg p-3 sm:p-4 md:p-6 border border-primary/20 bg-primary/5 overflow-x-auto text-[10px] xs:text-xs sm:text-sm">
              <code className="font-mono whitespace-pre-wrap break-words">
                <span className="text-blue-400">const</span>{" "}
                <span className="text-yellow-400">developer</span> = {"{"}
                <br />
                {"  "}name: <span className="text-green-400">{"\"Furkan\""}</span>,
                <br />
                {"  "}role: <span className="text-green-400">{"\"Full Stack Developer\""}</span>,
                <br />
                {"  "}skills: {"["}
                {skills.map((skill, index) => (
                  <React.Fragment key={skill.name}>
                    <br />
                    {"    "}<span className="text-green-400">{`"${skill.name}"`}</span>
                    {index !== skills.length - 1 && ","}
                    {skill.icon && (
                      <Image
                        src={skill.icon}
                        alt={`${skill.name} icon`}
                        width={14}
                        height={14}
                        className="inline-block ml-2 -translate-y-0.5"
                      />
                    )}
                  </React.Fragment>
                ))}
                <br />
                {"]"},
                <br />
                {"  "}passion: <span className="text-green-400">{"\"Building amazing web experiences\""}</span>
                <br />
                {"}"};
              </code>
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}
