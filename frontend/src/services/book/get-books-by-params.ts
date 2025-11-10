import type { BookResultsData, GetBooksRES, QueryParams } from './types'
import { sessionStore } from '@/stores'
import { VITE_API_URL } from '@/config'

export async function getBooksByParams(
  props: QueryParams,
): Promise<BookResultsData> {
  try {
    const { token } = sessionStore.getState()

    const params: Record<string, string> = {}

    if (props.isAdvanceSearch) {
      // búsqueda avanzada → incluir todo excepto isAdvanceSearch y general
      Object.entries(props).forEach(([key, value]) => {
        if (value === undefined || value === null) return // ignorar vacíos
        if (key === 'isAdvanceSearch' || key === 'general') return
        params[key] = String(value)
      })
    } else {
      // búsqueda general → solo incluir page y general
      if (props.page) params.page = String(props.page)
      if (props.general) params.general = props.general
    }

    const queryParams = new URLSearchParams(params)

    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const response: GetBooksRES = await fetch(
      `${VITE_API_URL}api/book/search?${queryParams.toString()}`,
      options,
    ).then((res) => res.json())

    if (response.status >= 400) {
      throw new Error(
        response.GLOSADESC
          ? response.GLOSADESC
          : 'Problemas al obtener los libros',
      )
    }

    return response.data
  } catch (err: unknown) {
    console.error(err)
    throw {
      message: `Ocurrio un error al obtener los libros, intente de nuevo.`,
      status: 500,
    }
  }
}
