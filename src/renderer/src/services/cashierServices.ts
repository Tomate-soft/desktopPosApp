import axios from '@renderer/configs/axios'
import { CASHIER_SESSION_PATH, PAUSE_RESUME_PATH } from '@renderer/lib/routes.paths.lib'

export const pauseResumeSessionService = async (sessionId: string) => {
  const response = await axios.put(`${CASHIER_SESSION_PATH}${PAUSE_RESUME_PATH}/${sessionId}`)
  return response
}
