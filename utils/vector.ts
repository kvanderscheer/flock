import type { Vector2D } from '~/types/boid'

export function add(v1: Vector2D, v2: Vector2D): Vector2D {
  return {
    x: v1.x + v2.x,
    y: v1.y + v2.y
  }
}

export function subtract(v1: Vector2D, v2: Vector2D): Vector2D {
  return {
    x: v1.x - v2.x,
    y: v1.y - v2.y
  }
}

export function multiply(v: Vector2D, scalar: number): Vector2D {
  return {
    x: v.x * scalar,
    y: v.y * scalar
  }
}

export function distance(v1: Vector2D, v2: Vector2D): number {
  return Math.sqrt(Math.pow(v2.x - v1.x, 2) + Math.pow(v2.y - v1.y, 2))
}

export function normalize(v: Vector2D): Vector2D {
  const length = Math.sqrt(v.x * v.x + v.y * v.y)
  return length > 0 ? multiply(v, 1 / length) : { x: 0, y: 0 }
}

export function limit(v: Vector2D, max: number): Vector2D {
  const lengthSq = v.x * v.x + v.y * v.y
  if (lengthSq > max * max) {
    const normalized = normalize(v)
    return multiply(normalized, max)
  }
  return v
}