"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import BackgroundParticles from "@/components/particles/BackgroundParticles";
// import Navbar from "@/components/Navbar";
import { NextUIProvider } from "@nextui-org/react";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Navbar from "@/components/Navbar";
const inter = Inter({ subsets: ["latin"] });

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
        className={`${inter.className} w-full min-h-screen transition-colors duration-300 text-foreground bg-background relative`}
      >
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            <div className="min-h-screen flex flex-col justify-center">
              <Navbar
                path={path}
                particles={particles}
                setParticles={handleParticles}
              />
              {children}
              {particles && (
                <div className="w-full min-h-screen absolute top-0 left-0">
                  <BackgroundParticles />
                </div>
              )}
              <Footer />
            </div>
          </NextThemesProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
