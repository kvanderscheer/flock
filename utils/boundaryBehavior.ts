import type { Boid } from '~/types/boid'

export function wrapEdges(boid: Boid, width: number, height: number): void {
  if (boid.position.x < 0) boid.position.x = width
  if (boid.position.y < 0) boid.position.y = height
  if (boid.position.x > width) boid.position.x = 0
  if (boid.position.y > height) boid.position.y = 0
}