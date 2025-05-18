export interface MatrixRainProps {
  className?: string
}

export interface MatrixConfig {
  fontSize: number
  chars: string
  speed: number
  opacity: {
    dark: string
    light: string
  }
  color: {
    dark: string
    light: string
  }
}
