import { ref, onMounted, onUnmounted, watch } from "vue";
import type { Boid } from "~/types/boid";
import type { SimulationSettings } from "~/types/settings";
import { createBoid } from "~/utils/boidFactory";
import { updateBoid } from "~/utils/boidBehavior";
import { renderBoid, clearCanvas } from "~/utils/render";
import { useCanvas } from "./useCanvas";
import { useMouseTracking } from "./useMouseTracking";

export function useFlockingSimulation(
  canvasRef: Ref<HTMLCanvasElement | null>
) {
  const boids = ref<Boid[]>([]);
  const settings = ref<SimulationSettings>({
    flockSize: 100,
    speed: 2,
    separationWeight: 1.5,
    alignmentWeight: 1.0,
    cohesionWeight: 1.0,
    perceptionRadius: 50,
    maxForce: 0.2,
    mouseInfluenceRadius: 100,
    mouseAttraction: false,
  });

  const { ctx, isInitialized } = useCanvas(canvasRef);
  const { mousePos, isScattering, convergencePoint } = useMouseTracking(
    canvasRef,
    boids
  );
  let animationFrameId: number;

  const initializeBoids = () => {
    const canvas = canvasRef.value;
    if (!canvas) return;

    boids.value = Array.from({ length: settings.value.flockSize }, () =>
      createBoid(canvas.width, canvas.height)
    );
  };

  const animate = () => {
    const canvas = canvasRef.value;
    if (!canvas || !ctx.value) return;

    clearCanvas(ctx.value, canvas.width, canvas.height);

    // Update all boids in one pass
    updateBoids(
      boids.value,
      settings.value,
      mousePos.value,
      isScattering.value,
      convergencePoint.value
    );

    // Render all boids in optimized batches
    renderBoids(ctx.value, boids.value);

    animationFrameId = requestAnimationFrame(animate);
  };

  watch(() => settings.value.flockSize, initializeBoids);

  onMounted(() => {
    if (isInitialized.value) {
      initializeBoids();
      animate();
    }
  });

  onUnmounted(() => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  });

  return {
    settings,
    boids,
  };
}
