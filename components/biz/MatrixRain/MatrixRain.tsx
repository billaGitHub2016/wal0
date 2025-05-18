import React, { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { MatrixRainProps } from "./interface"
import { DEFAULT_MATRIX_CONFIG, initCanvas, resizeCanvas } from "./helper"

const MatrixRain: React.FC<MatrixRainProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    resizeCanvas(canvas)
    window.addEventListener("resize", () => resizeCanvas(canvas))

    const drops = initCanvas(canvas, DEFAULT_MATRIX_CONFIG.fontSize)

    const draw = () => {
      ctx.fillStyle =
        theme === "dark"
          ? DEFAULT_MATRIX_CONFIG.opacity.dark
          : DEFAULT_MATRIX_CONFIG.opacity.light
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle =
        theme === "dark"
          ? DEFAULT_MATRIX_CONFIG.color.dark
          : DEFAULT_MATRIX_CONFIG.color.light
      ctx.font = `${DEFAULT_MATRIX_CONFIG.fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text =
          DEFAULT_MATRIX_CONFIG.chars[
            Math.floor(Math.random() * DEFAULT_MATRIX_CONFIG.chars.length)
          ]
        ctx.fillText(
          text,
          i * DEFAULT_MATRIX_CONFIG.fontSize,
          drops[i] * DEFAULT_MATRIX_CONFIG.fontSize,
        )

        if (
          drops[i] * DEFAULT_MATRIX_CONFIG.fontSize > canvas.height &&
          Math.random() > 0.975
        ) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, DEFAULT_MATRIX_CONFIG.speed)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", () => resizeCanvas(canvas))
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "absolute top-0 left-0 w-full h-full pointer-events-none",
        "dark:opacity-15 opacity-10",
        className,
      )}
    />
  )
}

export default MatrixRain
