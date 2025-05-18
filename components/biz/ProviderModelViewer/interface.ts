/**
 * Provider Model Viewer Interface
 */

export interface Model {
  model: string
  title: string
  baseURL?: string
  apiKey?: string
}

export interface Provider {
  provider: string
  models: Model[]
}

export interface Providers {
  [key: string]: Provider
}

interface ProviderModelViewerProps {
  /**
   * Initial provider and model data
   */
  initialData: Providers
  /**
   * Whether to show sensitive information (API keys)
   */
  showSensitiveInfo?: boolean
  /**
   * Callback when a model is selected
   */
  onModelSelect?: (provider: string, model: Model) => void
  /**
   * Callback when refresh button is clicked
   */
  onRefresh?: () => void
}

export type { ProviderModelViewerProps }
