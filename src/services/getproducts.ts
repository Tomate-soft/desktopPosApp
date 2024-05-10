import axios from "axios";

const URL_PATH = "https://tomate-server.onrender.com/products";

export const getProductsService = async () => {
  const response = axios(URL_PATH);
  return response;
};
