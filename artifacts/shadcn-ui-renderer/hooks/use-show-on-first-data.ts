import { useEffect, useState } from "react"

/**
 * A hook that determines whether to show content based on initial data existence
 * Only shows content if data exists on first check, then maintains visibility
 *
 * @param data - The data array to check
 * @returns boolean indicating whether the content should be shown
 */
export function useShowOnFirstData<T>(data: T[] | undefined): boolean {
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    if (!shouldShow) {
      setShouldShow(!!data?.length)
    }
  }, [data, shouldShow])

  return shouldShow
}
