import { type LucideIcon } from "lucide-react"
import { ComponentProps } from "react"
import { Sidebar } from "@/components/ui/sidebar"

export interface NavMainItem {
  title: string
  url: string
  icon: LucideIcon
  isActive?: boolean
  items?: Array<{
    title: string
    url: string
    isActive?: boolean
  }>
}

export interface NavProject {
  name: string
  url: string
  icon: LucideIcon
}

export interface NavSecondaryItem {
  title: string
  url: string
  icon: LucideIcon
}

export interface UserInfo {
  name: string
  email: string
  avatar: string
}

export interface AppSidebarLayoutProps extends ComponentProps<typeof Sidebar> {
  className?: string
  navMain: NavMainItem[]
  user: UserInfo
  onLogout: () => void
  children: React.ReactNode
  onNavItemClick?: (url: string) => boolean
}
