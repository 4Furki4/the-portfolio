"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MousePointerClick } from "lucide-react";

const container = {
  hide: {
    opacity: 0,
    transition: {
      staggerDirection: -1,
    },
  },
  show: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.2,
    },
  }),
};

export default function ProjectCards({
  projectsData,
}: {
  projectsData: Project[];
}) {
  const router = useRouter();
  return (
    <>
      {projectsData.map((project, index) => (
        <motion.section
          variants={container}
          initial="hide"
          animate="show"
          custom={index}
          key={index}
          className="h-full mx-auto"
        >
          <Card
            onPress={() => router.push(`/projects/${project.endpoint}`)}
            isBlurred
            isFooterBlurred
            isPressable
            className="shadow-lg drop backdrop-blur-xs transition-[background-color] duration-300 relative z-20 h-full"
          >
            <figure>
              <Image
                src={project.images[0].src}
                alt={project.images[0].alt}
                width={800}
                height={600}
                className="w-full object-contain relative"
              />
            </figure>
            <CardFooter className="justify-center shadow-small h-full">
              <h2 className="text-fs-400">{project.title}</h2>
            </CardFooter>
          </Card>
        </motion.section>
      ))}
    </>
  );
}
