import axios from "../configs/axios";
import { CANCELLATIONS_PATH } from "../lib/routes.paths.lib";

export const cancelBillService = async (body: any) => {
  console.log(body);
  const response = await axios.post(CANCELLATIONS_PATH, body);
  return response;
};
