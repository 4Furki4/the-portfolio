"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { format } from "date-fns";
import { motion } from "framer-motion";
import { SchoolIcon } from "lucide-react";

type Education = {
  title: string;
  place: string;
  description: string;
  yearStart: Date;
  yearEnd?: Date;
};
const variants = {
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.25,
    },
  }),
  hidden: (i: number) => ({
    opacity: 0,
    x: -10,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
    },
  }),
};

const educations: Education[] = [
  {
    title: "Frontend Web Development BootCamp",
    place: "Recoded",
    description:
      "I learned how to collaborate with teammates, provide feedback, manage time, and more. Furthermore, I honed my self-taught skills since our teachers encouraged us to self-teach.",
    yearStart: new Date(2023, 2, 5),
    yearEnd: new Date(2023, 8, 5),
  },
  {
    title: "Industrial Engineering",
    place: "Abdullah Gul University",
    description:
      "Completed the prep school and left the university at the end of the first year.",
    yearStart: new Date(2021, 9, 5),
    yearEnd: new Date(2022, 6, 15),
  },
];
export default function Education() {
  return (
    <section className="grid relative gap-4 after:w-1 after:h-full after:absolute dark:after:bg-white after:bg-black after:right-0 after:z-0">
      <h2 className="text-fs-600 font-bold">Education</h2>
      <div className="grid gap-4 relative">
        {educations.map((education, i) => (
          <motion.article
            aria-description="styling element"
            custom={i}
            variants={variants}
            initial="hidden"
            whileInView={"visible"}
            viewport={{ once: true, amount: 0.25 }}
            key={i}
            className="relative mr-8 inline"
          >
            <Card className="backdrop-blur-xs bg-opacity-60 dark:bg-opacity-60 flex flex-col">
              <CardHeader>
                <CardTitle>{education.title}</CardTitle>
              </CardHeader>
              <CardContent className="">
                <p className="font-bold fs-300">{education.place}</p>
                <p className="fs-300">{education.description}</p>
              </CardContent>
              <CardFooter className="mt-auto">
                <time className="fs-300">
                  {format(education.yearStart, "dd.MM.yyyy")} -{" "}
                  {education.yearEnd
                    ? format(education?.yearEnd, "dd.MM.yyyy")
                    : "Present"}
                </time>
              </CardFooter>
            </Card>
            <figure className="absolute -right-14 top-0 z-50 bg-gray-200 dark:bg-gray-600 rounded-full p-2">
              <SchoolIcon className="w-8 h-8" />
            </figure>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
