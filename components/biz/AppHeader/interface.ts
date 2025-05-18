export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface AppHeaderProps {
  className?: string
  breadcrumbs?: BreadcrumbItem[]
  showSidebarTrigger?: boolean
}
