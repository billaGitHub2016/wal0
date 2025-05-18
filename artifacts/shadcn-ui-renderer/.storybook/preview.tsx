import React from "react"
import type { Preview } from "@storybook/react"
import { ThemeProvider, useTheme } from "next-themes"
import { Toaster } from "../components/ui/toaster"
import "../app/globals.css"

import { withThemeByClassName } from "@storybook/addon-themes"
import { ThemeObserver } from "./ThemeObserver"
import { themes } from "@storybook/theming"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        mobile1: {
          name: "Mobile (360px)",
          styles: {
            width: "360px",
            height: "640px",
          },
        },
        tablet: {
          name: "Tablet (768px)",
          styles: {
            width: "768px",
            height: "1024px",
          },
        },
        desktop: {
          name: "Desktop (1280px)",
          styles: {
            width: "1280px",
            height: "800px",
          },
        },
      },
    },
    docs: {
      theme:
        localStorage.getItem("theme") === "dark" ? themes.dark : themes.light,
    },
  },
}

export const decorators = [
  Story => {
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ThemeObserver />
        <Story />
        <Toaster />
      </ThemeProvider>
    )
  },
  withThemeByClassName({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "dark",
  }),
]

export default preview
