import { BookMarked } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Book } from "@/types";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props {
  index?: number;
  book?: Book;
}

export default function BookCard(props: Props) {
  // -- 1. Manejo de estado.
  const { book, index } = props;
  const [statusBg, setStatusBg] = useState<string>('')
  const navigate = useNavigate();
  // -- 2. Ciclo de vida.
  useEffect(() => {
    backgroundColor()
  }, [book])
  // -- 3. Metodos.
  const backgroundColor = () => {
    switch(book?.availability) {
      case true:
        return setStatusBg('bg-green-500')
      case false:
        return setStatusBg('bg-red-500')
      default:
        return setStatusBg('bg-red-500')
    }
  }
  const mappingImage = () => {
    if (book?.coverImage) {
      return <img key={`${book.bookID}-${index}`} src={book.coverImage} className="object-cover rounded shadow w-32 h-32" />
    }
    return <img src='/assets/book_found.png' className="object-cover rounded shadow w-32 h-32" />
  }
  const onDetailBook = () => {
    try {
      navigate({
        to: `/dashboard/book/${book?.bookID}`,
      });
    } catch (err: unknown) {
      console.error(err);
      toast.error('Problemas al obtener la información del libro');
    }
  }

  // -- 4. Render.
  return (
    <Card
      key={`${book?.bookID}-${index}`}
      className="p-4 m-0 transition-transform duration-200 ease-in-out hover:scale-[1.03] hover:shadow-lg cursor-pointer"
      onClick={onDetailBook}
    >
      <CardTitle className="flex flex-row items-center justify-center md:justify-start gap-1 md:mx-4">
        <BookMarked className="h-5 w-5" />
        <h1>{book?.title}</h1>
      </CardTitle>

      <CardContent className="pb-2 m-0">
        <div className="flex flex-row gap-1 pb-4 items-center">
          {/* IMAGEN */}
          <div className="w-32 h-32 bg-accent rounded">
            {mappingImage()}
          </div>
          {/* DETALLES */}
          <div className="flex flex-col gap-1 pl-4">
            <div>
              <p className="text-sm opacity-50">Detalles</p>
              <div className="flex flex-col items-start justify-start gap-1 flex-wrap">
                <p className="font-semibold text-xs md:text-sm">Autor: {book?.author?.name}</p>
                <p className="font-semibold text-xs md:text-sm">Editorial: {book?.publisher?.name}</p>
                {/* <p className="font-semibold text-xs md:text-sm">ISBN: {book?.ISBN}</p> */}
                <p className="font-semibold text-xs md:text-sm">Generos: {book?.category?.name}</p>
                <p className="font-semibold text-xs md:text-sm">Paginas: {book?.page}</p>
                <p className="font-semibold text-xs md:text-sm">Precio: {book?.price}</p>
                <Badge variant="default" className={`h-6 select-none pointer-events-none items-center ${statusBg} hover:bg-inherit hover:cursor-default`}>
                  <p className="text-xs items-center">{book?.availability ? 'Disponible' : 'Agotado'}</p>
                </Badge>
              </div>
            </div>

            <div>
              <p className="text-sm opacity-50">Ultima modificación</p>
              <p className="font-semibold text-xs md:text-md">{book?.updatedAt ? new Date(book.updatedAt).toLocaleString() : '-'}</p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card >
  )
}