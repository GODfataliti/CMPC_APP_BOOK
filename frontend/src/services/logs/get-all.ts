import type { Log } from '@/types'
import type { ResponseGetAll } from './types'
import { VITE_API_URL } from '@/config'
import { sessionStore } from '@/stores'

export async function getAllLogs(): Promise<Array<Log>> {
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

    const response: ResponseGetAll = await fetch(
      `${VITE_API_URL}api/logs/all`,
      options,
    ).then((res) => res.json())

    if (response.status >= 400) {
      throw new Error(
        response.GLOSADESC
          ? response.GLOSADESC
          : 'Problemas al obtener los logs',
      )
    }

    return response.data
  } catch (err: unknown) {
    console.error(err)
    throw {
      message: 'Ocurrio un error al obtener los logs, intente de nuevo.',
      status: 500,
    }
  }
}
