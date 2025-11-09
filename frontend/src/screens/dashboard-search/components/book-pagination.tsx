import { useRouterState } from "@tanstack/react-router";
import type { QueryParams } from "@/services/book/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { booksStore } from "@/stores";
import { getBooksByParams } from "@/services/book";

export function BookPagination() {
  // 1. Manejo de estado.
  const { 
    loadRequested,
    page,
    pages,
    general,
    title,
    category,
    author,
    publisher,
    available,
    isAdvanceSearch,
  } = booksStore()
  const { isLoading } = useRouterState();

  // 2. Ciclo de vida.
  // 3. Metodos.
  const onPrevPage = async() => {
    if (isLoading) return;
    // @follow-up: Agregar los demas parametros de busqueda en base a los filtros actuales.
    const search: QueryParams = {
      page: Number(page)-1,
      general,
      title,
      category,
      author,
      publisher,
      available,
      isAdvanceSearch,
    }
    await getBooksByParams(search).then((res) => {
      loadRequested(res.books, res.page, res.pages);
    })
  }

  const onNextPage = async() => {
    if (isLoading) return;
    // @follow-up: Agregar los demas parametros de busqueda en base a los filtros actuales.
    const search: QueryParams = {
      page: Number(page)+1,
      general,
      title,
      category,
      author,
      publisher,
      available,
      isAdvanceSearch,
    }
    await getBooksByParams(search).then((res) => {
      loadRequested(res.books, res.page, res.pages);
    })
  }

  // 4. Render.
  if (isLoading) {
    return (
      <div className="w-full flex flex-col justify-center items-center py-2">
        <div className="flex flex-row gap-1">
          <Skeleton className="w-20 h-8" />
          <Skeleton className="w-8 h-8" />
          <Skeleton className="w-20 h-8" />
        </div>
      </div>
    )
  }

  if (pages === 1) {
    return null;
  }

  return (
    <Pagination className="w-full flex flex-col justify-center items-center py-1">
      <PaginationContent>
        <PaginationItem>
          {page === 1 ? (
            null
          ) : (
            <PaginationPrevious onClick={onPrevPage} />
          )}
        </PaginationItem>

        <PaginationItem>
          <PaginationLink>{page}</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          {page >= pages ? (
            null
          ) : (
            <PaginationNext onClick={onNextPage} />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}