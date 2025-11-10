"use client"

import * as React from "react"
import {
  BookOpenText,
  Building2,
  LifeBuoy,
  Logs,
} from "lucide-react"
import { Link, useRouterState } from "@tanstack/react-router"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // 1. Manejo del estado.
  const { location } = useRouterState();

  // 2. Ciclo de vida.
  // 3. Metodos.
  // 4. Render.
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div>
                <div className="flex aspect-square size-8 items-center justify-center rounded bg-sidebar-primary text-sidebar-primary-foreground">
                  <div className="h-full w-full bg-primary flex items-center justify-center rounded">
                    <Building2 className="w-6 h-6" />
                  </div>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-wrap">CMPC</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* -- Menu Principal -- */}
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === '/dashboard'}
                  size={"lg"}
                >
                  <Link to='/dashboard' viewTransition={true} preload={false}>
                    <BookOpenText />
                    <span>Buscador Libros</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === '/dashboard/logs'}
                  size={"lg"}
                >
                  <Link to='/dashboard/logs' viewTransition={true} preload={false}>
                    <Logs />
                    <span>Registro de Modificaciones</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>


            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* -- Menu Secundario -- */}
        <SidebarGroup className="mt-auto" >
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild size="sm" disabled={true}>
                  <Link to='/dashboard' viewTransition={true} preload={false}>
                    <LifeBuoy />
                    <span>Soporte</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
