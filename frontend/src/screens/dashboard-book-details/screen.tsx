import { useLoaderData, useParams } from "@tanstack/react-router";

export function BookDetailPage() {
  // -- 1. Manejo de estado.
  const preloadedData = useLoaderData({ from: '/dashboard/book/$ID' });
  const params = useParams({ from: '/dashboard/book/$ID' });

  return (
    <div>Detalle</div>
  )
}