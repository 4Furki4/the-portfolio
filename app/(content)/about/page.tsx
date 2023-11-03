import About from "@/components/Pages/About";
import { getBase64 } from "@/lib/getBase64ImageUrl";
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
  },
};

export default async function page() {
  const blurredImage = await getBase64("pics/furkan.png");
  return <About blurredImage={blurredImage} />;
}
