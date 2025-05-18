import { Card } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { CodegenListProps } from "./interface"
import { StackBadge } from "./StackBadge"

export function CodegenList({
  items,
  onItemClick,
  className,
}: CodegenListProps) {
  return (
    <div
      className={`grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
        className || ""
      }`}
    >
      {items.map(item => (
        <Card
          key={item.id}
          className="p-6 transition-all cursor-pointer
            shadow-[0_0_15px_-3px_rgba(167,139,250,0.1)]
            hover:shadow-[0_0_20px_-3px_rgba(167,139,250,0.3)]
            relative after:absolute after:w-[1px] after:h-full after:right-0 after:top-0 after:bg-gradient-to-b after:from-transparent dark:after:via-violet-500/40 after:via-violet-300/30 after:to-transparent
            before:absolute before:w-full before:h-[1px] before:left-0 before:bottom-0 before:bg-gradient-to-r before:from-transparent dark:before:via-violet-500/40 before:via-violet-300/30 before:to-transparent
            "
          onClick={() => onItemClick?.(item.id)}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <h3 className="text-xl font-semibold truncate">
                      {item.title}
                    </h3>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-sm">{item.title}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <StackBadge stack={item.fullStack} />
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">{item.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </Card>
      ))}
    </div>
  )
}
