import * as React from "react"
import { useFile } from "../context/FileContext"
import { FileTree } from "./FileTree"

export function AppSidebar() {
  const { handleFileSelect, files } = useFile()

  return (
    <div className="h-full overflow-hidden bg-background">
      <div className="flex flex-col h-full">
        {/* Title section */}
        <div className="px-3 h-10 border-b flex items-center">
          <h2 className="text-sm font-semibold">Files</h2>
        </div>

        {/* File tree section */}
        <div className="flex-1 overflow-auto p-2">
          <div className="space-y-1">
            {files.map((item, index) => (
              <FileTree
                key={index}
                item={item}
                onFileClick={handleFileSelect}
                variant="sidebar"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
