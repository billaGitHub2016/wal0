import { MatrixConfig } from "./interface"

export const DEFAULT_MATRIX_CONFIG: MatrixConfig = {
  fontSize: 14,
  chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  speed: 33,
  opacity: {
    dark: "rgba(0, 0, 0, 0.05)",
    light: "rgba(255, 255, 255, 0.1)",
  },
  color: {
    dark: "#0F0",
    light: "rgba(0, 180, 0, 0.7)",
  },
}

export const initCanvas = (
  canvas: HTMLCanvasElement,
  fontSize: number,
): number[] => {
  const drops: number[] = []
  const columns = canvas.width / fontSize
  for (let i = 0; i < columns; i++) {
    drops[i] = 1
  }
  return drops
}

export const resizeCanvas = (canvas: HTMLCanvasElement) => {
  const parent = canvas.parentElement
  if (parent) {
    canvas.width = parent.clientWidth
    canvas.height = parent.clientHeight
  }
}
