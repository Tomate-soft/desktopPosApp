import { useState, useEffect } from 'react'

export default function useDevice() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<null | Error>(null)
  const [data, setData] = useState(null)

  const fetchingData = async () => {
    try {
      const response = await fetch('http://localhost:8114/config')
      if (!response.ok) {
        setIsLoading(false)
        setError(new Error('Error al obtener la configuración del dispositivo'))
        setData(null)
        return
      }
      const data = await response.json()

      setIsLoading(false)
      setData(data)
      setError(null)
    } catch (error) {
      setIsLoading(false)
      setError(error as Error)
      setData(null)
    }
  }

  useEffect(() => {
    fetchingData()
  }, [])

  return { isLoading, error, data }
}
