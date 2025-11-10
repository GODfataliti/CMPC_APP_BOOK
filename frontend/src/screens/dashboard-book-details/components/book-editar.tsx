import { useEffect, useState } from 'react'
import { Pencil } from 'lucide-react'
import { toast } from 'sonner'
import type { Book } from '@/types'
import {
  AuthorCombobox,
  CategoryCombobox,
  PublisherCombobox,
} from '@/components/combobox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface EditBookProps {
  book?: Book
  onUpdate?: () => void
}

export function EditBook({ book, onUpdate }: EditBookProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentTab, setCurrentTab] = useState<
    'general' | 'detalles' | 'inventario'
  >('general')

  const [formData, setFormData] = useState<
    Partial<Omit<Book, 'bookID' | 'createdAt' | 'updatedAt' | 'deletedAt'>>
  >({
    title: '',
    authorID: '',
    publisherID: '',
    page: 0,
    price: 0,
    availability: true,
    coverImage: '',
    stock: 0,
  })

  // Cargar los datos del libro cuando se abre el modal
  useEffect(() => {
    if (open && book) {
      setFormData({
        title: book.title,
        authorID: book.authorID,
        publisherID: book.publisherID,
        page: book.page,
        price: book.price,
        availability: book.availability,
        categoryID: book.categoryID,
        coverImage: book.coverImage,
        stock: book.stock,
      })
    }
  }, [open, book])

  const handleChange = (
    field: keyof Book,
    value: string | number | boolean | unknown,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    if (!formData.title || !formData.authorID) {
      toast.error("Los campos 'Título' y 'Autor' son obligatorios.")
      return
    }

    try {
      setLoading(true)
      await new Promise((r) => setTimeout(r, 1000))

      toast.success('Libro actualizado exitosamente.')
      onUpdate?.()
      setOpen(false)
    } catch (err) {
      toast.error('Error al actualizar el libro, intente nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  // Avanzar al siguiente tab
  const goToNextTab = () => {
    if (currentTab === 'general') setCurrentTab('detalles')
    else if (currentTab === 'detalles') setCurrentTab('inventario')
  }

  // Verificar si todos los campos obligatorios están completos
  const isComplete = Boolean(formData.title && formData.authorID)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-1" variant="outline" size="sm">
          <Pencil className="w-4 h-4" />
          Editar
        </Button>
      </DialogTrigger>

      <DialogContent
        className="max-w-5xl w-[95vw] max-h-[90vh] overflow-hidden p-0 bg-background rounded-xl shadow-lg border"
        style={{ maxWidth: '90vw', height: 'auto' }}
      >
        <DialogHeader className="px-6 pt-4 pb-2 border-b">
          <DialogTitle className="text-lg font-semibold">
            Editar libro
          </DialogTitle>
        </DialogHeader>

        {/* -- Tabs principales -- */}
        <Tabs
          value={currentTab}
          onValueChange={(val) => setCurrentTab(val as any)}
          className="w-full h-full"
        >
          <TabsList className="flex gap-2 border-b p-3 justify-start sticky top-0 bg-background z-10">
            <TabsTrigger value="general">Datos generales</TabsTrigger>
            <TabsTrigger value="detalles">Detalles técnicos</TabsTrigger>
            <TabsTrigger value="inventario">Inventario</TabsTrigger>
          </TabsList>

          <div className="overflow-y-auto max-h-[70vh] px-6 pb-6">
            {/* TAB 1: Generales */}
            <TabsContent value="general" className="space-y-4 py-4">
              <div className="flex flex-col gap-2">
                <Label>
                  Título <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Ej: Elantris"
                  value={formData.title ?? ''}
                  onChange={(e) => handleChange('title', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-2">
                  <Label>
                    Autor <span className="text-red-500">*</span>
                  </Label>
                  <AuthorCombobox
                    value={formData.authorID ?? ''}
                    onChange={(val) => handleChange('authorID', val)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>
                    Editorial <span className="text-red-500">*</span>
                  </Label>
                  <PublisherCombobox
                    value={formData.publisherID ?? ''}
                    onChange={(val) => handleChange('publisherID', val)}
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
                    value={formData.page ?? ''}
                    onChange={(e) =>
                      handleChange('page', Number(e.target.value))
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Precio</Label>
                  <Input
                    type="text"
                    placeholder="Ej: 15990"
                    value={formData.price ?? ''}
                    onChange={(e) => handleChange('price', e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label>Categoría</Label>
                <CategoryCombobox
                  value={formData.categoryID ?? ''}
                  onChange={(val) => handleChange('categoryID', val)}
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
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onload = () => {
                            handleChange('coverImage', reader.result as string)
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                    />
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Formatos soportados: JPG, PNG, WEBP. Tamaño máximo
                    recomendado: 2MB.
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
                    value={formData.stock ?? ''}
                    onChange={(e) => handleChange('stock', e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <Checkbox
                    id="availability"
                    checked={formData.availability}
                    onCheckedChange={(e) => handleChange('availability', !!e)}
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
          {currentTab !== 'inventario' ? (
            <Button onClick={goToNextTab}>Siguiente</Button>
          ) : (
            <Button onClick={handleSubmit} disabled={loading || !isComplete}>
              {loading ? 'Actualizando...' : 'Guardar cambios'}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
