import type { Boid } from '~/types/boid'

export function createBoid(width: number, height: number): Boid {
  return {
    position: {
      x: Math.random() * width,
      y: Math.random() * height
    },
    velocity: {
      x: (Math.random() * 2 - 1) * 2,
      y: (Math.random() * 2 - 1) * 2
    },
    acceleration: {
      x: 0,
      y: 0
    },
    isScattered: false,
    scatterTimer: 0
  }
}