import { createFileRoute, redirect } from '@tanstack/react-router'
import { toast } from 'sonner'
import type { Log } from '@/types'
import LogsPage from '@/screens/dashboard-logs/screen'
import NotFoundPage from '@/screens/not-found/screen'
import { getAllLogs } from '@/services/logs'

export const Route = createFileRoute('/dashboard/logs')({
  loader: async () => {
    const data: Array<Log> = await getAllLogs()
      .catch((err: any) => {
        toast.error(err?.message ?? 'Problema al obtener el detalle del libro');
        throw redirect({ to: '/dashboard' })
      })
    return data;
  },
  component: LogsPage,
  errorComponent: NotFoundPage,
})
