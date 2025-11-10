import type { Option } from '@/types'

/**
 * Transforma entidades de Authors, Publishers o Categories
 * al formato uniforme Option { ID, name }
 */
export function adaptToOptions<T extends Record<string, any>>(
  data: Array<T> = [],
): Array<Option> {
  if (!Array.isArray(data)) return []

  return data.map((item) => {
    // Detectamos el ID dinámicamente según el tipo de entidad
    const ID =
      item.authorID ||
      item.publisherID ||
      item.categoryID ||
      item.id || // fallback por si cambia el nombre
      crypto.randomUUID()

    const name = item.name ?? 'Desconocido'

    return { ID, name }
  })
}
