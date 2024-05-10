import axios from "axios";

const URL_PATH = "https://tomate-server.onrender.com/operating-period/current";

export const getCurrentProcessService = async () => {
  const response = axios(URL_PATH);
  return response;
};
