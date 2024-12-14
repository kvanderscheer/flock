import { onMounted, onUnmounted, ref, type Ref } from 'vue'

export function useCanvas(canvasRef: Ref<HTMLCanvasElement | null>) {
  const ctx = ref<CanvasRenderingContext2D | null>(null)
  const isInitialized = ref(false)

  onMounted(() => {
    const canvas = canvasRef.value
    if (!canvas) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Initialize canvas
    ctx.value = canvas.getContext('2d')
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    isInitialized.value = true
  })

  onUnmounted(() => {
    window.removeEventListener('resize', () => {})
  })

  return {
    ctx,
    isInitialized
  }
}