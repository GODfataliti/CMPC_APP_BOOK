import type { SafeUser } from '@/types'
import type { VerifySessionResponse } from './types/'
import { VITE_API_URL } from '@/config'

export async function verifySession(token: string): Promise<SafeUser> {
  try {
    const payload = {
      token,
    }
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    }
    const response: VerifySessionResponse = await fetch(
      `${VITE_API_URL}api/auth/verify-token`,
      options,
    )
      .then((res) => res.json())
      .catch((err) => {
        console.error(err)
        return (response.status = 500)
      })

    if (!response || response?.status >= 400) {
      throw new Error(
        response.GLOSADESC
          ? response.GLOSADESC
          : 'Error al verificar la sesión',
      )
    }

    return response.data
  } catch (err: unknown) {
    console.error(err)
    throw err
  }
}
