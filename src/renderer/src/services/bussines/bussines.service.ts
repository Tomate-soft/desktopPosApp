import axios from '@renderer/configs/axios'

export const updateDevice = async (id: string, body: any) => {
  const response = await axios.put(`device/${id}`, body)
  return response
}
