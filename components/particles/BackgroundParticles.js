import React, { useCallback } from "react";
import Particles from "react-particles";
import particlesConfig from "./config";
import { loadSlim } from "tsparticles-slim";
export default function BackgroundParticles() {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      width="100vw"
      height="100vh"
      options={particlesConfig}
    />
  );
}
