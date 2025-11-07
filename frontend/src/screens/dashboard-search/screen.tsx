import { useLoaderData, useNavigate, useRouterState } from "@tanstack/react-router";
import { Label } from "@radix-ui/react-label";
import { Book, Check, Search } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
// import type { ChangeEvent, FormEvent } from "react";
import { BookList } from "./components/book-list";
import { ModeToggle } from "@/components/mode-toggle";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Checkbox } from "@/components/ui/checkbox";
import { booksStore } from "@/stores";
import { BookRequested } from "./components/book-search";

export default function Screen() {
  // -- 1. Manejo del estado.
  const data = useLoaderData({ from: '/dashboard' });
  const { loadRequested, clearParams } = booksStore()
  const { isLoading } = useRouterState();

  // -- 2. Ciclo de vida.
  useEffect(() => {
    clearParams();
    loadRequested(data?.searches, data?.stats, data?.page, data?.pages);
  }, [data])
  // -- 3. Metodos.
  const onClean = () => {
    setGlobalSearch('')
  }

  const onSearch = () => {
    try {
      // -- Validar form.
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message ?? 'Problemas con la busqueda ingresado');
      onClean();
    }
  }

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