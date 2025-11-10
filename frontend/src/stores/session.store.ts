import { createJSONStorage, persist } from 'zustand/middleware'
import { create } from 'zustand'
import type { PersistOptions } from 'zustand/middleware'
import type { StateCreator } from 'zustand'

// -- Definición del store.
export interface SessionState {
  sessionID: string
  token: string
  email: string
  createdAt: string
  expiredAt: string

  loadSession: (token: string, email: string) => void
  removeSession: () => void
}

const initial: StateCreator<SessionState> = (set): SessionState => ({
  sessionID: '',
  token: '',
  email: '',
  createdAt: '',
  expiredAt: '',

  loadSession: (token: string, email: string) =>
    set(() => ({
      sessionID: token,
      token: token,
      email: email,
    })),

  removeSession: () =>
    set(() => ({
      sessionID: '',
      token: '',
      email: '',
      createdAt: '',
      expiredAt: '',
    })),
})

// -- Configuración de persistencia
const persistConfig: PersistOptions<SessionState> = {
  name: 'session-storage',
  storage: createJSONStorage(() => localStorage),
}

export const sessionStore = create(persist(initial, persistConfig))
