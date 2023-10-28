import About from "@/components/Pages/About";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "About",
  description: "About page containing contact information and a short bio.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://furki.vercel.app/about",
    title: "About",
    description: "About page containing contact information and a short bio.",
  },
};

export default function page() {
  return <About />;
}
