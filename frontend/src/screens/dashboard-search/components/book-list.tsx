import { useMemo, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";
import { BookPagination } from "./book-pagination";
import BookCard from "./book-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { booksStore } from "@/stores";

interface Props {
  className?: string;
}

export function BookList({ className }: Props) {
  // 1. Estado
  const { books } = booksStore();
  const [sortFields, setSortFields] = useState<Array<string>>([]);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const { isLoading } = useRouterState();

  // 2. Ordenamiento avanzado
  const sortedBooks = useMemo(() => {
    if (!books) return [];
    if (sortFields.length === 0) return books;

    // Obtener valor anidado (author.name, publisher.name, etc.)
    const getNestedValue = (obj: any, path: string) => {
      return path.split(".").reduce((acc, key) => acc?.[key], obj);
    };

    const getValue = (item: any, field: string) => {
      const raw = getNestedValue(item, field);

      // Disponibilidad: null = false
      if (field === "availability") return raw === true;

      // Array → texto unificado
      if (Array.isArray(raw)) return raw.filter(Boolean).join(", ") || "";

      // null / undefined → cadena vacía
      if (raw === null || raw === undefined) return "";

      return raw;
    };

    return [...books].sort((a, b) => {
      for (const field of sortFields) {
        const va = getValue(a, field);
        const vb = getValue(b, field);

        // ✅ booleanos
        if (typeof va === "boolean" && typeof vb === "boolean") {
          const comp = Number(va) - Number(vb);
          if (comp !== 0) return sortDirection === "asc" ? comp : -comp;
          continue;
        }

        // ✅ numéricos
        const numA = Number(va);
        const numB = Number(vb);
        if (!isNaN(numA) && !isNaN(numB) && va !== "" && vb !== "") {
          const comp = numA - numB;
          if (comp !== 0) return sortDirection === "asc" ? comp : -comp;
          continue;
        }

        // ✅ strings (ej: author.name)
        const strA = String(va);
        const strB = String(vb);
        const comp = strA.localeCompare(strB, "es", { sensitivity: "base" });
        if (comp !== 0) return sortDirection === "asc" ? comp : -comp;
      }
      return 0;
    });
  }, [books, sortFields, sortDirection]);

  // 3. Render
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
            { value: "title", label: "Nombre" },
            { value: "author.name", label: "Autor" },
            { value: "publisher.name", label: "Editorial" },
            { value: "category.name", label: "Categoría" },
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

      {/* Paginación */}
      <BookPagination />

      {/* Listado */}
      <ScrollArea className="h-[calc(98vh-200px)] w-full items-center">
        <div
          className={cn(
            "grid p-0 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-2.5 pt-4 m-2",
            className
          )}
        >
          {sortedBooks.map((book, index) => (
            <BookCard book={book} index={index} key={book.bookID} />
          ))}
        </div>
      </ScrollArea>

      {/* Paginación inferior */}
      <BookPagination />
    </div>
  );
}
