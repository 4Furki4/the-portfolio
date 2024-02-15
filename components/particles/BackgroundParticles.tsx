"use client";
import React, { useCallback } from "react";
import Particles from "react-particles";
import particlesConfig from "./config";
import { loadSlim } from "tsparticles-slim";
import { useParticleContext } from "@/context/ParticleContext";
import { Container, Engine } from "tsparticles-engine";
export default function BackgroundParticles() {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container?: Container) => {
    await console.log(container);
  }, []);
  const particles = useParticleContext();

  return (
    particles && (
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        style={{ minHeight: "100dvh", width: "100%" }}
        options={particlesConfig}
      />
    )
  );
}
