"use client";
import "./globals.css";
import msClarity from "../lib/mClarity";
import BackgroundParticles from "@/components/particles/BackgroundParticles";
import { NextUIProvider } from "@nextui-org/react";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    console.log(localStorage);
    const particles = localStorage.getItem("particles");
    if (particles === null) {
      setParticles(true);
      return;
    }
    if (particles === "true") {
      setParticles(true);
      return;
    }
    setParticles(false);
  }, []);
  const [particles, setParticles] = React.useState<boolean>(true);
  function handleParticles() {
    localStorage.setItem("particles", particles ? "false" : "true");
    setParticles((prev) => !prev);
  }
  const path = usePathname();
  return (
    <html lang="en" className="dark">
      <body
        className={`w-full min-h-screen transition-colors duration-300 text-foreground bg-background relative`}
      >
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            <div
              aria-description="styling element"
              className="min-h-screen flex flex-col justify-center"
            >
              <Navbar
                path={path}
                particles={particles}
                setParticles={handleParticles}
              />
              {children}
              <Analytics />
              {particles && (
                <div
                  aria-description="particle background"
                  className="w-full min-h-screen absolute top-0 left-0"
                >
                  <BackgroundParticles />
                </div>
              )}
              <Footer />
            </div>
          </NextThemesProvider>
        </NextUIProvider>
      </body>
      <Script id="microsoft-clarity">{msClarity}</Script>
    </html>
  );
}
