import axios from "../../configs/axios";

const URL_PATH = "http://localhost:8000/payments/p/note/";

export const paymentNoteService = async (id: string, body: any) => {
  const response = axios.post(`${URL_PATH}${id}`, body);
  return response;
};
// REVISAR SI ACA NOS QUEDAMOS - AL PARECER TRABAJABAMOS EN LOCAL UNA VES TEMRINADO MIGRAR AL NUEVO BACKEND
