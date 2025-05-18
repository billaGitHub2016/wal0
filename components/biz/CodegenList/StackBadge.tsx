import { Badge } from "@/components/ui/badge"
import type { StackType } from "./interface"

interface StackBadgeProps {
  stack: StackType
}

export function StackBadge({ stack }: StackBadgeProps) {
  const variants = {
    React:
      "bg-blue-50 text-blue-600/80 dark:bg-blue-950 dark:text-blue-300/80 font-normal",
    Vue: "bg-emerald-50 text-emerald-600/80 dark:bg-emerald-950 dark:text-emerald-300/80 font-normal",
  }

  return (
    <Badge variant="secondary" className={variants[stack]}>
      {stack}
    </Badge>
  )
}
