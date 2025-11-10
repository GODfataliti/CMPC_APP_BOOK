import { createJSONStorage, persist } from 'zustand/middleware'
import { create } from 'zustand'
import type { PersistOptions } from 'zustand/middleware'
import type { StateCreator } from 'zustand'
import type { User } from '@/types'

// -- Definición del store.
export interface UserState {
  userID: string
  username: string
  email: string
  createdAt: Date
  updatedAt: Date

  loadUser: (user: Partial<User>) => void
  removeUser: () => void
}

const initial: StateCreator<UserState> = (set): UserState => ({
  userID: '',
  username: '',
  email: '',
  createdAt: new Date(),
  updatedAt: new Date(),

  loadUser: (user: Partial<User>) =>
    set(() => ({
      userID: user.userID,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })),

  removeUser: () =>
    set(() => ({
      userID: '',
      username: '',
      email: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
})

// -- Configuración de persistencia
const persistConfig: PersistOptions<UserState> = {
  name: 'user-storage',
  storage: createJSONStorage(() => localStorage),
}

export const userStore = create(persist(initial, persistConfig))
