import { useMemo, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";
import booksData from "../mocks/books.mock.json";
import { BookPagination } from "./book-pagination";
import BookCard from "./book-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  className?: string;
}

export function BookList({ className }: Props) {
  // 1. Manejo de estado.
  const books = booksData.books;
  const [sortFields, setSortFields] = useState<Array<string>>([]); // e.g. ['author', 'release']
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const { isLoading } = useRouterState();
  const sortedBooks = useMemo(() => {
    if (!books) return [];
    if (sortFields.length === 0) return books;

    const getValue = (item: any, field: string) => {
      const raw = item?.[field];

      // Disponibilidad: tratar null como false
      if (field === "availability") {
        if (raw === true) return true;
        return false; // false o null o undefined => false
      }

      // Si viene como array (ej: categories) tomar primera entrada o join
      if (Array.isArray(raw)) {
        return raw.filter(Boolean).join(", ") || "";
      }

      // Normal strings / numbers / booleans
      if (raw === null || raw === undefined) return "";

      return raw;
    };

    return [...books].sort((a, b) => {
      for (const field of sortFields) {
        const va = getValue(a, field);
        const vb = getValue(b, field);

        // booleans (availability) ya normalizados a true/false
        if (typeof va === "boolean" && typeof vb === "boolean") {
          // convert to numbers for comparison (true = 1, false = 0)
          const comp = Number(va) - Number(vb);
          if (comp !== 0) return sortDirection === "asc" ? comp : -comp;
          continue;
        }

        // numbers
        if (!isNaN(Number(va)) && !isNaN(Number(vb)) && va !== "" && vb !== "") {
          const comp = Number(va) - Number(vb);
          if (comp !== 0) return sortDirection === "asc" ? comp : -comp;
          continue;
        }

        // strings (incluye authors)
        const aStr = String(va);
        const bStr = String(vb);
        const comp = aStr.localeCompare(bStr, "es", { sensitivity: "base" });
        if (comp !== 0) return sortDirection === "asc" ? comp : -comp;

        // si iguales, seguir al siguiente campo
      }
      return 0;
    });
  }, [books, sortFields, sortDirection]);

  // 2. Ciclo de vida.
  // 3. Metodos.

  // 4. Render.
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 animate-pulse">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-56 w-full rounded-lg bg-muted/40" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-2">
      {/* Controles de ordenamiento */}
      <div className="flex flex-col sm:flex-row justify-between gap-2 items-center mb-4 px-2">
        <div className="flex flex-wrap items-center gap-4">
          {[
            { value: "name", label: "Nombre" },
            { value: "author", label: "Autor" },
            { value: "publisher", label: "Editorial" },
            { value: "release", label: "Fecha" },
            { value: "availability", label: "Disponibilidad" },
          ].map((opt) => (
            <Label
              key={opt.value}
              className="flex items-center space-x-1 text-sm cursor-pointer select-none"
            >
              <Checkbox
                checked={sortFields.includes(opt.value)}
                onCheckedChange={() =>
                  setSortFields((prev) =>
                    prev.includes(opt.value)
                      ? prev.filter((f) => f !== opt.value)
                      : [...prev, opt.value]
                  )
                }
                className="h-4 w-4 accent-primary cursor-pointer"
              />
              <span>{opt.label}</span>
            </Label>
          ))}
        </div>

        {/* Botón asc/desc */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            title={`Orden ${sortDirection === "asc" ? "ascendente" : "descendente"}`}
            className="flex items-center gap-2"
          >
            <ArrowUpDown className="w-4 h-4" />
            <span className="hidden sm:inline">
              {sortDirection === "asc" ? "Asc" : "Desc"}
            </span>
          </Button>
        </div>
      </div>


      {/* Listado */}
      <ScrollArea className="h-[calc(98vh-200px)] w-full items-center">
        <div
          className={cn(
            "grid p-0 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-2.5 pt-4 m-2",
            className
          )}
        >
          {sortedBooks.map((book, index) => (
            <BookCard book={book} index={index} key={index} />
          ))}
        </div>
      </ScrollArea>

      {/* Paginación */}
      <BookPagination />
    </div>
  );
}
