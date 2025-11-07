import type { BookResultsData, GetBooksRES } from "./get-books.type.res";
import { sessionStore } from "@/stores";
import { VITE_API_URL } from "@/config";

interface Params {
  page?: number;
  general?: string;
  title?: string;
  category?: string;
  author?: string;
  publisher?: string;
  available?: boolean;
}

export async function getBooksByParams(props: Params): Promise<BookResultsData> {
    try {
      const { token } = sessionStore.getState();
      const queryParams = new URLSearchParams({
        page: props.page?.toString() ?? '1',
      });

      const options: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const response: GetBooksRES = await fetch(`${VITE_API_URL}/search-books}?${queryParams.toString()}`, options)
        .then((res) => res.json());

      if (response.status >= 400) {
        throw new Error(response.GLOSADESC ? response.GLOSADESC : 'Problemas al obtener los libros');
      }

      return response.data;
    } catch (err: unknown) {
      console.error(err)
      throw { message: `Ocurrio un error al obtener los libros, intente de nuevo.`, status: 500 }
    }
}