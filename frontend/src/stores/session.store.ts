import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';
import type { PersistOptions } from 'zustand/middleware';
import type { StateCreator } from 'zustand';
import type { Session } from '@/types';

// -- Definición del store.
export interface SessionState {
  sessionID: string;
  token: string;
  RUT: string;
  createdAt: string;
  expiredAt: string;

  loadSession: (session: Session) => void;
  removeSession: () => void;
}

const initial: StateCreator<SessionState> = (set): SessionState => ({
  sessionID: '',
  token: '',
  RUT: '',
  createdAt: '',
  expiredAt: '',

  loadSession: (session: Session) => set(() => ({
    sessionID: session.ID,
    token: session.token,
    RUT: session.RUT,
    createdAt: session.createdAt,
    expiredAt: session.expiredAt,
  })),

  removeSession: () => set(() => ({
    sessionID: '',
    token: '',
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