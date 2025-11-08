import type { BookDetail } from "@/types";
import { VITE_API_URL } from "@/config";
import { sessionStore } from "@/stores";

export async function getBookDetail(ID: string): Promise<BookDetail> {
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

    // const response: any = await fetch(`${VITE_API_URL}/book/find/${ID}`, options)
    //   .then((res) => res.json());

    // if (response.status >= 400) {
    //   throw new Error(response.GLOSADESC ? response.GLOSADESC : 'Problemas al obtener la información del libro');
    // }

    // return response.data;

    const mockData = {
      ID: ID,
      ISBN: "123121314124",
      name: "Nombre libro bkn",
      author: "Brandon Sanderson",
      categories: ["Fantasia", ""],
      publisher: "Nova",
      release: "2016",
      pages: 928,
      image: "",
      availability: true,
      price: "23990",
      rating: "5",
      stock: 28,
      summary: '',
    }
    return mockData

  } catch (err: unknown) {
    console.error(err);
    throw { message: 'Ocurrio un error al obtener la información del libro, intente de nuevo.', status: 500 }
  }
}