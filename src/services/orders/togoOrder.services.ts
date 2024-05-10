import axios from "axios";

const URL_PATH = "https://tomate-server.onrender.com/togo-order";

export interface ToGoOrder {}

export const createToGoOrderService = async (body: ToGoOrder) => {
  const response = await axios.post(URL_PATH, body);
  return response;
};

export const getToGoOrdersService = async () => {
  const response = await axios(URL_PATH);
  return response;
};

export const updateToGoOrder = async (id: string, body: any) => {
  const response = axios.put(`${URL_PATH}/${id}`, body);
  return response;
};
