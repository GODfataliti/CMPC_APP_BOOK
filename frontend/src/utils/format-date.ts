import { Temporal } from '@js-temporal/polyfill'

export function formatDate(date: string | undefined): string {
  // input: 2025-06-09T23:02:54.303Z
  // output: 09/06/2025 23:02:54
  if (!date) {
    return ''
  }

  const dt = Temporal.Instant.from(date)
  return dt.toLocaleString('es-CL')
}
