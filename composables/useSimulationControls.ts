import { reactive } from "vue";
import type { SimulationSettings } from "~/types/settings";

export function useSimulationControls() {
  return reactive({
    flockSize: {
      label: "Flock Size",
      min: 10,
      max: 1000,
      step: 10,
    },
    speed: {
      label: "Speed",
      min: 0.5,
      max: 10,
      step: 0.1,
    },
    separationWeight: {
      label: "Separation",
      min: 0,
      max: 3,
      step: 0.1,
    },
    alignmentWeight: {
      label: "Alignment",
      min: 0,
      max: 3,
      step: 0.1,
    },
    cohesionWeight: {
      label: "Cohesion",
      min: 0,
      max: 3,
      step: 0.1,
    },
    perceptionRadius: {
      label: "Perception Radius",
      min: 20,
      max: 100,
      step: 5,
    },
    mouseInfluenceRadius: {
      label: "Mouse Influence Radius",
      min: 50,
      max: 200,
      step: 10,
    },
  });
}
