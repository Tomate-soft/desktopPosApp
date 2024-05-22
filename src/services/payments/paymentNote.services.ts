import axios from "../../configs/axios";
import { PAYMENT_NOTES_PATH } from "../../lib/routes.paths.lib";

export const paymentNoteService = async (id: string, body: any) => {
  const response = axios.post(`${PAYMENT_NOTES_PATH}/${id}`, body);
  return response;
};
// REVISAR SI ACA NOS QUEDAMOS - AL PARECER TRABAJABAMOS EN LOCAL UNA VES TEMRINADO MIGRAR AL NUEVO BACKEND
