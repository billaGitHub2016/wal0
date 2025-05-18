import React, { createContext, useContext, useEffect, useState } from "react"
import type { FileNode } from "../interface"
import { useToast } from "@/hooks/use-toast"
import { flushSync } from "react-dom"

const findFileById = (nodes: FileNode[], id: string): FileNode | null => {
  for (const node of nodes) {
    if (node.id === id) return node
    if (node.children) {
      const found = findFileById(node.children, id)
      if (found) return found
    }
  }
  return null
}

const findEntryFile = (nodes: FileNode[]): FileNode | null => {
  for (const node of nodes) {
    if (node.isEntryFile) return node
    if (node.children) {
      const found = findEntryFile(node.children)
      if (found) return found
    }
  }
  return null
}

interface FileContextType {
  files: FileNode[]
  currentFile: FileNode | null
  setFiles: (files: FileNode[]) => void
  setCurrentFile: (file: FileNode | null) => void
  handleFileSelect: (file: FileNode) => void
  updateFileContent: (fileId: string, content: string) => void
  resetChanges: () => void
  saveChanges: () => void
  originalFiles: FileNode[]
  unsavedFiles: Set<string>
  addUnsavedFile: (fileId: string) => void
  removeUnsavedFile: (fileId: string) => void
}

const FileContext = createContext<FileContextType | undefined>(undefined)

export function FileProvider({
  children,
  initialFiles,
}: {
  children: React.ReactNode
  initialFiles: FileNode[]
}) {
  const { toast } = useToast()
  const [files, setFiles] = useState<FileNode[]>(initialFiles)
  const [currentFile, setCurrentFile] = useState<FileNode | null>(
    findEntryFile(initialFiles) || null,
  )
  const [originalFiles, setOriginalFiles] = useState<FileNode[]>(initialFiles)
  const [unsavedFiles, setUnsavedFiles] = useState<Set<string>>(new Set())

  // Listen for changes to initialFiles to update files, originalFiles and currentFile
  useEffect(() => {
    setFiles(initialFiles)
    setOriginalFiles(initialFiles)
    setCurrentFile(findEntryFile(initialFiles) || null)
    setUnsavedFiles(new Set())
  }, [initialFiles])

  const handleFileSelect = (file: FileNode) => {
    if (file.content) {
      setCurrentFile(file)
    }
  }

  const updateFileContent = (fileId: string, content: string) => {
    setFiles(prevFiles => {
      const updateFileNode = (nodes: FileNode[]): FileNode[] => {
        return nodes.map(node => {
          if (node.id === fileId) {
            return { ...node, content }
          }
          if (node.children) {
            return { ...node, children: updateFileNode(node.children) }
          }
          return node
        })
      }
      return updateFileNode(prevFiles)
    })

    if (currentFile?.id === fileId) {
      setCurrentFile(prev => (prev ? { ...prev, content } : null))
    }
  }

  const addUnsavedFile = (fileId: string) => {
    flushSync(() => {
      setUnsavedFiles(prev => {
        const newSet = new Set(prev).add(fileId)
        return newSet
      })
    })
  }

  const removeUnsavedFile = (fileId: string) => {
    flushSync(() => {
      setUnsavedFiles(prev => {
        const newSet = new Set(prev)
        newSet.delete(fileId)
        return newSet
      })
    })
  }

  const clearUnsavedFiles = () => {
    setUnsavedFiles(new Set())
  }

  const resetChanges = () => {
    setFiles(originalFiles)
    if (currentFile) {
      const originalFile = findFileById(originalFiles, currentFile.id)
      setCurrentFile(originalFile)
      clearUnsavedFiles()
    }
    toast({
      title: "Changes Reset",
      description: "Your changes have been reset to the last saved version.",
      duration: 1000,
    })
  }

  const saveChanges = () => {
    setOriginalFiles(files)
    if (currentFile) {
      clearUnsavedFiles()
    }
    toast({
      title: "Changes Saved",
      description: "Your changes have been saved successfully.",
      duration: 1000,
    })
  }

  return (
    <FileContext.Provider
      value={{
        files,
        currentFile,
        setFiles,
        setCurrentFile,
        handleFileSelect,
        updateFileContent,
        resetChanges,
        saveChanges,
        originalFiles,
        unsavedFiles,
        addUnsavedFile,
        removeUnsavedFile,
      }}
    >
      {children}
    </FileContext.Provider>
  )
}

export function useFile() {
  const context = useContext(FileContext)
  if (context === undefined) {
    throw new Error("useFile must be used within a FileProvider")
  }
  return context
}
