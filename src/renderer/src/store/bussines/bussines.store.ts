import { updateDevice, updateSettingsDevice } from '@renderer/services/bussines/bussines.service'
import { create } from 'zustand'

interface state {
  isLoading: boolean
  errors: boolean
  message: string | null
  updateDevice: () => Promise<void>
  updateConfigInDevice: () => Promise<void>
}

export const UseBussines = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,
    message: null,
    updateDevice: async (id: string, body: any) => {
      set({ isLoading: true })
      try {
        const res = await updateDevice(id, body)
        const data = res.data
        set({ isLoading: false, message: data })
      } catch (error) {
        set({ isLoading: false, errors: true })
      }
    },
    updateConfigInDevice: async () => {
      set({ isLoading: true })
      try {
        const res = await updateSettingsDevice()
        const data = res

        await fetch('http://localhost:8114/config/update-config', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        set({ isLoading: false, message: 'Configuración actualizada' })
      } catch (error) {
        set({ isLoading: false, errors: true })
      }
    }
  }
})

export default UseBussines
