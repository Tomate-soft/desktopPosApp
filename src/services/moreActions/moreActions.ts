import axios from "axios";

const URL_PATH = "https://tomate-server.onrender.com/tables/upt";
const URL_PATH_BILLS = "https://tomate-server.onrender.com/bills";

export const SaveBillInTableService = async (id: string, data: {}) => {
  const response = await axios.put(`${URL_PATH}/${id}`, data);
  return response;
};

export const UpdatePropInBillService = async (id: string, data: {}) => {
  console.log("registro de historial de transferencia");
  console.log(id);
  console.log(data);
  const response = await axios.put(`${URL_PATH_BILLS}/${id}`, data);
  console.log(response);
  return response;
};
