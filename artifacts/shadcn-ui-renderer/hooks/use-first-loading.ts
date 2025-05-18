import { useEffect, useState } from "react"

/**
 * A hook that tracks the first loading state
 * Only shows loading state on first load, then maintains false
 *
 * @param isLoading - The current loading state
 * @returns boolean indicating whether to show loading state
 */
export function useFirstLoading(isLoading: boolean): boolean {
  const [shouldShowLoading, setShouldShowLoading] = useState(true)

  useEffect(() => {
    if (shouldShowLoading && !isLoading) {
      setShouldShowLoading(false)
    }
  }, [isLoading, shouldShowLoading])

  return shouldShowLoading && isLoading
}
