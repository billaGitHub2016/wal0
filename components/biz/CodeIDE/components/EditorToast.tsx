import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { useFile } from "../context/FileContext"
import { FileNode } from "../interface"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useEffect } from "react"

interface EditorToastProps {
  visible: boolean
  onReset: () => void
  onSave: () => void
  isSaving?: boolean
}

function getFilePath(
  files: FileNode[],
  fileId: string,
  path: string[] = [],
): string | null {
  for (const file of files) {
    const currentPath = [...path, file.name]
    if (file.id === fileId) {
      return currentPath.join(">")
    }
    if (file.children) {
      const foundPath = getFilePath(file.children, fileId, currentPath)
      if (foundPath) return foundPath
    }
  }
  return null
}

function findFileById(files: FileNode[], fileId: string): FileNode | null {
  for (const file of files) {
    if (file.id === fileId) return file
    if (file.children) {
      const found = findFileById(file.children, fileId)
      if (found) return found
    }
  }
  return null
}

export function EditorToast({
  visible,
  onReset,
  onSave,
  isSaving = false,
}: EditorToastProps) {
  const { files, unsavedFiles, setCurrentFile } = useFile()

  useEffect(() => {
    if (!visible) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault()
        if (!isSaving) {
          onSave()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [visible, onSave, isSaving])

  if (!visible) return null

  const unsavedFilePaths = Array.from(unsavedFiles)
    .map(fileId => ({
      id: fileId,
      path: getFilePath(files, fileId),
    }))
    .filter((item): item is { id: string; path: string } => item.path !== null)

  const handleFileClick = (fileId: string) => {
    const file = findFileById(files, fileId)
    if (file) {
      setCurrentFile(file)
    }
  }

  return (
    <div
      className={cn(
        "fixed md:absolute bottom-4 right-4 z-50",
        "bg-background border rounded-lg shadow-lg",
        "p-4 min-w-[200px] max-w-[300px]",
        "mx-auto left-4 md:left-auto max-h-[calc(100%-2rem)] overflow-y-auto",
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold">Unsaved Changes</h4>
        </div>
        <p className="text-sm text-muted-foreground">
          You have unsaved changes in these files:
        </p>
        <div className="text-sm text-muted-foreground">
          {unsavedFilePaths.map(({ id, path }) => (
            <div
              key={id}
              className="py-1 cursor-pointer hover:text-foreground underline transition-colors"
              onClick={() => handleFileClick(id)}
            >
              {path}
            </div>
          ))}
        </div>
        <div className="flex gap-2 justify-end mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            disabled={isSaving}
          >
            Reset
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" onClick={onSave} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded-md bg-secondary text-secondary-foreground text-[10px] font-medium border-[0.5px] border-border">
                    {navigator.userAgent.indexOf("Mac") !== -1 ? "⌘" : "Ctrl"}
                  </kbd>
                  +
                  <kbd className="px-1 py-0.5 rounded-md bg-secondary text-secondary-foreground text-[10px] font-medium border-[0.5px] border-border">
                    s
                  </kbd>
                  to save
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}
