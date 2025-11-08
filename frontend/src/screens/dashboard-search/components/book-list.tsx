import { Link, useNavigate, useRouterState } from "@tanstack/react-router"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { BookText, NotepadTextDashed } from "lucide-react"
import { BookPagination } from "./book-pagination"
import BookCard from "./book-card"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { booksStore } from "@/stores"


interface Props {
  className?: string;
}

export function BookList(props: Props) {
  // 1. Variables
  const { className } = props;
  const { books } = booksStore()
  const { isLoading } = useRouterState();

  const navigate = useNavigate()

  // 2. Ciclo de vida.
  // 3. Metodos.

  // 4. Render.
  if (isLoading) {
    return (
      <div>
        {/* -- Detalles -- */}
        <div className="m-4">
          <Skeleton className="w-40 h-4 bg-gray-200 mb-2" />
          <Skeleton className="w-80 h-4 bg-gray-200 mb-2" />
        </div>

        {/* -- Consultas -- */}
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="m-4">
            <Skeleton className="w-full h-60 bg-gray-200 mb-2" />
          </div>
        ))}
      </div>
    )
  }
  // if (!books || books?.length === 0) {
  //   return (
  //     <div className="m-4">

  //       <div className="flex flex-col items-center justify-center w-full min-h-[200px] border border-dashed border-gray-200 rounded-lg p-4">
  //         <BookText className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-2" />
  //         <p className="text-md font-semibold text-gray-400 dark:text-gray-500">No se encontraron libros asociados a la búsqueda</p>
  //       </div>
  //     </div>
  //   )
  // }
  return (
    <div>
      {/* -- Paginación -- */}
      <BookPagination />

        {/* -- Consultas -- */}
        <ScrollArea className="h-[calc(98vh-200px)] w-full items-center">
        <div className={cn("grid p-0 lg:grid-cols-3 md:grid-cols-2 gap-2.5 sm:grid-cols-2 pt-4 m-2", className)} {...props}>
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          {/* {books?.map((book: any, index: number) => {
            return (
              <BookCard book={book} index={index} key={index} />
            )
          })} */}
        </div>
        </ScrollArea>

      {/* -- Paginación -- */}
      <BookPagination />
    </div>
  )
}
