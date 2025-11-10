import { useState } from 'react'
import { PlusCircle } from 'lucide-react'
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
import { createBook } from '@/services/book'
import { uploadImage } from '@/services/uploads'

export function CreateBook() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentTab, setCurrentTab] = useState<
    'general' | 'detalles' | 'inventario'
  >('general')

  const [formData, setFormData] = useState<
    Partial<Omit<Book, 'bookID' | 'author' | 'publisher' | 'category' | 'createdAt' | 'updatedAt' | 'deletedAt'>>
  >({
    authorID: '',
    publisherID: '',
    categoryID: '',
    title: '',
    price: 0,
    page: 0,
    stock: 0,
    availability: true,
    coverImage: '',
  })

  const onClean = () => {
    setFormData({
      authorID: '',
      publisherID: '',
      categoryID: '',
      title: '',
      price: 0,
      page: 0,
      stock: 0,
      availability: true,
      coverImage: '',
    })
    setCurrentTab('general')
  }

  const handleChange = (
    field: keyof Book,
    value: string | number | boolean | any,
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
      await createBook(formData).then((res) => {
        toast.success('Libro creado exitosamente.')
      }).catch(() => {
        toast.error('Error al crear el libro, intente nuevamente.')
      }).finally(() => {
        onClean()
      })

      setOpen(false)
    } catch (err) {
      toast.error('Error al crear el libro, intente nuevamente.')
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
        <Button className="flex gap-1" variant="default">
          <PlusCircle className="w-4 h-4" />
          Crear Libro
        </Button>
      </DialogTrigger>

      <DialogContent
        className="max-w-5xl w-[95vw] max-h-[90vh] overflow-hidden p-0 bg-background rounded-xl shadow-lg border"
        style={{ maxWidth: '90vw', height: 'auto' }}
      >
        <DialogHeader className="px-6 pt-4 pb-2 border-b">
          <DialogTitle className="text-lg font-semibold">
            Crear nuevo libro
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
                    type="number"
                    min={0}
                    placeholder="Ej: 15990"
                    value={formData.price ?? ''}
                    onChange={(e) => handleChange('price', Number(e.target.value))}
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
                      onChange={async (e) => {
                        const file = e.target.files?.[0]
                        if (!file) return

                        try {
                          toast.info('Subiendo imagen, por favor espera... ⏳')
                          await uploadImage(file).then((res) => {
                            toast.success('Imagen subida correctamente 🎉')
                            if (res.status < 400) {
                              handleChange('coverImage', res)
                            }
                          }).catch((error) => {
                            toast.error(error.message || 'No se pudo subir la imagen 😭')
                            handleChange('coverImage', '')
                          })
                        } catch (error: any) {
                          console.error(error)
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
                    onChange={(e) => handleChange('stock', Number(e.target.value))}
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
              {loading ? 'Guardando...' : 'Guardar'}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
