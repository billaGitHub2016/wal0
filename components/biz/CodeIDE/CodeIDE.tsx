import { AppSidebar } from "./components/FileSidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { CodeIDEProps, FileNode } from "./interface"
import { Editor, Monaco } from "@monaco-editor/react"
import { FileProvider, useFile } from "./context/FileContext"
import { useEffect, useState, useRef, memo } from "react"
import { useTheme } from "next-themes"
import { BreadcrumbPopover } from "./components/BreadcrumbPopover"
import { EditorToast } from "./components/EditorToast"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

// Helper function to get language from file extension
function getLanguageFromFileName(fileName: string): string | undefined {
  const extension = fileName.split(".").pop()?.toLowerCase()

  // Map file extensions to Monaco Editor supported languages
  const extensionToLanguage: Record<string, string> = {
    js: "javascript",
    jsx: "javascript",
    ts: "typescript",
    tsx: "typescript",
    html: "html",
    css: "css",
    scss: "scss",
    less: "less",
    json: "json",
    md: "markdown",
    vue: "html", // Vue files default to HTML syntax highlighting
    py: "python",
    java: "java",
    c: "c",
    cpp: "cpp",
    go: "go",
    php: "php",
    rb: "ruby",
    rs: "rust",
    sh: "shell",
    sql: "sql",
    xml: "xml",
    yaml: "yaml",
    yml: "yaml",
  }

  return extension ? extensionToLanguage[extension] : undefined
}

// Helper function to get the file path for a given file ID
function getFilePath(
  nodes: FileNode[],
  targetId: string,
  path: FileNode[] = [],
): FileNode[] | null {
  for (const node of nodes) {
    // Check if current node matches target
    if (node.id === targetId) {
      return [...path, node]
    }

    // Recursively search children if they exist
    if (node.children) {
      const foundPath = getFilePath(node.children, targetId, [...path, node])
      if (foundPath) {
        return foundPath
      }
    }
  }
  return null
}

// Internal component that uses the sidebar context
function CodeIDEContent({ readOnly, onSave, codeRenderer }: CodeIDEProps) {
  const { resolvedTheme } = useTheme()
  const {
    currentFile,
    updateFileContent,
    resetChanges,
    saveChanges,
    originalFiles,
    addUnsavedFile,
    removeUnsavedFile,
    unsavedFiles,
    files,
  } = useFile()
  const [showToast, setShowToast] = useState(false)
  const editorContainerRef = useRef<HTMLDivElement>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Compute current file path for breadcrumb navigation
  const currentFilePath = currentFile
    ? getFilePath(originalFiles, currentFile.id)
    : null

  // Helper function to find a file by ID in the file tree
  const findFileById = (
    nodes: FileNode[],
    id: string,
  ): FileNode | undefined => {
    for (const node of nodes) {
      if (node.id === id) return node
      if (node.children) {
        const found = findFileById(node.children, id)
        if (found) return found
      }
    }
    return undefined
  }

  // Check if file content has changed from original
  const checkForChanges = (fileId: string, newValue: string) => {
    const initialFile = findFileById(originalFiles, fileId)
    return initialFile && initialFile.content !== newValue
  }

  // Handle editor content changes
  const handleEditorChange = (value: string | undefined) => {
    if (currentFile && value !== undefined) {
      updateFileContent(currentFile.id, value)

      // Check for unsaved changes
      const hasChanges = checkForChanges(currentFile.id, value)

      if (hasChanges) {
        addUnsavedFile(currentFile.id)
      } else {
        removeUnsavedFile(currentFile.id)
      }
    }
  }

  // Show/hide toast when unsaved changes exist
  useEffect(() => {
    if (unsavedFiles.size > 0) {
      setShowToast(true)
    } else {
      setShowToast(false)
    }
  }, [unsavedFiles.size])

  // Handle saving changes
  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onSave(files)
      saveChanges() // Only save internally after external save succeeds
    } catch (error) {
      console.error("Failed to save:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleEditorWillMount = (monaco: Monaco) => {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      noEmit: true,
      allowJs: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      reactNamespace: "React",
    })

    const diagnosticOptions = {
      noSemanticValidation: false,
      noSyntaxValidation: false,
      diagnosticCodesToIgnore: [2307, 2304],
    }
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(
      diagnosticOptions,
    )
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="border rounded-md">
      {/* File tree sidebar */}
      <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
        <AppSidebar />
      </ResizablePanel>

      <ResizableHandle />

      {/* Main editor area */}
      <ResizablePanel defaultSize={80}>
        <div className="flex flex-col h-full w-full min-w-0">
          <header className="flex h-10 shrink-0 items-center gap-2 border-b px-4">
            <ScrollArea className="w-[calc(100%-4rem)] h-full">
              <Breadcrumb className="min-w-max pt-2">
                <BreadcrumbList>
                  {currentFilePath ? (
                    currentFilePath.map((node, index) => (
                      <BreadcrumbItem key={node.id}>
                        {index === currentFilePath.length - 1 ? (
                          <BreadcrumbPage>{node.name}</BreadcrumbPage>
                        ) : (
                          <>
                            <BreadcrumbPopover
                              node={node}
                              popoverNode={
                                index === 0
                                  ? {
                                      id: "originalFiles",
                                      name: "root",
                                      children: originalFiles,
                                    }
                                  : currentFilePath[index - 1]
                              }
                            />
                            <BreadcrumbSeparator />
                          </>
                        )}
                      </BreadcrumbItem>
                    ))
                  ) : (
                    <BreadcrumbItem>
                      <BreadcrumbPage>No file selected</BreadcrumbPage>
                    </BreadcrumbItem>
                  )}
                </BreadcrumbList>
              </Breadcrumb>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </header>

          <div className="relative flex-1 min-h-0 w-full overflow-hidden">
            {currentFile ? (
              <div
                ref={editorContainerRef}
                className="h-full w-full relative overflow-hidden"
              >
                <Editor
                  height="100%"
                  width="100%"
                  path={currentFile.id}
                  value={currentFile.content}
                  language={
                    currentFile.language ||
                    getLanguageFromFileName(currentFile.name)
                  }
                  theme={resolvedTheme === "light" ? "light" : "vs-dark"}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    readOnly: readOnly,
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                  }}
                  beforeMount={handleEditorWillMount}
                  onChange={handleEditorChange}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Select a file to view its content
              </div>
            )}
            <EditorToast
              visible={showToast}
              onReset={resetChanges}
              onSave={handleSave}
              isSaving={isSaving}
            />
          </div>
        </div>
      </ResizablePanel>

      {codeRenderer && (
        <>
          <ResizableHandle />
          <ResizablePanel defaultSize={50} minSize={30} maxSize={100}>
            <div
              className="h-full w-full overflow-hidden"
              style={{ position: "relative" }}
            >
              <div className="absolute inset-0 overflow-auto">
                {codeRenderer}
              </div>
            </div>
          </ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  )
}

// Main component wrapped with required providers
export function CodeIDE(props: CodeIDEProps) {
  return (
    <div className="h-full min-h-[100px]">
      <FileProvider initialFiles={props.data}>
        <CodeIDEContent {...props} />
      </FileProvider>
    </div>
  )
}

// memo data to the CodeIDE component
export default memo(CodeIDE, (prevProps, nextProps) => {
  // Deep comparison
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data)
})
