import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbList,
  BreadcrumbLink,
  BreadcrumbItem,
} from "@/components/ui/breadcrumb"
import type { AppHeaderProps } from "./interface"
import React from "react"
import Link from "next/link"

export function AppHeader({
  className,
  breadcrumbs,
  showSidebarTrigger = true,
}: AppHeaderProps) {
  return (
    <header
      className={`flex h-16 shrink-0 items-center gap-2 ${className || ""}`}
    >
      <div className="flex items-center gap-2 px-4">
        {showSidebarTrigger && (
          <>
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </>
        )}
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs?.map((item, index) => (
              <React.Fragment key={item.label}>
                <BreadcrumbItem
                  className={
                    index < breadcrumbs.length - 1 ? "hidden md:block" : ""
                  }
                >
                  {item.href ? (
                    <BreadcrumbLink asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && (
                  <BreadcrumbSeparator className="hidden md:block" />
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}
