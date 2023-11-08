import React from "react";
import { Metadata } from "next";
import Projects from "@/Pages/Projects/Projects";
export const metadata: Metadata = {
  title: "Projects",
  description: "Furkan Cengiz's projects with source code and live demos",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/projects",
    title: "Projects | Furkan Cengiz",
    description: "Furkan Cengiz's projects with source code and live demos",
  },
  alternates: {
    canonical: "/projects",
  },
};

export default async function Page() {
  return <Projects />;
}
