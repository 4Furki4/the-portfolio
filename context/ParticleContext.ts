"use client";
import { createContext, useContext } from "react";

export const ParticleContext = createContext({
  particles: true,
  handleParticles: (particles: boolean) => {},
});

export const useParticleContext = () => useContext(ParticleContext);
