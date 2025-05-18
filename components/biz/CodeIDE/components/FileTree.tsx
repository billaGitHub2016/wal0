import * as React from "react"
import { ChevronRight, File, Folder } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { FileNode } from "../interface"
import { useFile } from "../context/FileContext"
import { cn } from "@/lib/utils"

interface FileTreeProps {
  item: FileNode
  onFileClick: (file: FileNode) => void
  variant?: "sidebar" | "popover"
  defaultOpen?: boolean
}

export function FileTree({
  item,
  onFileClick,
  variant = "sidebar",
  defaultOpen,
}: FileTreeProps) {
  const { currentFile } = useFile()
  const hasChildren = item.children && item.children.length > 0
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  const containsCurrentFile = React.useMemo(() => {
    if (!currentFile || !hasChildren) return false

    const checkNode = (node: FileNode): boolean => {
      if (node.id === currentFile.id) return true
      if (!node.children) return false
      return node.children.some(child => checkNode(child))
    }

    return checkNode(item)
  }, [currentFile, item, hasChildren])

  React.useEffect(() => {
    if (containsCurrentFile) {
      setIsOpen(true)
    }
  }, [containsCurrentFile])

  if (!hasChildren) {
    if (variant === "sidebar") {
      return (
        <button
          className={cn(
            "flex w-full items-center gap-2 px-4 py-2 rounded-sm hover:bg-muted text-sm",
            currentFile?.id === item.id && "bg-muted",
          )}
          onClick={() => onFileClick(item)}
        >
          <File className="h-4 w-4 shrink-0" />
          <span className="truncate">{item.name}</span>
        </button>
      )
    }

    return (
      <button
        className={cn(
          "flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-sm hover:bg-muted",
          currentFile?.id === item.id && "bg-muted",
        )}
        onClick={() => onFileClick(item)}
      >
        <File className="h-4 w-4 shrink-0" />
        <span className="truncate">{item.name}</span>
      </button>
    )
  }

  return (
    <Collapsible
      className={cn(
        "w-full",
        variant === "sidebar" &&
          "group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90",
      )}
      open={variant === "sidebar" ? isOpen : defaultOpen}
      onOpenChange={setIsOpen}
    >
      <CollapsibleTrigger
        className={cn(
          "flex items-center gap-2 w-full text-sm",
          variant === "sidebar"
            ? "px-4 py-2 hover:bg-muted"
            : cn(
                "px-2 py-1.5 text-sm rounded-sm hover:bg-muted",
                variant === "popover" && containsCurrentFile && "bg-muted",
              ),
        )}
      >
        <ChevronRight className="h-4 w-4 shrink-0 transition-transform" />
        <Folder className="h-4 w-4 shrink-0" />
        <span className="truncate">{item.name}</span>
      </CollapsibleTrigger>
      <CollapsibleContent
        className={cn(variant === "sidebar" ? "pl-6" : "pl-4")}
      >
        {item.children?.map((subItem, index) => (
          <FileTree
            key={index}
            item={subItem}
            onFileClick={onFileClick}
            variant={variant}
            defaultOpen={defaultOpen}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
