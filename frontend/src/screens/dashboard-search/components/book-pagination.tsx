import { useRouterState } from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton";
// import { getByCompanyAndParams } from "@/services/search-queries";
// import type { GetByCompanyAndParamsDTO } from "@/services/search-queries/DTOs/get-by-company.dto";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { booksStore } from "@/stores";

export function BookPagination() {
  // 1. Manejo de estado.
  const { 
    loadRequested,
    page,
    pages,
  } = booksStore()
  // const search = useSearch({ from: '/dashboard/requested' });
  const { isLoading } = useRouterState();

  // const page: number = search.page ?? 1;
  // const pages: number = data?.pages ?? 1;

  // 2. Ciclo de vida.
  // 3. Metodos.
  const onPrevPage = async() => {
    if (isLoading) return;
    const search: any = {
      page: Number(page)-1,
    }
    // await getByCompanyAndParams(companyID, search).then((res) => {
    //   loadRequested(res?.searches, res?.stats, res?.page, res?.pages);
    // })
  }

  const onNextPage = async() => {
    if (isLoading) return;
    const search: any = {
      page: Number(page)+1,
      // PARAMS
    }
    // await getByCompanyAndParams(companyID, search).then((res) => {
    //   loadRequested(res?.searches, res?.stats, res?.page, res?.pages);
    // })
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