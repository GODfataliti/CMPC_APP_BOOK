import type { Book } from '@/types'
import { VITE_API_URL } from '@/config'
import { sessionStore } from '@/stores'

export async function deleteBook(ID: string): Promise<Book> {
  try {
    const { token } = sessionStore.getState()

    const options: RequestInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const response: any = await fetch(
      `${VITE_API_URL}api/book/delete/${ID}`,
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
      message:
        'Ocurrio un error al obtener la información del libro, intente de nuevo.',
      status: 500,
    }
  }
}
