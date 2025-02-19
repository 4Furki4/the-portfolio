import React from "react";
import Image from "next/image";
import tsIcon from "@/public/svgs/ts.svg";
import nextIcon from "@/public/svgs/next.svg";
import reactIcon from "@/public/svgs/react.svg";
import postgresIcon from "@/public/svgs/postgres.svg";
import nodejsIcon from "@/public/svgs/nodejs.svg";
import mongodb from "@/public/svgs/mongodb.svg";
import tailwind from "@/public/svgs/tailwind.svg";
import goIcon from "@/public/svgs/go.svg";

interface TechItem {
  name: string;
  icon: any;
  category: "frontend" | "backend" | "database" | "language";
}

const techStack: TechItem[] = [
  { name: "TypeScript", icon: tsIcon, category: "language" },
  { name: "Go", icon: goIcon, category: "language" },
  { name: "React", icon: reactIcon, category: "frontend" },
  { name: "Next.js", icon: nextIcon, category: "frontend" },
  { name: "Node.js", icon: nodejsIcon, category: "backend" },
  { name: "PostgreSQL", icon: postgresIcon, category: "database" },
  { name: "MongoDB", icon: mongodb, category: "database" },
  { name: "Tailwind CSS", icon: tailwind, category: "frontend" },
];

export default function TechIcons() {
  return (
    <>
      {techStack.map((tech, index) => (
        <div
          key={tech.name}
          className="group relative flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-300 hover:bg-primary/5"
        >
          <Image
            alt={`${tech.name} Icon`}
            src={tech.icon}
            width={300}
            height={100}
            className="w-max-w w-full transition-transform duration-300 group-hover:scale-110"
          />
          <span className="absolute -bottom-2 opacity-0 group-hover:opacity-100 group-hover:bottom-0 text-sm font-medium transition-all duration-300">
            {tech.name}
          </span>
        </div>
      ))}
    </>
  );
}
