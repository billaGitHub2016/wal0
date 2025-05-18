"use client"

import { Settings2, SquareTerminal, PanelsTopLeft, Wallet } from "lucide-react"
import { usePathname } from "next/navigation"

export const routes = [
  {
    title: "WebGenerator",
    url: "/main/codegen",
    icon: SquareTerminal,
  },
  // {
  //   title: "Settings",
  //   url: "/main/settings",
  //   icon: Settings2,
  // },
  {
    title: "My Sites",
    url: "/main/my-sites",
    icon: PanelsTopLeft,
  },
  {
    title: "My Wallet",
    url: "/main/wallet",
    icon: Wallet,
  },
]

export default function useRoutes() {
  const pathname = usePathname()
  return routes.map(route => ({
    ...route,
    isActive: pathname.startsWith(route.url),
  }))
}
