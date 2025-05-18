import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { CodegenGuideProps } from "./interface"
import { MessageCircleMore } from "lucide-react"

const CodegenGuide = ({
  name,
  prompts,
  subtitle = "Use one of the most common prompts below or use your own to begin",
}: CodegenGuideProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      <div className="mb-4 text-center">
        <h1 className="text-4xl font-bold mb-2">
          Hi,{" "}
          <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-blue-600 text-transparent bg-clip-text">
            This is {name}
          </span>
        </h1>
        <p className="text-2xl">
          What kind of{" "}
          <span className="bg-gradient-to-r from-violet-400 via-purple-500 to-blue-500 text-transparent bg-clip-text">
            page
          </span>{" "}
          would you like to build ?
        </p>
        {subtitle && (
          <p className="text-muted-foreground text-sm mt-2">{subtitle}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-4 justify-center w-full">
        {prompts.map((prompt, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <CardContent className="p-0">
              <div
                className="w-full p-2 px-4 cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={prompt.onClick}
              >
                <div className="w-full">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="w-full text-sm text-left line-clamp-2 pl-6 relative">
                          <MessageCircleMore className="w-3.5 h-3.5 absolute left-0 top-0.5" />
                          {prompt.title}
                        </p>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">{prompt.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default CodegenGuide
