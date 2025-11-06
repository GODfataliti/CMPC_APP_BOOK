import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';
import type { PersistOptions } from 'zustand/middleware';
import type { StateCreator } from 'zustand';
import type { User } from '@/types';

// -- Definición del store.
export interface UserState {
  ID: string;
  RUT: string;
  name: string;
  lastname: string;
  imageURL: string;
  createdAt: string;
  updatedAt: string;

  loadUser: (user: User) => void;
  removeUser: () => void;
}

const initial: StateCreator<UserState> = (set): UserState => ({
  ID: '',
  RUT: '',
  name: '',
  lastname: '',
  imageURL: '',
  createdAt: '',
  updatedAt: '',

  loadUser: (user: User) => set(() => ({
    ID: user.ID,
    RUT: user.RUT,
    name: user.name,
    lastname: user.lastname,
    imageURL: user.imageURL,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  })),

  removeUser: () => set(() => ({
    ID: '',
    RUT: '',
    name: '',
    lastname: '',
    imageURL: '',
    createdAt: '',
    updatedAt: '',
  })),
});

// -- Configuración de persistencia
const persistConfig: PersistOptions<UserState> = {
  name: 'user-storage',
  storage: createJSONStorage(() => localStorage),
};

export const userStore = create(persist(initial, persistConfig))