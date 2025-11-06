import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { toast } from 'sonner'
import Dashboard from '@/screens/dashboard/screen'
import { verifySession } from '@/services/auth'
import { sessionStore, userStore } from '@/stores'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async ({ abortController }) => {
    const { sessionID, token } = sessionStore.getState()

    // -- Check token.
    if (!token) {
      toast.error('No se ha encontrado la sesión. Por favor, inicie sesión nuevamente.');
      abortController.abort();

      // -- Clear store.
      sessionStore.getState().removeSession();
      userStore.getState().removeUser();

      throw redirect({
        to: '/',
      })
    }

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
  component: DashboardLayout,
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