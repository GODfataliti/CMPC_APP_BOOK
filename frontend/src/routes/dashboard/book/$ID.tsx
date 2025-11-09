import { createFileRoute, redirect } from '@tanstack/react-router';
import { toast } from 'sonner';
import type { Book } from '@/types';
import { BookDetailPage } from '@/screens/dashboard-book-details/screen';
import { getBookDetail } from '@/services/book';

export const Route = createFileRoute('/dashboard/book/$ID')({
  loader: async ({ params }) => {
    const data: Book = await getBookDetail(params.ID)
      .catch((err: any) => {
        toast.error(err?.message ?? 'Problema al obtener el detalle del libro');
        throw redirect({ to: '/dashboard' })
      })
    return data;
  },
  component: BookDetailPage,
})
