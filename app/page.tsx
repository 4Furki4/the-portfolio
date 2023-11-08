import React from "react";
import { GeistSans } from "geist/font";
import Home from "@/Pages/Home/Home";

export default function Page() {
  return <Home className={`${GeistSans.className}`} />;
}
