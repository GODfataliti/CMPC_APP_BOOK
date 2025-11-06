"use client"

import {
  BadgeCheck,
  ChevronsUpDown,
  LogOut,
} from "lucide-react"
import { Link, useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"
import {
  Avatar,
  AvatarFallback,
  // AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { sessionStore, userStore } from "@/stores"
// import { logout } from "@/services/auth"

export function NavUser() {
  // 1. Manejo del estado.
  const { isMobile } = useSidebar();
  const { removeUser, name } = userStore();
  const { removeSession } = sessionStore();
  const navigate = useNavigate();

  // 2. Ciclo de vida.
  // 3. Metodos.
  const onSignOut = async () => {
    // await logout(sessionID);

    removeUser();
    removeSession();

    toast.success("Sesión cerrada correctamente");
    navigate({
      to: '/',
    });
  }

  const mappingAvatar = () => {
    const avatarName: string = name ?? "Joe Doe";

    // if (imageURL) {
    //   return <AvatarImage src={imageURL} alt={name} />
    // }
    const initials = avatarName
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase()

    return <AvatarFallback className="bg-primary text-primary-foreground rounded-lg">{initials}</AvatarFallback>;
  }

  // 4. Render
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {mappingAvatar()}
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{name}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {mappingAvatar()}
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{name}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link to='/dashboard/account' preload={false}>
                  <BadgeCheck />
                  <p>Mi cuenta</p>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem onClick={onSignOut}>
              <LogOut />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
