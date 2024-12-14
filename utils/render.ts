import type { Boid } from "~/types/boid";
import { normalize } from "./vector";
import { SIMULATION_CONSTANTS } from "./constants";

// Create path lazily only when in browser
let pathCache: Path2D | null = null;
const baseSize = SIMULATION_CONSTANTS.RENDER.BASE_SIZE;

function getPathCache(): Path2D {
  if (!pathCache && typeof Path2D !== "undefined") {
    pathCache = new Path2D();
    pathCache.moveTo(baseSize, 0);
    pathCache.lineTo(-baseSize, -baseSize / 2);
    pathCache.lineTo(-baseSize, baseSize / 2);
    pathCache.closePath();
  }
  return pathCache!;
}

export function renderBoids(
  ctx: CanvasRenderingContext2D,
  boids: Boid[],
  trailAlpha: number = 0.3
): void {
  // Batch similar operations
  ctx.lineWidth = 2;

  // Draw trails first
  ctx.beginPath();
  for (const boid of boids) {
    const speed = Math.sqrt(
      boid.velocity.x * boid.velocity.x + boid.velocity.y * boid.velocity.y
    );
    const normalized = normalize(boid.velocity);
    const trailLength = speed * 2;

    ctx.strokeStyle = `hsla(${(speed * 10) % 360}, 100%, 50%, ${trailAlpha})`;
    ctx.moveTo(
      boid.position.x - normalized.x * trailLength,
      boid.position.y - normalized.y * trailLength
    );
    ctx.lineTo(boid.position.x, boid.position.y);
    ctx.stroke();
  }

  // Then draw all boids
  const path = getPathCache();
  for (const boid of boids) {
    const speed = Math.sqrt(
      boid.velocity.x * boid.velocity.x + boid.velocity.y * boid.velocity.y
    );
    ctx.fillStyle = `hsl(${(speed * 10) % 360}, 100%, 50%)`;

    ctx.save();
    ctx.translate(boid.position.x, boid.position.y);
    ctx.rotate(Math.atan2(boid.velocity.y, boid.velocity.x));
    ctx.scale(boid.isScattered ? 1.5 : 1, boid.isScattered ? 1.5 : 1);
    if (path) {
      ctx.fill(path);
    } else {
      // Fallback if Path2D is not available
      ctx.beginPath();
      ctx.moveTo(baseSize, 0);
      ctx.lineTo(-baseSize, -baseSize / 2);
      ctx.lineTo(-baseSize, baseSize / 2);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }
}

export function clearCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  fadeAmount: number = 0.1
): void {
  ctx.fillStyle = `rgba(0, 0, 0, ${fadeAmount})`;
  ctx.fillRect(0, 0, width, height);
}
