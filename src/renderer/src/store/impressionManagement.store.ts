import { create } from 'zustand'
import axios from 'axios'
interface ImpressionManagement {
  isLoading: boolean
  errors: string | Error
  printRestaurantOrderTicket: (body: any) => void,
  printCommandProducts: (body: any) => void
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
  },
  printCommandProducts: async (body: any) => {
        console.log('billCurrentCommand peri es', body);
    
    set(() => ({
      isLoading: true,
      errors: ''
    }))
    try {
      await axios.post('http://localhost:8114/print/command', body)
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
