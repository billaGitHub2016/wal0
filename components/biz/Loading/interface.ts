export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The size of the loading spinner
   * @default "default"
   */
  size?: "sm" | "default" | "lg"
  className?: string
  fullscreen?: boolean
}
