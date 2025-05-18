import React from "react"
import { useTheme } from "next-themes"

export const ThemeObserver = () => {
  const { setTheme } = useTheme()

  React.useEffect(() => {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === "class") {
          const htmlElement = document.documentElement
          const theme = htmlElement.classList.contains("dark")
            ? "dark"
            : "light"
          localStorage.setItem("theme", theme)
          setTheme(theme)
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  return null
}
