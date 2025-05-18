import React, { useState, useCallback } from "react"
import { ProviderModelModalContext } from "./ProviderModelModalContext"
import {
  Model,
  Providers,
} from "@/components/biz/ProviderModelViewer/interface"
import { ProviderModelViewer } from "@/components/biz/ProviderModelViewer"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Loader2, AlertCircle } from "lucide-react"

interface ProviderModelModalProviderProps {
  children: React.ReactNode
  // optional status change callback
  onChange?: (provider: string | undefined, model: Model | undefined) => void
}

/**
 * Provider Model Modal Provider
 * Manages the state of the modal and provides context to children
 */
export const ProviderModelModalProvider: React.FC<
  ProviderModelModalProviderProps
> = ({ children, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [providers, setProviders] = useState<Providers>({})
  const [selectedProvider, setSelectedProvider] = useState<string | undefined>()
  const [selectedModel, setSelectedModel] = useState<Model | undefined>()

  // Open the modal
  const openModal = useCallback(() => {
    setIsOpen(true)
    // Load data on open if not already loaded
    if (Object.keys(providers).length === 0) {
      refreshData()
    }
  }, [providers])

  // Close the modal
  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  // Set selected provider and model
  const setSelected = useCallback(
    (provider: string, model: Model) => {
      setSelectedProvider(provider)
      setSelectedModel(model)

      // Call onChange callback if provided
      if (onChange) {
        onChange(provider, model)
      }

      // Close modal after selection
      closeModal()
    },
    [onChange, closeModal],
  )

  // Refresh data from API
  const refreshData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      // First call the reload API to refresh the configuration
      const reloadResponse = await fetch("/api/config/reload", {
        method: "POST",
      })

      if (!reloadResponse.ok) {
        throw new Error(`Reload API error: ${reloadResponse.status}`)
      }

      // Then fetch the updated configuration
      const response = await fetch("/api/config")

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      setProviders(data.providers || {})
    } catch (err) {
      console.error("Error fetching provider data:", err)
      setError(err instanceof Error ? err : new Error("Unknown error occurred"))
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Render modal content based on loading and error states
  const renderModalContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className="mt-4 text-muted-foreground">
            Loading provider models...
          </p>
        </div>
      )
    }

    if (error) {
      return (
        <div className="my-8 p-4 border border-red-500 rounded-lg bg-red-50 text-red-700 flex items-start gap-2">
          <AlertCircle className="h-5 w-5 mt-0.5" />
          <div>Error loading models: {error.message}</div>
        </div>
      )
    }

    return (
      <ProviderModelViewer
        initialData={providers}
        // onModelSelect={handleModelSelect}
        onRefresh={refreshData}
        showSensitiveInfo={false}
      />
    )
  }

  return (
    <ProviderModelModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        selectedProvider,
        selectedModel,
        setSelected,
        isLoading,
        error,
        refreshData,
      }}
    >
      {children}

      {/* Modal Component */}
      <Dialog open={isOpen} onOpenChange={open => !open && closeModal()}>
        <DialogContent className="max-w-7xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>AI Provider Models</DialogTitle>
            <DialogDescription>
              View and select available AI provider models
            </DialogDescription>
          </DialogHeader>

          {renderModalContent()}
        </DialogContent>
      </Dialog>
    </ProviderModelModalContext.Provider>
  )
}
