import { useProviderModelModalContext } from "./ProviderModelModalContext"

/**
 * Hook for using the Provider Model Modal
 * This hook provides an easy way to access and control the modal from any component
 */
const useProviderModelModal = () => {
  const context = useProviderModelModalContext()

  if (!context) {
    throw new Error(
      "useProviderModelModal must be used within a ProviderModelModalProvider",
    )
  }

  return context
}

export default useProviderModelModal
