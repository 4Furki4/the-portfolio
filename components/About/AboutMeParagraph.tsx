"use client";
import React from "react";
import { motion } from "framer-motion";
const firstParagraph = `To give you a brief background, I initially pursued Industrial Engineering in AGU, but my passion for software development led me to build games instead. I then decided to focus on backend development first and later on, added frontend development to my skill set.`;

const secondParahraph = `After gaining some experience with Unity to develop games, I decided to learn .NET. The reason I shifted to web development is to build an online modern Turkish dictionary from scratch. The official dictionary lacks many features and I'm a fan of Turkish words and their roots. Initially, I developed multi-page applications but found it unsatisfying. Then, I discovered .NET APIs and became enamored with the simplicity of sending required data and using them however we want. Later on, I delved into client-side learning and studied HTML, CSS, and JavaScript. Honestly, I struggled initially since I lacked proper resources. However, I was fortunate to be accepted into the Frontend Web Development BootCamp of Recoded. `;

const thirdParagraph = `During the bootcamp, I not only improved my Frontend skills but also learned how to collaborate with teammates, provide feedback, manage time, and more. Furthermore, I honed my self-taught skills since our teachers encouraged us to self-teach.`;

const forthParagraph = `In this adventure, I made mistakes, and I will. I learned making mistakes is not what I should be afraid of. What I should be afraid of is being afraid of making mistakes which just means that I might not like what I do.`;

const container = {
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
    },
  },
  hidden: {
    y: 20,
    opacity: 0,
    transition: {
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
