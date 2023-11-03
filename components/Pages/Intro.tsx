"use client";
import React from "react";
import { motion } from "framer-motion";
import TechIcons from "../TechIcons";
import { cn } from "@/lib/utils";
export default function Intro({ className }: { className?: string }) {
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
  return (
    <motion.main
      initial="hidden"
      animate="show"
      variants={container}
      className={cn(
        "h-full w-11/12 max-sm:mx-auto sm:w-full grid items-center justify-center text-center my-auto md:my-auto p-10 z-10 pointer-events-none",
        className
      )}
    >
      <motion.h1
        variants={item}
        className="text-fs-700 lg:text-fs-900 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-purple-900 bg-300% animate-flow-gradient"
      >
        {"Hello World, It's Furkan!"}
      </motion.h1>
      <motion.h2
        variants={item}
        className="text-fs-500 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-purple-900 bg-300% animate-flow-gradient my-6"
      >
        {"I'm a fullstack web developer."}
      </motion.h2>
      <motion.figure
        variants={item}
        className="grid grid-cols-4 items-center justify-center sm:flex gap-2"
      >
        <TechIcons />
      </motion.figure>
    </motion.main>
  );
}
