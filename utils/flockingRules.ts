import type { Boid, Vector2D } from '~/types/boid'
import type { SimulationSettings } from '~/types/settings'
import { add, subtract, multiply, normalize, distance } from './vector'

export function separation(boid: Boid, neighbors: Boid[], settings: SimulationSettings): Vector2D {
  const steering = { x: 0, y: 0 }
  let count = 0

  for (const other of neighbors) {
    const d = distance(boid.position, other.position)
    if (d > 0 && d < settings.perceptionRadius) {
      const diff = subtract(boid.position, other.position)
      const normalized = normalize(diff)
      steering.x += normalized.x / d
      steering.y += normalized.y / d
      count++
    }
  }

  if (count > 0) {
    steering.x /= count
    steering.y /= count
    const normalized = normalize(steering)
    return multiply(normalized, settings.maxForce * settings.separationWeight)
  }
  return steering
}

export function alignment(boid: Boid, neighbors: Boid[], settings: SimulationSettings): Vector2D {
  const steering = { x: 0, y: 0 }
  let count = 0

  for (const other of neighbors) {
    const d = distance(boid.position, other.position)
    if (d > 0 && d < settings.perceptionRadius) {
      steering.x += other.velocity.x
      steering.y += other.velocity.y
      count++
    }
  }

  if (count > 0) {
    steering.x /= count
    steering.y /= count
    const normalized = normalize(steering)
    return multiply(normalized, settings.maxForce * settings.alignmentWeight)
  }
  return steering
}

export function cohesion(boid: Boid, neighbors: Boid[], settings: SimulationSettings): Vector2D {
  const center = { x: 0, y: 0 }
  let count = 0

  for (const other of neighbors) {
    const d = distance(boid.position, other.position)
    if (d > 0 && d < settings.perceptionRadius) {
      center.x += other.position.x
      center.y += other.position.y
      count++
    }
  }

  if (count > 0) {
    center.x /= count
    center.y /= count
    const desired = subtract(center, boid.position)
    const normalized = normalize(desired)
    return multiply(normalized, settings.maxForce * settings.cohesionWeight)
  }
  return center
}