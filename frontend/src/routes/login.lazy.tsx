import { createLazyFileRoute } from '@tanstack/react-router';
import Login from '@/screens/dashboard-login/screen';
import NotFoundPage from '@/screens/not-found/screen';

export const Route = createLazyFileRoute('/login')({
  component: Login,
  notFoundComponent: NotFoundPage,
});
