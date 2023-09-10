"use client";
import Image from "next/image";
import React from "react";
import { AboutMeParagraph } from "../About/AboutMeParagraph";
import { motion } from "framer-motion";
export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="grid gap-8"
    >
      <Image
        src={"/pics/furkan.jpg"}
        width={3066}
        height={1725}
        alt={"Furkan Cengiz"}
        sizes="(min-width: 768px) 50vw, 100vw"
        quality={90}
        className="rounded-lg"
      />
      <AboutMeParagraph />
    </motion.div>
  );
}
