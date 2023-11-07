import React from "react";
import { Metadata } from "next";
import { GeistSans } from "geist/font";
import Home from "@/Pages/Home/Home";

export default function Page() {
  return <Home className={`${GeistSans.className}`} />;
}
