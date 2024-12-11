import { Bill } from '../types/account'
import { create } from 'zustand'

interface state {
  BillCommandCurrent: Bill
  setState: (form: Bill) => void
}

export const useCurrentCommand = create<state>((set) => {
  // Typescript va a fallar cuando mandes para el pedido para llevar, por que tiene menos keys que un pedido normal.
  return {
    BillCommandCurrent: {
      products: []
    },
    setState: (form: Bill) => {
      const actualyForm = {
        ...form
      }
      set({
        BillCommandCurrent: actualyForm
      })
    }
  }
})
