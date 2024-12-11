import axios from '@/configs/axios'
import { BILLS_PATH } from '@/lib/routes.paths.lib'

export const getReopensService = async () => {
  const response = await axios.get(BILLS_PATH)
  return response
}
