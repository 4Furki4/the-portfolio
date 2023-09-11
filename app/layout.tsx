"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import BackgroundParticles from "@/components/particles/BackgroundParticles";
import Navbar from "@/components/Navbar";
import { ThemeContext } from "@/context/ThemeContext";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
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
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const [particles, setParticles] = React.useState<boolean>(true);
  function handleParticles() {
    localStorage.setItem("particles", particles ? "false" : "true");
    setParticles(!particles);
  }
  const path = usePathname();
  return (
    <html lang="en" className="">
      <body
        className={`${inter.className} w-full min-h-screen transition-colors duration-300 text-foreground bg-background relative`}
      >
        <ThemeContext.Provider value={theme}>
          <div className="min-h-screen flex flex-col justify-center">
            <Navbar
              setTheme={setTheme}
              theme={theme}
              setParticles={handleParticles}
              particles={particles}
              path={path}
            />
            {children}
            {particles && (
              <div className="w-full min-h-screen absolute top-0 left-0">
                <BackgroundParticles />
              </div>
            )}
            <Footer />
          </div>
        </ThemeContext.Provider>
      </body>
    </html>
  );
}
