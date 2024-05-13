import axios from "axios";
const api = process.env.API_URL_PATH;
const dailyRegisterPath = process.env.DAILY_REGISTER_PATH;

export const createEntryService = (employeeNumber: number, pinPos: number) => {
  const body = {
    employeeNumber,
    pinPos,
  };
  const response = axios.post(`${api}${dailyRegisterPath}`, body);
  return response;
};
