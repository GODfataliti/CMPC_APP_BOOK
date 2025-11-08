import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import type { BookDetail } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { booksStore } from "@/stores";
import { Checkbox } from "@/components/ui/checkbox";

export function CreateBook() {
  const [open, setOpen] = useState(false);
  const { loadRequested } = booksStore();

  const [formData, setFormData] = useState<Partial<BookDetail>>({
    name: "",
    author: "",
    publisher: "",
    ISBN: "",
    release: "",
    pages: undefined,
    price: "",
    availability: true,
    categories: [],
    image: "",
    stock: 0,
    rating: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof BookDetail, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.author || !formData.ISBN) {
      toast.error("Los campos 'Nombre', 'Autor' e 'ISBN' son obligatorios.");
      return;
    }

    try {
      setLoading(true);
      // Simula una llamada al backend
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newBook: BookDetail = {
        ...formData,
        ID: crypto.randomUUID(),
        availability: Boolean(formData.availability),
      } as BookDetail;

      // En un escenario real -> await createBookService(newBook)
      loadRequested([newBook], 1, 1);
      toast.success("Libro creado exitosamente.");
      setOpen(false);
      setFormData({
        name: "",
        author: "",
        publisher: "",
        ISBN: "",
        release: "",
        pages: undefined,
        price: "",
        availability: true,
        categories: [],
        image: "",
        stock: 0,
        rating: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Error al crear el libro, intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-1" variant="default">
          <PlusCircle className="w-4 h-4" />
          Crear Libro
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Nuevo Libro</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <div className="flex flex-col gap-2">
            <Label>Nombre *</Label>
            <Input
              placeholder="Ej: Elantris"
              value={formData.name ?? ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex flex-col gap-2">
              <Label>Autor *</Label>
              <Input
                placeholder="Ej: Brandon Sanderson"
                value={formData.author ?? ""}
                onChange={(e) => handleChange("author", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Editorial</Label>
              <Input
                placeholder="Ej: Nova"
                value={formData.publisher ?? ""}
                onChange={(e) => handleChange("publisher", e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex flex-col gap-2">
              <Label>ISBN *</Label>
              <Input
                placeholder="Ej: 9788490705834"
                value={formData.ISBN ?? ""}
                onChange={(e) => handleChange("ISBN", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Año</Label>
              <Input
                type="number"
                placeholder="Ej: 2016"
                value={formData.release ?? ""}
                onChange={(e) => handleChange("release", e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex flex-col gap-2">
              <Label>Páginas</Label>
              <Input
                type="number"
                placeholder="Ej: 500"
                value={formData.pages ?? ""}
                onChange={(e) => handleChange("pages", Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Precio</Label>
              <Input
                type="text"
                placeholder="Ej: 15990"
                value={formData.price ?? ""}
                onChange={(e) => handleChange("price", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Categorías (separadas por coma)</Label>
            <Textarea
              placeholder="Ej: Fantasía, Aventura, Magia"
              value={formData.categories?.join(", ") ?? ""}
              onChange={(e) =>
                handleChange(
                  "categories",
                  e.target.value.split(",").map((c) => c.trim())
                )
              }
            />
          </div>

          <div>
            <Label>Imagen (URL)</Label>
            <Input
              placeholder="https://..."
              value={formData.image ?? ""}
              onChange={(e) => handleChange("image", e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="availability"
                checked={formData.availability}
                onCheckedChange={(e) => handleChange("availability", e)}
                className="h-4 w-4 accent-primary cursor-pointer"
              />
              <Label htmlFor="availability" className="cursor-pointer">
                Disponible
              </Label>

            </div>
            <div className="flex flex-col gap-2">
              <Label>Stock</Label>
              <Input
                type="number"
                placeholder="Ej: 100"
                value={formData.stock ?? ""}
                onChange={(e) => handleChange("stock", e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-between pt-4">
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
