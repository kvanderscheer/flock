import type { Boid } from '~/types/boid'
import { normalize } from './vector'

export function renderBoid(
  ctx: CanvasRenderingContext2D,
  boid: Boid,
  trailAlpha: number = 0.3
): void {
  // Calculate color based on velocity
  const speed = Math.sqrt(boid.velocity.x * boid.velocity.x + boid.velocity.y * boid.velocity.y)
  const hue = (speed * 10) % 360
  const baseColor = `hsla(${hue}, 100%, 50%, ${trailAlpha})`
  
  // Draw motion trail
  ctx.strokeStyle = baseColor
  ctx.lineWidth = 2
  ctx.beginPath()
  const normalized = normalize(boid.velocity)
  const trailLength = speed * 2
  ctx.moveTo(
    boid.position.x - normalized.x * trailLength,
    boid.position.y - normalized.y * trailLength
  )
  ctx.lineTo(boid.position.x, boid.position.y)
  ctx.stroke()

  // Draw boid
  ctx.fillStyle = `hsl(${hue}, 100%, 50%)`
  ctx.beginPath()
  const angle = Math.atan2(boid.velocity.y, boid.velocity.x)
  const size = boid.isScattered ? 6 : 4

  ctx.save()
  ctx.translate(boid.position.x, boid.position.y)
  ctx.rotate(angle)
  ctx.moveTo(size, 0)
  ctx.lineTo(-size, -size/2)
  ctx.lineTo(-size, size/2)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

export function clearCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  fadeAmount: number = 0.1
): void {
  ctx.fillStyle = `rgba(0, 0, 0, ${fadeAmount})`
  ctx.fillRect(0, 0, width, height)
}