import { VITE_API_URL } from '@/config'
import { sessionStore } from '@/stores'

export async function uploadImage(file: File): Promise<any> {
  try {
    const { token } = sessionStore.getState()

    const formData = new FormData()
    formData.append('file', file)

    const options: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }

    const response = await fetch(
      `${VITE_API_URL}api/upload/image`,
      options,
    ).then((res) => res.json())

    if (response.status >= 400) {
      throw new Error(
        response.GLOSADESC ? response.GLOSADESC : 'Problemas cargar la imagen',
      )
    }

    return response
  } catch (err: unknown) {
    throw {
      message: 'Ocurrio un error al cargar la imagen, intente de nuevo.',
      status: 500,
    }
  }
}
