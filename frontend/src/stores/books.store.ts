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

  general: string;
  title: string;
  category: string;
  author: string;
  publisher: string;
  available: boolean | null;
  isAdvanceSearch: boolean;

  loadRequested: (books: Array<Book>, page: number, pages: number) => void;
  clearRequested: () => void;
  loadParams: (general: string, title: string, category: string, author: string, publisher: string, available: boolean | null, isAdvanceSearch: boolean) => void
  clearParams: () => void;
}

const initial: StateCreator<BookState> = (set): BookState => ({
  books: [],
  page: 1,
  pages: 1,
  general: '',
  title: '',
  category: '',
  author: '',
  publisher: '',
  available: null,
  isAdvanceSearch: false,


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
  loadParams: (general: string, title: string, category: string, author: string, publisher: string, available: boolean | null, isAdvanceSearch: boolean) => {
    set({
      general,
      title,
      category,
      author,
      publisher,
      available,
      isAdvanceSearch,
    });
  },
  clearParams: () => {
    set({
      general: '',
      title: '',
      category: '',
      author: '',
      publisher: '',
      available: null,
      isAdvanceSearch: false,
    })
  },
});

// -- Configuración de persistencia
const persistConfig: PersistOptions<BookState> = {
  name: 'books-storage',
  storage: createJSONStorage(() => localStorage),
};

export const booksStore = create(persist(initial, persistConfig))