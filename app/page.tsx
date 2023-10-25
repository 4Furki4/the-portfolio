import React from "react";
import Intro from "@/components/Pages/Intro";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Furkan Cengiz",
  description: "Furkan Cengiz's personal website and portfolio",
};

export default function Page() {
  return <Intro />;
}
