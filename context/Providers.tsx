"use client";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import ParticleContextProvider from "./providers/ParticleContextProvider";
import { ThemeProvider as NextThemesProvider } from "next-themes";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <ParticleContextProvider>{children}</ParticleContextProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
