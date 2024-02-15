"use client";
import React, { useEffect } from "react";
import { ParticleContext, ParticleContextHandler } from "../ParticleContext";

export default function ParticleContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [particles, setParticles] = React.useState<boolean>(true);
  const handleParticles = () => {
    localStorage.setItem("particles", particles ? "false" : "true");
    setParticles((prev) => !prev);
    return !particles
  };
  useEffect(() => {
    const particles = localStorage.getItem("particles");
    if (particles === "false") {
      setParticles(false);
    }
  }, []);
  return (
    <ParticleContext.Provider value={particles}>
      <ParticleContextHandler.Provider value={handleParticles}>
        {children}
      </ParticleContextHandler.Provider>
    </ParticleContext.Provider>
  );
}
