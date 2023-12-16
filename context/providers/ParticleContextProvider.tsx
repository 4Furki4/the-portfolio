"use client";
import React, { useEffect } from "react";
import { ParticleContext } from "../ParticleContext";

export default function ParticleContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [particles, setParticles] = React.useState<boolean>(true);
  const handleParticles = () => {
    localStorage.setItem("particles", particles ? "false" : "true");
    setParticles((prev) => !prev);
  };
  useEffect(() => {
    const particles = localStorage.getItem("particles");
    if (particles === "false") {
      setParticles(false);
    }
  }, []);
  return (
    <ParticleContext.Provider value={{ particles, handleParticles }}>
      {children}
    </ParticleContext.Provider>
  );
}
