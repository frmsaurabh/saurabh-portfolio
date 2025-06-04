import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="absolute inset-0 z-0">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "#0a192f",
            },
          },
          particles: {
            color: { value: "#64ffda" },
            links: {
              color: "#64ffda",
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1,
            },
            number: { value: 40 },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
        }}
      />
    </div>
  );
}
