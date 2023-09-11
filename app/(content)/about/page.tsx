import About from "@/components/Pages/About";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "About",
  description: "About page containing contact information and a short bio.",
};

export default function page() {
  return (
    <div className="relative z-50 my-16 mx-auto max-w-6xl p-6 backdrop-blur-xs">
      <About />
    </div>
  );
}
