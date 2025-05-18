"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarProvider,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { NavMain } from "./components/NavMain"
import { NavUser } from "./components/NavUser"
import type { AppSidebarLayoutProps } from "./interface"
import { Logo } from "@/components/biz/Logo"

export function AppSidebarLayout({
  navMain,
  user,
  onLogout,
  onNavItemClick,
  children,
  ...props
}: AppSidebarLayoutProps) {
  return (
    <SidebarProvider>
      <Sidebar variant="inset" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <div className="flex aspect-square size-10 items-center justify-start rounded-lg text-sidebar-primary-foreground">
                    <Logo />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <div className="truncate font-semibold inline-block bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                      Compoder
                    </div>
                    <div className="truncate text-primary/50 text-[11px]">
                      Component Code Generator
                    </div>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={navMain} onNavItemClick={onNavItemClick} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={user} onLogout={onLogout} />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
