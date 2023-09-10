import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Furkan Cengiz",
  description: "Furkan Cengiz's personal website",
  robots: "all",
};

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mb-auto max-md:z-50">{children}</div>;
}
