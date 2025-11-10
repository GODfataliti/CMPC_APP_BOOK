import type { Book } from '@/types'
import { Separator } from '@/components/ui/separator'

interface DetailProps {
  book: Book;
}

export function Detail(props: DetailProps) {
  // 1. Variables.
  const { book } = props;
  // 2. Ciclo de vida.
  // 3. Metodos.
  // 4. Render.
  return (
    <div className="w-full md:w-1/2 flex flex-col gap-3">
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <Separator className="my-1" />

      <div className="text-sm space-y-1">
        <p><span className="font-semibold">Autor:</span> {book.authorID}</p>
        <p><span className="font-semibold">Editorial:</span> {book.publisherID ?? "No especificado"}</p>
        <p><span className="font-semibold">Categorías:</span> {book.categoryID ?? "Sin categorías"}</p>
        <p><span className="font-semibold">Páginas:</span> {book.page ?? "-"}</p>
        <p><span className="font-semibold">Precio:</span> {book.price ? `$${book.price}` : "No definido"}</p>
        <p><span className="font-semibold">Stock:</span> {book.stock ?? 0}</p>
        <p>
          <span className="font-semibold">Disponibilidad:</span>{" "}
          <span
            className={`font-medium ${
              book.availability ? "text-green-600" : "text-red-500"
            }`}
          >
            {book.availability ? "Disponible" : "Agotado"}
          </span>
        </p>
      </div>
    </div>
  )
}