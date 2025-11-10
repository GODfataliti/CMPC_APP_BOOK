import type { Option } from '@/types'
import { VITE_API_URL } from '@/config'
import { sessionStore } from '@/stores'

export async function getAllAuthors(): Promise<any> {
  try {
    const { token } = sessionStore.getState()

    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const response: any = await fetch(
      `${VITE_API_URL}api/authors/all`,
      options,
    ).then((res) => res.json())

    if (response.status >= 400) {
      throw new Error(
        response.GLOSADESC
          ? response.GLOSADESC
          : 'Problemas al obtener los autores',
      )
    }

    return response.data
  } catch (err: unknown) {
    console.error(err)
    throw {
      message: 'Ocurrio un error al obtener los autores, intente de nuevo.',
      status: 500,
    }
  }
}

// --- Simulación de endpoints ---
export async function getAuthors(): Promise<Array<Option>> {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          { value: 'brandon-sanderson', label: 'Brandon Sanderson' },
          { value: 'patrick-rothfuss', label: 'Patrick Rothfuss' },
          { value: 'neil-gaiman', label: 'Neil Gaiman' },
          { value: 'ursula-le-guin', label: 'Ursula K. Le Guin' },
        ]),
      600,
    ),
  )
}
