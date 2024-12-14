import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import type { Vector2D } from '~/types/boid'
import { triggerScatter } from '~/utils/boidBehavior'

export function useMouseTracking(
  canvasRef: Ref<HTMLCanvasElement | null>,
  boids: Ref<any[]>
) {
  const mousePos = ref<Vector2D>({ x: 0, y: 0 })
  const isScattering = ref(false)
  const convergencePoint = ref<Vector2D | null>(null)

  onMounted(() => {
    const canvas = canvasRef.value
    if (!canvas) return

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.value = { x: e.clientX, y: e.clientY }
    }

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) { // Left click
        isScattering.value = true
        // Trigger scatter effect on all nearby boids
        boids.value.forEach(boid => {
          triggerScatter(boid, mousePos.value)
        })
      } else if (e.button === 2) { // Right click
        e.preventDefault()
        convergencePoint.value = { x: e.clientX, y: e.clientY }
      }
    }

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 0) {
        isScattering.value = false
      } else if (e.button === 2) {
        convergencePoint.value = null
      }
    }

    const handleContextMenu = (e: Event) => {
      e.preventDefault()
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mouseup', handleMouseUp)
    canvas.addEventListener('contextmenu', handleContextMenu)

    onUnmounted(() => {
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mouseup', handleMouseUp)
      canvas.removeEventListener('contextmenu', handleContextMenu)
    })
  })

  return {
    mousePos,
    isScattering,
    convergencePoint
  }
}