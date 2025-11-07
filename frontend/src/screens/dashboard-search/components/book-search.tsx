import { useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import type { SearchBook } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { booksStore } from "@/stores";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function BookRequested() {
  // 1. Manejo de estado.
  const { loadRequested, loadParams, page } = booksStore();
  const [isAdvancedSearch, setIsAdvancedSearch] = useState<boolean>(false);
  const { isLoading } = useRouterState();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [globalSearch, setGlobalSearch] = useState<string>('');
  const [advanceSearch, setAdvanceSearch] = useState<SearchBook>({
    title: '',
    category: '',
    author: '',
    publisher: '',
    available: false,
  });


  // 2. Ciclo de vida.
  // 3. Metodos.
  const onSearch = async() => {
    setDisabled(true);
    const values = globalSearch.split(' ')
    const search: any = {
      page: 1,
      // PARAMS
      firstName: values[0] ?? '',
      secondName: values[1] ?? '',
      firstSurname: values[2] ?? '',
      secondSurname: values[3] ?? '',
    }
    setDisabled(false);
    // loadParams(search?.firstName ?? '', search.secondName ?? '', search.firstSurname ?? '', search.secondSurname ?? '')
    // await getByCompanyAndParams(companyID, search).then((res) => {
    //   loadRequested(res?.searches, res?.stats, res?.page, res?.pages);
    // }).finally(() => {
    //   setDisabled(false);
    // })
  }
  
  const onClean = () => {
    setIsAdvancedSearch(!isAdvancedSearch)
    setGlobalSearch('');
    setAdvanceSearch({
      title: '',
    category: '',
    author: '',
    publisher: '',
    available: false,
    });
  }

  // 4. Render.
  if (isLoading) {
    return (
      <Skeleton className="w-full flex flex-col m-2 p-2 gap-2">
        <div>
          <Skeleton className="w-40 h-4 bg-gray-200" />
          <Skeleton className="w-32 h-6 bg-gray-200 mt-1" />
        </div>
      </Skeleton>
    )
  }

  return (
    <section className="w-full flex flex-col m-2 p-2 gap-2">
      {isAdvancedSearch ? (
        <p className="text-sm text-start font-medium">Busca por genero, autor, editorial o disponibilidad del libro</p>
      ) : (
        <p className="text-sm text-start font-medium">Busca por título, autor o ISBN del libro</p>
      )}

      <div className="flex flex-row gap-2 justify-between items-center w-full">
        {isAdvancedSearch ? (
          <div className="flex flex-col md:flex-row items-center space-x-2 space-y-4 md:space-y-0">
            {/* BUSQUEDA AVANZADA */}
            <Input
              placeholder="Título"
              className="grow md:basis-[70%] md:max-w-[70%] sm:basis-[60%] sm:max-w-[60%]"
              value={advanceSearch.title}
              onChange={(e) => setAdvanceSearch({ ...advanceSearch, title: e.target.value })}
            />
            <Input
              placeholder="Genero"
              className="grow md:basis-[70%] md:max-w-[70%] sm:basis-[60%] sm:max-w-[60%]"
              value={advanceSearch.category}
              onChange={(e) => setAdvanceSearch({ ...advanceSearch, category: e.target.value })}
            />
            <Input
              placeholder="Autor"
              className="grow md:basis-[70%] md:max-w-[70%] sm:basis-[60%] sm:max-w-[60%]"
              value={advanceSearch.author}
              onChange={(e) => setAdvanceSearch({ ...advanceSearch, author: e.target.value })}
            />
            <Input
              placeholder="Editorial"
              className="grow md:basis-[70%] md:max-w-[70%] sm:basis-[60%] sm:max-w-[60%]"
              value={advanceSearch.publisher}
              onChange={(e) => setAdvanceSearch({ ...advanceSearch, publisher: e.target.value })}
            />
            <div className="flex gap-2 m-2 items-center">
              <Checkbox
                checked={advanceSearch.available}
                onCheckedChange={(checked) => setAdvanceSearch({ ...advanceSearch, available: checked as boolean })}
                id="search-isbn" />
              <Label
                htmlFor="text-search"
                className="text-sm font-semibold"
              >
                Disponible
              </Label>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center space-x-2 w-full space-y-4 md:space-y-0">
            {/* BUSQUEDA GLOBAL */}
            <Input
              placeholder="Título, autor o ISBN del libro"
              className="grow md:basis-[85%] md:max-w-[90%] sm:basis-[70%] sm:max-w-[70%]"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
            />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <Button onClick={onClean}>Avanzado</Button>
          <Button
            onClick={onSearch}
            variant="default"
            className="flex items-center gap-2"
            disabled={(!disabled)}
          >
            <Search className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            Buscar
          </Button>
        </div>
      </div>
    </section>
  )
}