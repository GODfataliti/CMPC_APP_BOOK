import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';
import type { PersistOptions } from 'zustand/middleware';
import type { StateCreator } from 'zustand';
import type { Book } from '@/types';

// -- Definición del store.
export interface BookState {
  books: Array<Book>;
  page: number;
  pages: number;

  loadRequested: (books: Array<Book>, page: number, pages: number) => void;
  clearRequested: () => void;
  loadParams: (firstName: string, secondName: string, firstSurname: string, secondSurname: string) => void
  clearParams: () => void;
}

const initial: StateCreator<BookState> = (set): BookState => ({
  books: [],
  page: 1,
  pages: 1,

  loadRequested: (books: Array<Book>, page: number, pages: number) => {
    set({ books, page, pages });
  },
  clearRequested: () => {
    set({
      books: [],
      page: 1,
      pages: 1,
    });
  },
  loadParams: (firstName: string, secondName: string, firstSurname: string, secondSurname: string) => {
    set({});
  },
  clearParams: () => {
    set({})
  },
});

// -- Configuración de persistencia
const persistConfig: PersistOptions<BookState> = {
  name: 'books-storage',
  storage: createJSONStorage(() => localStorage),
};

export const booksStore = create(persist(initial, persistConfig))