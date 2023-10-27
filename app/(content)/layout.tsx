import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Furkan Cengiz",
  description: "Furkan Cengiz's personal website",
  verification: {
    google: "UpopIbvkgl0RnymsLDx4DCa1TcEIIqQkOBnkvAm_xz0",
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

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="mb-auto max-md:z-50">{children}</main>;
}
