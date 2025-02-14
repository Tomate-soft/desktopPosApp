import { getSubcategoriesService } from '@renderer/services/subcategories.store'
import { create } from 'zustand'

interface state {
  isLoading: boolean
  errors: null | boolean
  message: string | null
  subCategoriesArray: []
  getSubcategories: () => any
}

export const useSubcategoriesStore = create<state>((set) => {
  return {
    isLoading: false,
    errors: null,
    message: null,

    subCategoriesArray: [],
    getSubcategories: async () => {
      set({ isLoading: true })
      try {
        const res = await getSubcategoriesService()
        const subcategoriesArray = res.data
        set({ isLoading: false, subCategoriesArray: subcategoriesArray })
      } catch (error) {
        set({ isLoading: false, errors: true, message: 'No se completo' })
      }
    }
  }
})
