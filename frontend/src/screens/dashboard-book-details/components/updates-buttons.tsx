import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react'
import { EditBook } from './book-editar'
import type { Book } from '@/types';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { deleteBook } from '@/services/book';

interface UpdatesButtonsProps {
  book: Book;
  onUpdate?: () => void;
}


export function Buttons(props: UpdatesButtonsProps) {
  // 1. Manejo de estado.
  const { book, onUpdate } = props;
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  // 2. Ciclo de vida.
  // 3. Métodos.
  const onDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteBook(book.bookID).then((res) => {
        toast.success("Libro eliminado correctamente");
      })
      navigate({ to: "/dashboard" });
    } catch {
      toast.error("Error al eliminar el libro");
    } finally {
      setIsDeleting(false);
    }
  };
  // 4. Render.
  return (
    <div className="flex flex-row gap-2">
      <EditBook book={book} onUpdate={onUpdate} />

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm" className="flex gap-1">
            <Trash2 className="w-4 h-4" />
            Eliminar
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar este libro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el registro del libro <strong>{book.title}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} disabled={isDeleting}>
              {isDeleting ? "Eliminando..." : "Confirmar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}