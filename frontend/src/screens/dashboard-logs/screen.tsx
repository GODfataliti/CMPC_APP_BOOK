import { useEffect } from "react";
import { useLoaderData } from "@tanstack/react-router";
import { ModeToggle } from "@/components/mode-toggle";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { logsStore } from "@/stores";

export default function LogsPage() {
  // -- 1. Manejo del estado.
  const data = useLoaderData({ from: '/dashboard/logs' });
  const { loadRequested } = logsStore();

  // -- 2. Ciclo de vida.
  useEffect(() => {
    loadRequested(data, 1, 1);
  }, [data])
  // -- 3. Metodos.
  // -- 4. Render.
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex flex-row w-full items-center justify-around gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-2" />

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbPage>Registro de Operaciones</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="ml-auto flex items-center gap-2">
            <ModeToggle />
          </div>
        </div>
      </header>
      <div className="p-2 m-2 transition duration-300" style={{ viewTransitionName: 'result-panel' }}>
        <div className="container mx-auto">
          <div className="w-full">

            {/* -- Listado de libros --  */}
            <BookList />

          </div>
        </div>
      </div>
    </>
  )
}