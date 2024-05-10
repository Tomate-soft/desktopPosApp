import axios from "axios";

const URL_PATH = "https://tomate-server.onrender.com/cashier-session";

export const createCashierSession = async (quantity: string, id: string) => {
  const data = { initialQuantity: quantity, user: id };
  const response = axios.post(URL_PATH, data);
  return response;
};

export const updateBillForPayment = async (id: string, body: any) => {
  const response = axios.put(`${URL_PATH}/payment/${id}`, body);
  return response;
};

export const getCashierSession = async () => {
  const response = await axios(URL_PATH);
  return response;
};
