import { createLazyFileRoute } from '@tanstack/react-router';
import LoginPage from '@/screens/dashboard-login/screen';
import NotFoundPage from '@/screens/not-found/screen';

export const Route = createLazyFileRoute('/login')({
  component: LoginPage,
  notFoundComponent: NotFoundPage,
});
