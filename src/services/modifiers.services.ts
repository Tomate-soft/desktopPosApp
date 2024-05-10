import axios from "axios";

const URL_PATH = "https://tomate-server.onrender.com/modifications";

export const getModifiesServices = async () => {
  const response = await axios(URL_PATH);
  return response;
};
