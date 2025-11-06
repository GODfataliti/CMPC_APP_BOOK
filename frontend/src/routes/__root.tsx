import { Outlet, createRootRoute } from '@tanstack/react-router';
import NotFoundPage from '@/screens/not-found/screen';

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
    </>
  ),
  notFoundComponent: NotFoundPage,
})
