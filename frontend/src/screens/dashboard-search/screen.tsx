import { useNavigate, useRouterState } from "@tanstack/react-router";
import { Label } from "@radix-ui/react-label";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
// import type { ChangeEvent, FormEvent } from "react";
import { ModeToggle } from "@/components/mode-toggle";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Screen() {
  // -- 1. Manejo del estado.
  const [search, setSearch] = useState<string>('');
  const { isLoading } = useRouterState();
  const navigate = useNavigate();

  // -- 2. Ciclo de vida.
  // -- 3. Metodos.
  const onClean = () => {
    setSearch('')
  }

  const onSearch = () => {
    try {
      // -- Validar form.
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message ?? 'Problemas con el rut ingresado');
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

      <div className="p-2 m-2 transition-all duration-300" style={{ viewTransitionName: 'result-panel' }}>
        <div className="container mx-auto">
          <div className="w-full">
            {/* -- Barra de búsqueda -- */}
            <div className="w-full pt-4">
              <Card className="max-w-2xl mx-auto p-4" style={{ viewTransitionName: 'container-form' }}>
                <form className="flex flex-col space-y-2" onSubmit={(e) => e.preventDefault()}>
                  <Label
                    htmlFor="RUT"
                    className="text-sm font-semibold"
                  >
                    RUT del prospecto
                  </Label>

                  <div className="flex flex-col md:flex-row items-center space-x-2 space-y-4 md:space-y-0">
                    <div className="relative flex-1 w-full">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                        <Search className="h-4 w-4" />
                      </span>
                      {/* <Input
                        id="RUT"
                        type="text"
                        className="w-full pl-10 transition-none md:transition-all ease-in-out duration-300"
                        inputMode="text"
                        placeholder="Ej: 12345678-9"
                        onInput={onInputRut}
                        onChange={onChangeRut}
                        value={rut}
                        maxLength={12}
                        minLength={2}
                        autoComplete="on"
                        autoFocus
                        required
                        style={{ viewTransitionName: 'input-rut' }}
                        disabled={isLoading}
                      /> */}
                    </div>

                    <Button
                      className="w-full md:w-auto"
                      onClick={onSearch}
                      disabled={isLoading}
                    >
                      Buscar
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}