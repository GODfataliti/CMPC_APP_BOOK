import { CalendarSync, FileUser, UserPen } from "lucide-react";
import { useEffect, useState } from "react";
import type { Log } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/utils";

interface Props {
  index?: number;
  log?: Log;
}

export default function LogCard(props: Props) {
  // -- 1. Manejo de estado.
  const { log, index } = props;
  const [statusBg, setStatusBg] = useState<string>('')
  // -- 2. Ciclo de vida.
  useEffect(() => {
    backgroundColor()
  }, [log])
  // -- 3. Metodos.
  const backgroundColor = () => {
    switch(log?.action) {
      case 'CREATE':
        return setStatusBg('bg-green-500')
      case 'UPDATE':
        return setStatusBg('bg-blue-500')
      case 'DELETE':
        return setStatusBg('bg-red-500')
      default:
        return setStatusBg('bg-red-500')
    }
  }


  // -- 4. Render.
  return (
    <Card key={`${log?.logId}-${index}`} className="m-4 p-0 gap-0 border-l-3 border-l-primary shadow-sm hover:shadow-md transition duration-300 ease-in-out">
      <CardContent className="mx-4 my-2 p-1 flex flex-col">
        <div className="">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-2">
            <div className="flex flex-row items-center justify-center md:justify-start gap-2.5 md:gap-2">
              <Badge variant="outline" className="h-6 select-none">
                <p className="text-xs">#{log?.logId}</p>
              </Badge>
              <Badge variant="default" className={`h-6 select-none ${statusBg}`}>
                <p className="text-xs">{log?.action ?? 'Desconocido'}</p>
              </Badge>
            </div>
          </div>

          <div className="flex flex-row items-center justify-start gap-4">
            <div className="flex items-center justify-center p-2">
              <FileUser className="w-8 h-8 stroke-primary" />
            </div>

            <div className="py-2">
              <div className="grid md:grid-cols-2 gap-4 sm:grid-cols-1">
                <p className="text-lg md:text-xl font-semibold">Usuario: {log?.userId ?? ""}</p>
                <p className="text-lg md:text-xl font-semibold">Coleccion afectada: {log?.entity ?? ""}</p>
                <p className="text-lg md:text-xl font-semibold">Fecha: {formatDate(log?.createdAt)}</p>
                <p className="text-lg md:text-xl font-semibold">Identificador: {log?.entityId ?? ""}</p>
              </div>
            </div>

          </div>
        </div>

        <Separator className="my-2" />
        <div className="flex flex-row items-center justify-start gap-4">
          <div className="flex p-2">
            <UserPen className="w-8 h-8 stroke-primary" />
          </div>

          <div className="flex flex-col gap-0 flex-wrap py-1">
            <div className="flex flex-row gap-1">
              <p className="text-md font-semibold">{log?.user.email ?? ''}</p>
            </div>
          </div>
        </div>
      </CardContent >

      <CardFooter className="mx-2 mb-1 flex justify-end">
        <div className="flex flex-row items-center justify-center gap-2.5">
          <CalendarSync className="w-4 h-4 light:stroke-gray-500 opacity-60" />
          <p className="text-xs text-gray-400 select-none opacity-80 text-wrap">Última actualización: {formatDate(log?.updatedAt)}</p>
        </div>
      </CardFooter>
    </Card >
  )
}