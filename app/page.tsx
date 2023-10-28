import React from "react";
import Intro from "@/components/Pages/Intro";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Furkan Cengiz",
  description: "Furkan Cengiz's personal website and portfolio",
  verification: {
    google: "6MHP_v7v_6AanMTrqnMHnFGPcHO-IcUl2l3tphvqFnM",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      follow: true,
      index: true,
    },
  },
  keywords: [
    "Furkan Cengiz",
    "Furkan Cengiz Portfolio",
    "Furkan Cengiz Website",
    "Portfolio",
    "Furki",
    "Furki4_4",
    "Developer",
    "Software Engineer",
    "Software Developer",
    "Web Developer",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://furki.vercel.app",
    title: "Furkan Cengiz",
    description: "Furkan Cengiz's personal website",
  },
};

export default function Page() {
  return <Intro />;
}
