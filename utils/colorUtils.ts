export function calculateBoidColor(speed: number, alpha: number = 1): string {
  const hue = (speed * 10) % 360
  return `hsla(${hue}, 100%, 50%, ${alpha})`
}

export function getFadeColor(alpha: number): string {
  return `rgba(0, 0, 0, ${alpha})`
}