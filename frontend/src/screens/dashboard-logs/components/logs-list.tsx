import { useRouterState } from "@tanstack/react-router";
import LogCard from "./log-card";
import type { Log } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { logsStore } from "@/stores";

export function LogList() {
  // 1. Manejo de estado.
  const { logs } = logsStore();
  const { isLoading } = useRouterState();
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

  return (
    <div>
      {/* -- Detalles -- */}
      <div className="mx-4 pb-4 border-b border-gray-200 mb-4">
        <p className="text-md font-bold">Modificaciones ({logs.length})</p>
      </div>
      {/* -- Paginación -- */}
      {/* <LogsPagination /> */}

      {/* -- Consultas -- */}
      <ScrollArea className="h-[calc(100vh-200px)] w-full items-center">
        {logs.map((log: Log, index: number) => {
          return (
            <LogCard log={log} index={index} key={index} />
          )
        })}
      </ScrollArea>

      {/* -- Paginación -- */}
      {/* <LogsPagination /> */}
    </div>
  );
}