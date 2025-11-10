import type { CreateBookPayload, CreateBooksRES } from './types'
import type { Book } from '@/types'
import { sessionStore } from '@/stores'
import { VITE_API_URL } from '@/config'

export async function createBook(payload: CreateBookPayload): Promise<Book> {
  try {
    const { token } = sessionStore.getState()
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }

    const response: CreateBooksRES = await fetch(
      `${VITE_API_URL}api/book/create`,
      options,
    ).then((res) => res.json())

    if (response.status >= 400) {
      throw new Error(
        response.GLOSADESC
          ? response.GLOSADESC
          : 'Problema al agregar el libro',
      )
    }

    return response.data
  } catch (err: unknown) {
    console.error(err)
    throw {
      message: `Ocurrio un error al agregar el libro, intente de nuevo.`,
      status: 500,
    }
  }
}
