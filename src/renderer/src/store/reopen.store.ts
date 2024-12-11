import { getReopensService } from '@/services/reopen.services'
import { create } from 'zustand'

export interface state {
  isLoading: boolean
  errors: boolean
  message: string | null
  reopenBills: []
  getReopens: () => Promise<void>
}

export const UseReopenStore = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,
    message: null,
    reopenBills: [],

    getReopens: async () => {
      set({ isLoading: true })
      try {
        const res = await getReopensService()
        if (!res.data) {
          set({ isLoading: false, errors: true })
          throw new Error('No se pudo obtener los reembolsos')
        }
        set({ isLoading: false })
        return res
      } catch (error) {
        set({ isLoading: false, errors: true })
      }
    }
  }
})
