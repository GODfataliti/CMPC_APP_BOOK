import type { VerifySessionRES, VerifySessionResponse } from './types/verify-session.res'
import { VITE_API_URL } from '@/config'

export async function verifySession(sessionID: string): Promise<VerifySessionRES> {
  try {
    const payload = {
      sessionID,
    };
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    };
    const response: VerifySessionResponse = await fetch(`${VITE_API_URL}/auth/verify-session`, options)
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
        return response.status = 500;
      })

    if (!response || response?.status >= 400) {
      throw new Error(response.GLOSADESC ? response.GLOSADESC : 'Error al verificar la sesión');
    }

    return response.data;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
}
