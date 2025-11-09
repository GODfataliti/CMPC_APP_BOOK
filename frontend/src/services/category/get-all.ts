import { VITE_API_URL } from "@/config";
import { sessionStore } from "@/stores";

export async function getAllAuthors(): Promise<any> {
  try {
    const { token } = sessionStore.getState();

    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const response: any = await fetch(`${VITE_API_URL}/categories/all`, options)
      .then((res) => res.json());

    if (response.status >= 400) {
      throw new Error(response.GLOSADESC ? response.GLOSADESC : 'Problemas al obtener las categorias');
    }

    return response.data;

  } catch (err: unknown) {
    console.error(err);
    throw { message: 'Ocurrio un error al obtener las categorias, intente de nuevo.', status: 500 }
  }
}