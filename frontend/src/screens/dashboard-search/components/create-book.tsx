import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { AuthorCombobox } from "./combo-box-author";
import { PublisherCombobox } from "./combo-box-publisher";
import type { BookDetail } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function CreateBook() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState<"general" | "detalles" | "inventario">("general");

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

  const handleChange = (field: keyof BookDetail, value: string | number | boolean | any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.author || !formData.ISBN) {
      toast.error("Los campos 'Nombre', 'Autor' e 'ISBN' son obligatorios.");
      return;
    }

    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1000));

      toast.success("Libro creado exitosamente.");
      setOpen(false);
    } catch (err) {
      toast.error("Error al crear el libro, intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  // Avanzar al siguiente tab
  const goToNextTab = () => {
    if (currentTab === "general") setCurrentTab("detalles");
    else if (currentTab === "detalles") setCurrentTab("inventario");
  };

  // Verificar si todos los campos obligatorios están completos
  const isComplete = Boolean(formData.name && formData.author && formData.ISBN);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-1" variant="default">
          <PlusCircle className="w-4 h-4" />
          Crear Libro
        </Button>
      </DialogTrigger>

      <DialogContent
        className="max-w-5xl w-[95vw] max-h-[90vh] overflow-hidden p-0 bg-background rounded-xl shadow-lg border"
        style={{ maxWidth: "90vw", height: "auto" }}
      >
        <DialogHeader className="px-6 pt-4 pb-2 border-b">
          <DialogTitle className="text-lg font-semibold">
            Crear nuevo libro
          </DialogTitle>
        </DialogHeader>

        {/* -- Tabs principales -- */}
        <Tabs value={currentTab} onValueChange={(val) => setCurrentTab(val as any)} className="w-full h-full">
          <TabsList className="flex gap-2 border-b p-3 justify-start sticky top-0 bg-background z-10">
            <TabsTrigger value="general">Datos generales</TabsTrigger>
            <TabsTrigger value="detalles">Detalles técnicos</TabsTrigger>
            <TabsTrigger value="inventario">Inventario</TabsTrigger>
          </TabsList>

          <div className="overflow-y-auto max-h-[70vh] px-6 pb-6">
            {/* TAB 1: Generales */}
            <TabsContent value="general" className="space-y-4 py-4">
              <div className="flex flex-col gap-2">
                <Label>Nombre *</Label>
                <Input
                  placeholder="Ej: Elantris"
                  value={formData.name ?? ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <AuthorCombobox
                  value={formData.author ?? ""}
                  onChange={(val) => handleChange("author", val)}
                />
                <PublisherCombobox
                  value={formData.publisher ?? ""}
                  onChange={(val) => handleChange("publisher", val)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-2">
                  <Label>ISBN *</Label>
                  <Input
                    placeholder="Ej: 9788490705834"
                    value={formData.ISBN ?? ""}
                    onChange={(e) => handleChange("ISBN", e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Año de lanzamiento</Label>
                  <Input
                    type="number"
                    placeholder="Ej: 2016"
                    min={0}
                    value={formData.release ?? ""}
                    onChange={(e) => handleChange("release", e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>

            {/* TAB 2: Detalles */}
            <TabsContent value="detalles" className="space-y-6 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

              <div className="flex flex-col gap-2">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                <div className="flex flex-col gap-2">
                  <Label>Imagen del libro</Label>

                  <div className="flex items-center gap-3">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            handleChange("image", reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Formatos soportados: JPG, PNG, WEBP. Tamaño máximo recomendado: 2MB.
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* TAB 3: Inventario */}
            <TabsContent value="inventario" className="space-y-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                <div className="flex flex-col gap-2">
                  <Label>Stock</Label>
                  <Input
                    type="number"
                    placeholder="Ej: 100"
                    min={0}
                    value={formData.stock ?? ""}
                    onChange={(e) => handleChange("stock", e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Calificación</Label>
                  <Input
                    type="number"
                    placeholder="Ej: 4.5"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating ?? ""}
                    onChange={(e) => handleChange("rating", e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <Checkbox
                    id="availability"
                    checked={formData.availability}
                    onCheckedChange={(e) => handleChange("availability", !!e)}
                    className="h-4 w-4 accent-primary cursor-pointer"
                  />
                  <Label htmlFor="availability" className="cursor-pointer">
                    Disponible
                  </Label>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        {/* Footer dinámico */}
        <div className="flex justify-end p-4 border-t bg-background">
          {currentTab !== "inventario" ? (
            <Button onClick={goToNextTab}>
              Siguiente
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={loading || !isComplete}
            >
              {loading ? "Guardando..." : "Guardar"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
