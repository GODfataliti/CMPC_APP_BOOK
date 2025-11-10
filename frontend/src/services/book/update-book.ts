import type { UpdateBooksRES } from './types'
import type { Book } from '@/types'
import { sessionStore } from '@/stores'
import { VITE_API_URL } from '@/config'

export async function updateBook(
  bookID: string,
  payload: Partial<
    Omit<
      Book,
      | 'bookID'
      | 'author'
      | 'publisher'
      | 'category'
      | 'createdAt'
      | 'updatedAt'
      | 'deletedAt'
    >
  >,
): Promise<Book> {
  try {
    const { token } = sessionStore.getState()

    const options: RequestInit = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }

    const response: UpdateBooksRES = await fetch(
      `${VITE_API_URL}api/book/update/${bookID}`,
      options,
    ).then((res) => res.json())

    if (response.status >= 400) {
      throw {
        message: 'Problema al actualizar la información del libro.',
      }
    }

    return response.data
  } catch (err: unknown) {
    console.error(err)
    throw {
      message: `Ocurrio un error al actualizar el libro, intente de nuevo.`,
      status: 500,
    }
  }
}
