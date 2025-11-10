import { useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import type { SearchBook } from "@/types";
import type { QueryParams } from "@/services/book/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { booksStore } from "@/stores";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getBooksByParams } from "@/services/book";

export function BookRequested() {
  // 1. Manejo de estado.
  const { loadRequested, loadParams } = booksStore();
  const [isAdvancedSearch, setIsAdvancedSearch] = useState<boolean>(false);
  const { isLoading } = useRouterState();
  // const [disabled, setDisabled] = useState<boolean>(false);
  const [globalSearch, setGlobalSearch] = useState<string>('');
  const [advanceSearch, setAdvanceSearch] = useState<SearchBook>({
    title: '',
    category: '',
    author: '',
    publisher: '',
    available: null,
  });


  // 2. Ciclo de vida.
  // 3. Metodos.
  const onSearch = async() => {
    console.log(advanceSearch);
    const search: QueryParams = {
      page: 1,
      // PARAMS
      isAdvanceSearch: isAdvancedSearch,
      general: globalSearch,
      title: advanceSearch.title,
      category: advanceSearch.category,
      author: advanceSearch.author,
      publisher: advanceSearch.publisher,
      available: advanceSearch.available,
    }
    // setDisabled(false);
    loadParams(search.general ?? '', search.title ?? '', search.category ?? '', search.author ?? '', search.publisher ?? '', search.available ?? null, search.isAdvanceSearch ?? false);
    await getBooksByParams(search).then((res) => {
      loadRequested(res.books, res.page, res.pages);
    }).finally(() => {
      // setDisabled(false);
    })
  }
  
  const onClean = () => {
    setIsAdvancedSearch(!isAdvancedSearch)
    setGlobalSearch('');
    setAdvanceSearch({
      title: '',
      category: '',
      author: '',
      publisher: '',
      available: null,
    });
  }

  // 4. Render.
  if (isLoading) {
    return (
      <section className="w-full flex flex-row items-center justify-between gap-2 p-4 animate-pulse">
        <Skeleton className="h-10 w-full md:w-3/4 rounded-md bg-muted/40" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-24 rounded-md bg-muted/40" />
          <Skeleton className="h-10 w-28 rounded-md bg-muted/40" />
        </div>
      </section>
    );
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
              <Select onValueChange={(value) =>
                setAdvanceSearch({
                  ...advanceSearch,
                  available:
                    value === "null" ? null : value === "true" ? true : false,
                })
              }>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Disponibilidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">Todos</SelectItem>
                  <SelectItem value="true">Disponibles</SelectItem>
                  <SelectItem value="false">Agotados</SelectItem>
                </SelectContent>
              </Select>
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
            // disabled={(!disabled)}
          >
            <Search className={`w-4 h-4`} />
            Buscar
          </Button>
        </div>
      </div>
    </section>
  )
}