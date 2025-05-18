import React from "react"
import { Button } from "@/components/ui/button"
import { Cpu } from "lucide-react"
import useProviderModelModal from "./useProviderModelModal"

interface ProviderModelModalButtonProps {
  label?: string
  className?: string
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
  size?: "default" | "sm" | "lg" | "icon"
  showIcon?: boolean
}

/**
 * Button component for triggering the Provider Model Modal
 */
export const ProviderModelModalButton: React.FC<
  ProviderModelModalButtonProps
> = ({
  label = "AI Models",
  className = "",
  variant = "outline",
  size = "sm",
  showIcon = true,
}) => {
  const { openModal, selectedModel } = useProviderModelModal()

  return (
    <Button
      onClick={openModal}
      variant={variant}
      size={size}
      className={`flex items-center gap-2 ${className}`}
    >
      {showIcon && <Cpu className="w-4 h-4" />}
      <span>{label}</span>
      {selectedModel && (
        <span className="text-xs font-mono opacity-75 ml-1">
          ({selectedModel.title})
        </span>
      )}
    </Button>
  )
}
