import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { toast } from 'sonner'
import type { BookResultsData } from '@/services/book/types/get-books.type.res'
import Dashboard from '@/screens/dashboard/screen'
import { verifySession } from '@/services/auth'
import { sessionStore, userStore } from '@/stores'
import NotFoundPage from '@/screens/not-found/screen'
import { getBooksByParams } from '@/services/book'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async ({ abortController }) => {
    const { sessionID } = sessionStore.getState()

    if (!sessionID) {
      toast.error('No se ha encontrado la sesión. Por favor, inicie sesión nuevamente.');
      abortController.abort();

      // -- Clear store.
      sessionStore.getState().removeSession();
      userStore.getState().removeUser();

      throw redirect({
        to: '/',
      })
    }

    await verifySession(sessionID).catch(() => {
      toast.error('No se ha podido verificar la sesión. Por favor, inicie sesión nuevamente.');

      // -- Clear store.
      sessionStore.getState().removeSession();
      userStore.getState().removeUser();

      throw redirect({
        to: '/',
      })
    });

    return
  },
  loader: async ({ abortController, location }) => {
    try {
      const search: any = location.search;
      const page: number = search?.page || 1;

      const payload = {
        page,
      }

      const result: BookResultsData = await getBooksByParams(payload);
      return result;
    } catch (err) {
      abortController.abort();
      return { books: [], page: 1, pages: 1 }
    }
  },
  component: DashboardLayout,
  notFoundComponent: NotFoundPage,
})

function DashboardLayout() {
  return (
    <>
      <Dashboard>
        <Outlet />
      </Dashboard>
    </>
  )
}