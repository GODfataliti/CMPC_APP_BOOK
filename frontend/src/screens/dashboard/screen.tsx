import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

interface Props {
  children?: React.ReactNode
}

export default function DashboardPage(props: Props) {
  // 1. Manejo de estado.
  const { children } = props;

  // 2. Ciclo de vida.
  // 3. Metodos.
  // 4. Render.
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
