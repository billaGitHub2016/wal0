import React from "react"
import { cn } from "@/lib/utils"
import { LoadingProps } from "./interface"

export const Loading: React.FC<LoadingProps> = ({
  size = "default",
  className,
  fullscreen = false,
  ...props
}) => {
  const sizeClasses = {
    sm: "w-5 h-5",
    default: "w-10 h-10",
    lg: "w-14 h-14",
  }

  if (fullscreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/90 dark:bg-background/95 backdrop-blur-sm z-50">
        <div
          role="status"
          className={cn(sizeClasses[size], className)}
          {...props}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="dark:[&_path]:brightness-125"
          >
            <defs>
              <linearGradient
                id="loadingTechGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" style={{ stopColor: "#60A5FA" }} />
                <stop offset="50%" style={{ stopColor: "#818CF8" }} />
                <stop offset="100%" style={{ stopColor: "#A78BFA" }} />
              </linearGradient>

              <linearGradient
                id="loadingCodeGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" style={{ stopColor: "#818CF8" }} />
                <stop offset="100%" style={{ stopColor: "#A78BFA" }} />
              </linearGradient>
            </defs>

            <path
              d="M85 80 L65 100 L85 120"
              fill="none"
              stroke="url(#loadingCodeGradient)"
              strokeWidth={8}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-60"
            />

            <path
              d="M115 80 L135 100 L115 120"
              fill="none"
              stroke="url(#loadingCodeGradient)"
              strokeWidth={8}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-60"
            />

            <g className="animate-spin origin-center">
              <path
                d="M140 70 A50 50 0 1 0 140 130"
                fill="none"
                stroke="url(#loadingTechGradient)"
                strokeWidth={12}
                strokeLinecap="round"
                className="opacity-30"
              />

              <path
                d="M140 70 A50 50 0 0 1 140 130"
                fill="none"
                stroke="url(#loadingCodeGradient)"
                strokeWidth={12}
                strokeLinecap="round"
                className="opacity-90"
              />
            </g>
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div role="status" className={cn(sizeClasses[size], className)} {...props}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="loadingTechGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" style={{ stopColor: "#3B82F6" }} />
            <stop offset="50%" style={{ stopColor: "#6366F1" }} />
            <stop offset="100%" style={{ stopColor: "#8B5CF6" }} />
          </linearGradient>

          <linearGradient
            id="loadingCodeGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" style={{ stopColor: "#6366F1" }} />
            <stop offset="100%" style={{ stopColor: "#8B5CF6" }} />
          </linearGradient>
        </defs>

        <path
          d="M85 80 L65 100 L85 120"
          fill="none"
          stroke="url(#loadingCodeGradient)"
          strokeWidth={8}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-50"
        />

        <path
          d="M115 80 L135 100 L115 120"
          fill="none"
          stroke="url(#loadingCodeGradient)"
          strokeWidth={8}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-50"
        />

        <g className="animate-spin origin-center">
          <path
            d="M140 70 A50 50 0 1 0 140 130"
            fill="none"
            stroke="url(#loadingTechGradient)"
            strokeWidth={12}
            strokeLinecap="round"
            className="opacity-25"
          />

          <path
            d="M140 70 A50 50 0 0 1 140 130"
            fill="none"
            stroke="url(#loadingCodeGradient)"
            strokeWidth={12}
            strokeLinecap="round"
            className="opacity-75"
          />
        </g>
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default Loading
