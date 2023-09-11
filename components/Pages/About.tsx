"use client";
import Image from "next/image";
import React from "react";
import { AboutMeParagraph } from "../About/AboutMeParagraph";
import { motion } from "framer-motion";
import Education from "../About/Education";
export default function About() {
  return (
    <div className="grid gap-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={"/pics/furkan.png"}
          width={3066}
          height={1720}
          alt={"Furkan Cengiz"}
          sizes="(min-width: 768px) 90vw, 75vw"
          quality={100}
          className="rounded-lg"
        />
      </motion.div>
      <AboutMeParagraph />
      <Education />
    </div>
  );
}
