import About from "@/Pages/About/About";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "About",
  description: "About page containing contact information and a short bio.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/about",
    title: "About | Furkan Cengiz",
    description: "About page containing contact information and a short bio.",
  },
  alternates: {
    canonical: "/about",
    languages: {
      en: "/about",
      tr: "/tr/hakkinda",
    },
  },
};

export default function page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return <About locale={locale} />;
}
