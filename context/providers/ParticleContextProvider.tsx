"use client";
import React from "react";
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
  return (
    <ParticleContext.Provider value={{ particles, handleParticles }}>
      {children}
    </ParticleContext.Provider>
  );
}
