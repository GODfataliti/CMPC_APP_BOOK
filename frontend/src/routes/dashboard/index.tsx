import { createFileRoute } from '@tanstack/react-router';
import SearchPage from '@/screens/dashboard-search/screen';
import NotFoundPage from '@/screens/not-found/screen';

export const Route = createFileRoute('/dashboard/')({
  component: SearchPage,
  notFoundComponent: NotFoundPage,
});