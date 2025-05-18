"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <TooltipProvider delayDuration={0}>
      <Tabs defaultValue={theme} onValueChange={setTheme}>
        <TabsList className="border">
          <TabsTrigger
            value="light"
            className="data-[state=active]:bg-background p-1"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Sun className="h-3.5 w-3.5" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={5}>
                Light Mode
              </TooltipContent>
            </Tooltip>
          </TabsTrigger>

          <TabsTrigger
            value="dark"
            className="data-[state=active]:bg-background p-1"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Moon className="h-3.5 w-3.5" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={5}>
                Dark Mode
              </TooltipContent>
            </Tooltip>
          </TabsTrigger>

          <TabsTrigger
            value="system"
            className="data-[state=active]:bg-background p-1"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Monitor className="h-3.5 w-3.5" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={5}>
                System Mode
              </TooltipContent>
            </Tooltip>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </TooltipProvider>
  )
}
