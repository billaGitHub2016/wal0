import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { CompoderThinkingLoadingProps } from "./interface"

export function CompoderThinkingLoading({
  text = "Compoder is thinking...",
  className,
}: CompoderThinkingLoadingProps) {
  return (
    <div className={cn("flex items-center gap-2 py-2", className)}>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 1,
        }}
        className="h-2 w-2 rounded-full bg-purple-500"
      />
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 1,
          delay: 0.2,
        }}
        className="h-2 w-2 rounded-full bg-blue-500"
      />
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 1,
          delay: 0.4,
        }}
        className="h-2 w-2 rounded-full bg-green-500"
      />
      <span className="text-sm text-muted-foreground ml-2">{text}</span>
    </div>
  )
}
