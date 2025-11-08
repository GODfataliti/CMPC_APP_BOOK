import type { UpdateBookDTO, UpdateBooksRES } from './types';
import { sessionStore } from '@/stores';
import { VITE_API_URL } from '@/config'


export async function updateBook(payload: UpdateBookDTO): Promise<any> {
  try {
    const { token } = sessionStore.getState()

    const options: RequestInit = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    };

    const response: UpdateBooksRES = await fetch(`${VITE_API_URL}/book/update`, options)
      .then((res) => res.json())

    if (response.status >= 400) {
      throw new Error(response.GLOSADESC ? response.GLOSADESC : 'Problema al actualizar la información del libro.');
    }

    return response;
  } catch (err: unknown) {
    console.error(err);
    throw { message: `Ocurrio un error al actualizar el libro, intente de nuevo.`, status: 500 }
  }
}