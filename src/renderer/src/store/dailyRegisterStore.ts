import { create } from 'zustand'
import { createEntryService } from '../services/dailyRegister.services'

interface State {
  isLoading: boolean
  errors: boolean
  message: string
  createEntryDaily: (employeeNumber: number, pinPos: number) => Promise<void>
}

export const useEntryDaily = create<State>((set) => {
  return {
    isLoading: false,
    errors: false,
    message: 'No vino nada',
    createEntryDaily: async (employeeNumber, pinPos) => {
      set({ isLoading: true, errors: false, message: '' }) // Reinicia los estados
      try {
        const res = await createEntryService(employeeNumber, pinPos)

        if (!res.data) {
          set({ isLoading: false, errors: true, message: 'Error: No se obtuvo respuesta del servicio.' })
          return
        }

        const newMessage = new Date().toLocaleTimeString('es-ES', { hour12: false }).slice(0, 8) // Tiempo en formato 24h
        set({ isLoading: false, message: newMessage })

        // Hacer el fetch al servidor
        const response = await fetch('http://localhost:8114/print/shift', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( res.data ),
        })

        if (!response.ok) {
          throw new Error('Error en el servidor de impresión.')
        }

        console.log('Respuesta del fetch:', await response.json())
      } catch (error: any) {
        console.error('Error en createEntryDaily:', error)
        set({ isLoading: false, errors: true, message: error.message || 'Ocurrió un error.' })
      }
    },
  }
})
