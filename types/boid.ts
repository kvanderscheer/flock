export interface Vector2D {
  x: number
  y: number
}

export interface Boid {
  position: Vector2D
  velocity: Vector2D
  acceleration: Vector2D
  isScattered: boolean
  scatterTimer: number
}