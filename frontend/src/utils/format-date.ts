import { Temporal } from '@js-temporal/polyfill'

export function formatDate(date?: string | Date | null): string {
  if (!date) return ''

  try {
    // 🕓 Convertir a Temporal.Instant sin importar el tipo
    const instant =
      typeof date === 'string'
        ? Temporal.Instant.from(date)
        : Temporal.Instant.from(date.toISOString())

    // 🇨🇱 Formato local Chile
    return instant.toLocaleString('es-CL', {
      dateStyle: 'short',
      timeStyle: 'medium',
    })
  } catch {
    // En caso de formato inválido
    return ''
  }
}
