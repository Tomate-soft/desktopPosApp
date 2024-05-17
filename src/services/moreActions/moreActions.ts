import axios from "../../configs/axios";
import { BILLS_PATH, TABLES_UPT_PATH } from "../../lib/routes.paths.lib";

export const SaveBillInTableService = async (id: string, data: {}) => {
  const response = await axios.put(`${TABLES_UPT_PATH}/${id}`, data);
  return response;
};

export const UpdatePropInBillService = async (id: string, data: {}) => {
  const response = await axios.put(`${BILLS_PATH}/${id}`, data);
  return response;
};
