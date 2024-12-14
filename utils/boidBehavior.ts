import type { Boid, Vector2D } from '~/types/boid'
import type { SimulationSettings } from '~/types/settings'
import { add, subtract, multiply, normalize, limit, distance } from './vector'
import { separation, alignment, cohesion } from './flockingRules'
import { calculateMouseInfluence, calculateConvergence } from './mouseInfluence'
import { wrapEdges } from './boundaryBehavior'

const SCATTER_DURATION = 60 // frames (1 second at 60fps)
const SCATTER_FORCE = 3
const SCATTER_RADIUS = 100

export function updateBoid(
  boid: Boid,
  neighbors: Boid[],
  settings: SimulationSettings,
  mousePos: Vector2D,
  isScattering: boolean,
  convergencePoint: Vector2D | null
): void {
  // Update scatter state
  if (boid.scatterTimer > 0) {
    boid.scatterTimer--
    if (boid.scatterTimer === 0) {
      boid.isScattered = false
    }
  }

  // Calculate base flocking forces
  const sep = separation(boid, neighbors, settings)
  const ali = alignment(boid, neighbors, settings)
  const coh = cohesion(boid, neighbors, settings)
  
  // Calculate mouse and convergence influences
  const mouse = calculateMouseInfluence(boid, mousePos, settings, isScattering)
  const conv = convergencePoint ? calculateConvergence(boid, convergencePoint, settings) : { x: 0, y: 0 }
  
  // Calculate scatter force if active
  const scatter = boid.isScattered ? calculateScatterForce(boid, mousePos) : { x: 0, y: 0 }

  // Apply all forces with scatter having higher priority when active
  const forces = boid.isScattered
    ? add(multiply(scatter, SCATTER_FORCE), add(sep, add(ali, coh)))
    : add(add(add(sep, ali), add(coh, mouse)), conv)

  boid.acceleration = add(boid.acceleration, forces)

  // Update velocity with higher speed limit when scattered
  const speedLimit = boid.isScattered ? settings.speed * 2 : settings.speed
  boid.velocity = limit(add(boid.velocity, boid.acceleration), speedLimit)

  // Update position
  boid.position = add(boid.position, boid.velocity)

  // Reset acceleration
  boid.acceleration = { x: 0, y: 0 }

  // Get canvas dimensions from the window
  const width = window.innerWidth
  const height = window.innerHeight

  // Wrap around edges with correct dimensions
  wrapEdges(boid, width, height)
}

function calculateScatterForce(boid: Boid, mousePos: Vector2D): Vector2D {
  const diff = subtract(boid.position, mousePos)
  return normalize(diff)
}

export function triggerScatter(boid: Boid, mousePos: Vector2D): void {
  const d = distance(boid.position, mousePos)
  if (d < SCATTER_RADIUS) {
    boid.isScattered = true
    boid.scatterTimer = SCATTER_DURATION
    
    // Add immediate impulse away from mouse
    const diff = subtract(boid.position, mousePos)
    const normalized = normalize(diff)
    boid.velocity = add(boid.velocity, multiply(normalized, SCATTER_FORCE))
  }
}