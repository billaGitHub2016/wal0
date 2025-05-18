"use client"

import { Settings2, SquareTerminal } from "lucide-react"
import { usePathname } from "next/navigation"

export const routes = [
  {
    title: "Codegen",
    url: "/main/codegen",
    icon: SquareTerminal,
  },
  {
    title: "Settings",
    url: "/main/settings",
    icon: Settings2,
  },
]

export default function useRoutes() {
  const pathname = usePathname()
  return routes.map(route => ({
    ...route,
    isActive: pathname.startsWith(route.url),
  }))
}
