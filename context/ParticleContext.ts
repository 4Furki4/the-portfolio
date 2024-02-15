"use client";
import { createContext, useContext } from "react";

export const ParticleContext = createContext<boolean | null>(null);
export const ParticleContextHandler = createContext<(() => boolean) | null>(null)
export const useParticleContextHandler = () => useContext(ParticleContextHandler);
export const useParticleContext = () => useContext(ParticleContext);
