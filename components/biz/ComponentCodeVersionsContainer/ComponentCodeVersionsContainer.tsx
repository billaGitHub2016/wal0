import React, { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { ComponentCodeVersionsContainerProps } from "./interface"
import { MessageCircleMore } from "lucide-react"
import { Prompt } from "@/lib/db/componentCode/types"
import { ImagePreview } from "@/components/biz/ImagePreview"
import { Separator } from "@/components/ui/separator"

const ComponentCodeVersionsContainer = ({
  versions,
  activeVersion,
  onVersionChange,
  children,
}: ComponentCodeVersionsContainerProps) => {
  const [hoveredVersion, setHoveredVersion] = useState<number | null>(null)
  const dotsContainerRef = useRef<HTMLDivElement>(null)

  // Calculate and adjust the position of the dots container
  useEffect(() => {
    const container = dotsContainerRef.current
    if (!container) return

    const activeIndex = versions.findIndex(
      version => version.id === activeVersion,
    )
    if (activeIndex === -1) return

    const dotHeight = 8 // Height of each dot
    const gap = 16 // gap-4 in pixels
    const centerPosition = container.clientHeight / 2
    const dotPosition =
      (versions.length - 1 - activeIndex) * (dotHeight + gap) + dotHeight / 2

    // Calculate offset needed to center the active dot
    const offset = centerPosition - dotPosition

    // Apply offset with smooth transition
    container.style.transform = `translateY(${offset}px)`
  }, [activeVersion, versions])

  const renderPrompt = (prompt: Prompt) => {
    switch (prompt.type) {
      case "text":
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="text-sm max-w-[150px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] xl:max-w-[350px] truncate hover:cursor-help">
                  {prompt.text}
                </p>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="max-w-[300px] sm:max-w-[350px] md:max-w-[400px] max-h-[300px] overflow-y-auto"
              >
                <p className="text-sm">{prompt.text}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      case "image":
        return <ImagePreview src={prompt.image} thumbnailSize={32} />
      default:
        return null
    }
  }

  const activeVersionData = versions.find(v => v.id === activeVersion)

  return (
    <TooltipProvider>
      <div className="flex min-h-[200px] h-full">
        {/* Version indicator section */}
        <div className="relative flex items-center pr-4 overflow-y-auto scrollbar-hide">
          <div
            ref={dotsContainerRef}
            className="flex flex-col gap-4 transition-transform duration-300 ease-in-out px-1"
          >
            {[...versions].reverse().map((version, index) => (
              <Tooltip key={version.id}>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full cursor-pointer transition-all duration-300",
                      "bg-gray-300 dark:bg-gray-600",
                      "hover:scale-150 hover:bg-gray-400 dark:hover:bg-gray-500",
                      activeVersion === version.id &&
                        "scale-150 bg-gray-500 dark:bg-gray-300",
                      hoveredVersion === versions.length - 1 - index &&
                        "scale-150 bg-gray-400 dark:bg-gray-500",
                    )}
                    onClick={() => onVersionChange(version.id)}
                    onMouseEnter={() =>
                      setHoveredVersion(versions.length - 1 - index)
                    }
                    onMouseLeave={() => setHoveredVersion(null)}
                  />
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={12}>
                  <div className="flex flex-col gap-2 max-w-[200px] max-h-[200px] overflow-y-auto">
                    {version.prompt.map((prompt, index) => (
                      <div key={index}>{renderPrompt(prompt)}</div>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* Content container section */}
        <div className="relative flex-1 border rounded-lg p-4 border-gray-200 dark:border-gray-800 bg-white dark:bg-background">
          <div className="absolute left-[-8px] top-1/2 -translate-y-1/2">
            <svg
              width="8"
              height="16"
              viewBox="0 0 8 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 0L0 8L8 16"
                stroke="currentColor"
                className="text-gray-200 dark:text-gray-700"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </div>

          <p className="w-fit flex items-center gap-2 py-2 px-4 rounded-lg bg-gray-50 dark:bg-gray-800 mb-4">
            <MessageCircleMore className="w-5 h-5" />
            <Separator
              orientation="vertical"
              className="h-5 bg-gray-300 dark:bg-gray-600 mr-1"
            />
            <div className="flex items-center gap-2 h-8">
              {activeVersionData?.prompt.map((prompt, index) => (
                <div key={index}>{renderPrompt(prompt)}</div>
              ))}
            </div>
          </p>

          {children}
        </div>
      </div>
    </TooltipProvider>
  )
}

export default ComponentCodeVersionsContainer
