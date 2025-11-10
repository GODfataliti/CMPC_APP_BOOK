import type { Option } from '@/types'
import { VITE_API_URL } from '@/config'
import { sessionStore } from '@/stores'

export async function getAllPublishers(): Promise<any> {
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
      `${VITE_API_URL}api/publishers/all`,
      options,
    ).then((res) => res.json())

    if (response.status >= 400) {
      throw new Error(
        response.GLOSADESC
          ? response.GLOSADESC
          : 'Problemas al obtener la información del libro',
      )
    }

    return response.data
  } catch (err: unknown) {
    console.error(err)
    throw {
      message: 'Ocurrio un error al obtener las editoriales, intente de nuevo.',
      status: 500,
    }
  }
}

export async function getPublishers(): Promise<Array<Option>> {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          { value: 'nova', label: 'Nova' },
          { value: 'minotauro', label: 'Minotauro' },
          { value: 'planeta', label: 'Editorial Planeta' },
          { value: 'b-de-books', label: 'B de Books' },
        ]),
      600,
    ),
  )
}
