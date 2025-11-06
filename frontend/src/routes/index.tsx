import { createFileRoute, redirect } from '@tanstack/react-router';
import { toast } from 'sonner';
import DashboardLogin from '@/screens/dashboard-login/screen';
import { sessionStore, userStore } from '@/stores';
import { verifySession } from '@/services/auth';

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    const { sessionID } = sessionStore.getState();

    if (sessionID) {
      await verifySession(sessionID).catch(() => {
        toast.error('No se ha podido verificar la sesión. Por favor, inicie sesión nuevamente.');

        // -- Clear store.
        sessionStore.getState().removeSession();
        userStore.getState().removeUser();

        return redirect({
          to: '/',
        });
      });

      toast.success('Sesión verificada correctamente...');
      return redirect({
        to: '/dashboard',
      });
    }
  },
  component: DashboardLogin,
});