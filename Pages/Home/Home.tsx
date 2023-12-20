"use client";
import React from "react";
import { motion } from "framer-motion";
import TechIcons from "@/Pages/Home/TechIcons";
import Link from "next/link";
export default function Home({
  className,
  title,
  subtitle,
  projectsLinkText,
}: Record<"title" | "subtitle" | "projectsLinkText", string> & {
  className?: string;
}) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 },
  };
  const MotionedLink = motion(Link);
  return (
    <motion.main
      initial="hidden"
      animate="show"
      variants={container}
      className={`flex flex-col my-auto h-full w-11/12 max-sm:mx-auto sm:w-full text-center p-10 z-10 pointer-events-none gap-6 items-center justify-center ${className}`}
    >
      <motion.h1
        variants={item}
        className="text-fs-700 lg:text-fs-900 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-purple-900 bg-300% animate-flow-gradient"
      >
        {title}
      </motion.h1>
      <motion.h2
        variants={item}
        className="text-fs-500 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-purple-900 bg-300% animate-flow-gradient"
      >
        {subtitle}
      </motion.h2>
      <motion.figure
        variants={item}
        className="grid grid-cols-5 items-center justify-center sm:flex gap-2"
      >
        <TechIcons />
      </motion.figure>
      <MotionedLink
        className="md:hidden text-fs-400 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-purple-900 bg-300% animate-flow-gradient pointer-events-auto"
        variants={item}
        href={"/projects"}
      >
        {projectsLinkText}
      </MotionedLink>
    </motion.main>
  );
}
