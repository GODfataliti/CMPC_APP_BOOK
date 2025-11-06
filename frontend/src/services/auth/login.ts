import type { ResponseLogin } from './types'
import { VITE_API_URL } from '@/config'

let current: AbortController | null = null;
export async function login(rut: string, password: string): Promise<ResponseLogin> {
  try {
    // ---- Abort controller
    if (current) {
      current.abort();
    }

    current = new AbortController();
    const signal: AbortSignal = current.signal;

    // ---- API request
    const payload = {
      rut: rut,
      password: password,
    }
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
      signal,
    }
    const response: ResponseLogin = await fetch(`${VITE_API_URL}/auth/login`, options)
      .then((res) => res.json())
    if (response.status >= 400) {
      throw new Error(response.GLOSADESC);
    }

    return response;
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      return Promise.reject('Petición cancelada...');
    }
    // console.error(err);
    throw { message: `Ocurrio un error al iniciar sesión, intente de nuevo.`, status: 500 }
  }
}