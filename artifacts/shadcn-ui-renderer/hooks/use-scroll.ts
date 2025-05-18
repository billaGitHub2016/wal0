import { DependencyList, useCallback, useEffect } from "react"

import { RefObject } from "react"

export const useScrollToBottom = (
  ref: RefObject<HTMLDivElement>,
  deps: DependencyList,
) => {
  const scrollToBottom = useCallback(() => {
    const viewport = ref.current?.querySelector(
      "[data-radix-scroll-area-viewport]",
    )
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight
    }
  }, [ref])

  useEffect(() => {
    if (deps.length > 0) {
      scrollToBottom()
    }
  }, [scrollToBottom, ...deps])

  return scrollToBottom
}
