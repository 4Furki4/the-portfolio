"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  firstParagraph,
  forthParagraph,
  secondParahraph,
  thirdParagraph,
} from "@/db/static/aboutme";
const container = {
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
      staggerChildren: 0.15,
    },
  },
  hidden: {
    y: 20,
    opacity: 0,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
      staggerChildren: 0.15,
    },
  },
};

export const AboutMeParagraph = () => {
  return (
    <motion.article>
      <motion.h1
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="my-4 text-fs-700 font-bold"
      >{`My Adventure`}</motion.h1>
      <section className="flex flex-col gap-4 text-fs-300">
        <motion.p
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {firstParagraph}
        </motion.p>
        <motion.p
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {secondParahraph}
        </motion.p>
        <motion.p
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {thirdParagraph}
        </motion.p>
        <motion.p
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {forthParagraph}
        </motion.p>
      </section>
    </motion.article>
  );
};
