import { createJSONStorage, persist } from 'zustand/middleware'
import { create } from 'zustand'
import type { PersistOptions } from 'zustand/middleware'
import type { StateCreator } from 'zustand'
import type { Log } from '@/types'

// -- Definición del store.
export interface LogState {
  logs: Array<Log>
  page: number
  pages: number

  loadRequested: (logs: Array<Log>, page: number, pages: number) => void
  clearRequested: () => void
}

const initial: StateCreator<LogState> = (set): LogState => ({
  logs: [],
  page: 1,
  pages: 1,

  loadRequested: (logs: Array<Log>, page: number, pages: number) => {
    set({ logs, page, pages })
  },
  clearRequested: () => {
    set({
      logs: [],
      page: 1,
      pages: 1,
    })
  },
})

// -- Configuración de persistencia
const persistConfig: PersistOptions<LogState> = {
  name: 'logs-storage',
  storage: createJSONStorage(() => localStorage),
}

export const logsStore = create(persist(initial, persistConfig))
