import { create } from 'zustand'
import axios from 'axios'
interface ImpressionManagement {
  isLoading: boolean
  errors: string | Error
  printRestaurantOrderTicket: (body: any) => void
}

export const useImpressionManagement = create<ImpressionManagement>((set) => ({
  isLoading: false,
  errors: '',
  printRestaurantOrderTicket: async (body: any) => {
    console.log(body)
    set(() => ({
      isLoading: true,
      errors: ''
    }))
    try {
      await axios.post('http://localhost:8114/print/billPrint', body)
      set(() => ({
        isLoading: false,
        errors: ''
      }))
    } catch (error) {
      set(() => ({
        isLoading: false,
        errors: error as Error
      }))
      return error
    }
  }
}))
