import axios from "axios";

const URL_PATH = "https://tomate-server.onrender.com/daily-register";

export const createEntryService = (employeeNumber: number, pinPos: number) => {
  const body = {
    employeeNumber,
    pinPos,
  };
  const response = axios.post(URL_PATH, body);
  return response;
};
