import axios from "axios";

const URL_PATH = "https://tomate-server.onrender.com/dishes";

export const getDishesService = async () => {
  const response = await axios(URL_PATH);
  return response;
};
