import type { Boid, Vector2D } from '~/types/boid'
import type { SimulationSettings } from '~/types/settings'
import { subtract, normalize, multiply, distance } from './vector'

export function calculateMouseInfluence(
  boid: Boid,
  mousePos: Vector2D,
  settings: SimulationSettings,
  isScattering: boolean
): Vector2D {
  const d = distance(boid.position, mousePos)
  if (d < settings.mouseInfluenceRadius) {
    const diff = subtract(mousePos, boid.position)
    const normalized = normalize(diff)
    const strength = (settings.mouseInfluenceRadius - d) / settings.mouseInfluenceRadius
    const direction = settings.mouseAttraction ? 1 : -1
    return multiply(normalized, strength * direction * settings.maxForce)
  }
  return { x: 0, y: 0 }
}

export function calculateConvergence(
  boid: Boid,
  target: Vector2D,
  settings: SimulationSettings
): Vector2D {
  const diff = subtract(target, boid.position)
  const normalized = normalize(diff)
  return multiply(normalized, settings.maxForce)
}