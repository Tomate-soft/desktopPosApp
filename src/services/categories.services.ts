import axios from "axios";

const URL_PATH = "https://tomate-server.onrender.com/categories";

export const getCategoriesService = async () => {
  const response = axios(URL_PATH);
  return response;
};
