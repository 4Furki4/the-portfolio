import { Metadata } from "next";
import React from "react";
import { GeistMono, GeistSans } from "geist/font";
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
  metadataBase: new URL("https://furkancengiz.software"),
  alternates: {
    canonical: "/",
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
    url: "/",
    title: "Furkan Cengiz",
    description: "Furkan Cengiz's personal website",
  },
};

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={`${GeistSans.className} mb-auto z-20`}>{children}</main>
  );
}
