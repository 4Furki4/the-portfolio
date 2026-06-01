"use client";
import React from "react";
import ParticleContextProvider from "./providers/ParticleContextProvider";
import { ThemeProvider as NextThemesProvider } from "next-themes";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark">
      <ParticleContextProvider>{children}</ParticleContextProvider>
    </NextThemesProvider>
  );
}
