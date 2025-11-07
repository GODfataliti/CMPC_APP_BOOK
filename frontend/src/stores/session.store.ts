import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';
import type { PersistOptions } from 'zustand/middleware';
import type { StateCreator } from 'zustand';

// -- Definición del store.
export interface SessionState {
  sessionID: string;
  RUT: string;
  createdAt: string;
  expiredAt: string;

  loadSession: (token: string, RUT: string) => void;
  removeSession: () => void;
}

const initial: StateCreator<SessionState> = (set): SessionState => ({
  sessionID: '',
  RUT: '',
  createdAt: '',
  expiredAt: '',

  loadSession: (token: string, RUT: string) => set(() => ({
    sessionID: token,
    RUT: RUT,
  })),

  removeSession: () => set(() => ({
    sessionID: '',
    RUT: '',
    createdAt: '',
    expiredAt: '',
  })),
});

// -- Configuración de persistencia
const persistConfig: PersistOptions<SessionState> = {
  name: 'session-storage',
  storage: createJSONStorage(() => localStorage),
};

export const sessionStore = create(persist(initial, persistConfig))