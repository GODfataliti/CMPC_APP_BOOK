import { useLoaderData, useParams } from "@tanstack/react-router";
import { Buttons } from "./components/updates-buttons";
import { Detail } from "./components/detail";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { updateBook } from "@/services/book";

export function BookDetailPage() {
  // -- 1. Manejo de estado.
  const preloadedData = useLoaderData({ from: "/dashboard/book/$ID" });
  const params = useParams({ from: "/dashboard/book/$ID" });

  const book = preloadedData;
  const imageSrc = book.coverImage && book.coverImage.trim() !== "" 
    ? book.coverImage
    : "/assets/book_banner.png";

  // -- 2. Métodos.
  const onUpdate = () => {
    console.log('Actualizando libro', params.ID);
  };
  

  // -- 3. Render.
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex flex-row w-full items-center justify-between gap-2 px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4 mx-2" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Detalle</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <Buttons book={book} onUpdate={onUpdate}/>

            <ModeToggle />
          </div>
        </div>
      </header>

      <div className="p-4 mt-4 flex justify-center">
        <Card className="w-full max-w-5xl p-6 shadow-md rounded-xl flex flex-col md:flex-row gap-6">
          {/* Imagen */}
          <div className="w-full md:w-1/2 flex justify-center items-start">
            <img
              src={imageSrc}
              alt={book.title}
              className="w-full max-w-sm rounded-md object-cover border shadow-sm"
            />
          </div>

          {/* Detalles */}
          <Detail book={book} />
        </Card>
      </div>
    </>
  );
}
