import { FileText } from "lucide-react";
import { useLoaderData, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props {
  index?: number;
  book?: any;
}

export default function BookCard(props: Props) {
  // -- 1. Manejo de estado.
  const { book } = props;
  const [statusBg, setStatusBg] = useState<string>('')
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
    }
  }
  const mappingImage = () => {
    return <img src='/assets/book_found.png' className="object-cover rounded shadow w-32 h-32" />
  }

  // -- 4. Render.
  return (
    <Card className="p-4 m-0" style={{ viewTransitionName: 'container-form' }}>
      <CardTitle className="flex flex-row items-center justify-center md:justify-start gap-1 md:mx-4">
        <FileText className="h-5 w-5" />
        <h1>Resultados de la busqueda</h1>
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
              <p className="text-sm font-bold opacity-80">El imperio final</p>
            </div>

            <div>
              <p className="text-sm opacity-50">Detalles</p>
              <div className="flex flex-col items-start justify-start gap-1 flex-wrap">
                <p className="font-semibold text-xs md:text-sm">Autor: {`Brandon Sanderson`}</p>
                <p className="font-semibold text-xs md:text-sm">Editorial: {`Nova`}</p>
                <p className="font-semibold text-xs md:text-sm">Año de lanzamiento: {`2016`}</p>
                <p className="font-semibold text-xs md:text-sm">Paginas: {`980`}</p>
                <Badge variant="default" className={`h-6 select-none items-center ${statusBg}`}>
                  <p className="text-xs items-center">{book?.availability ? 'Disponible' : 'Agotado'}</p>
                </Badge>
              </div>
            </div>

            <div>
              <p className="text-sm opacity-50">Ultima modificación</p>
              <p className="font-semibold text-xs md:text-md">{new Date().toLocaleDateString("es-CL")}</p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card >
  )
}