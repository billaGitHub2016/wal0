import * as React from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FileNode } from "../interface"
import { useFile } from "../context/FileContext"
import { FileTree } from "./FileTree"

interface BreadcrumbPopoverProps {
  node: FileNode
  popoverNode: FileNode
}

export function BreadcrumbPopover({
  node,
  popoverNode,
}: BreadcrumbPopoverProps) {
  const { handleFileSelect } = useFile()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="text-sm font-medium hover:text-primary">
          {node.name}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2">
        <div className="max-h-[300px] overflow-y-auto">
          {popoverNode.children?.map((item, index) => (
            <FileTree
              key={index}
              item={item}
              onFileClick={handleFileSelect}
              variant="popover"
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
