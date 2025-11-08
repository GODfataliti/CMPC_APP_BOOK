import { useLoaderData, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { BookList } from "./components/book-list";
import { BookRequested } from "./components/book-search";
import { ModeToggle } from "@/components/mode-toggle";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { booksStore } from "@/stores";
import { CreateBook } from "./components/create-book";

export default function SearchPage() {
  // -- 1. Manejo del estado.
  const data = useLoaderData({ from: '/dashboard' });
  const { loadRequested, clearParams } = booksStore()
  const { isLoading } = useRouterState();

  // -- 2. Ciclo de vida.
  useEffect(() => {
    clearParams();
    loadRequested(data?.books, data?.page, data?.pages);
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
                <BreadcrumbPage>Listado de Libros</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="ml-auto flex items-center gap-2">
            <CreateBook /> 
            <ModeToggle />
          </div>
        </div>
      </header>
      <div className="p-2 m-2 transition duration-300" style={{ viewTransitionName: 'result-panel' }}>
        <div className="container mx-auto">
          <div className="w-full">
            
            {/* -- Buscador -- */}
            <BookRequested />

            {/* -- Listado de libros --  */}
            <BookList />
          </div>
        </div>
      </div>
    </>
  )
}