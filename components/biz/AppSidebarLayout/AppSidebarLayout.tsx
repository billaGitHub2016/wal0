"use client"

import * as React from "react"
import Link from "next/link"

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
                <Link href="/home">
                  <div className="flex aspect-square size-10 items-center justify-start rounded-lg text-sidebar-primary-foreground">
                    <Logo
                      width={30}
                      height={30}
                      className="sm:w-[50px] sm:h-[50px] text-purple-500 "
                    />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <div className="truncate font-semibold inline-block bg-clip-text">
                      Wal0
                    </div>
                    <div className="truncate text-primary/50 text-[11px]">
                      Website Code Generator
                    </div>
                  </div>
                </Link>
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
