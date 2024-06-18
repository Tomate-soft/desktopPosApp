import axios from "@/configs/axios";
import {
  CASHIER_SESSION_PATH,
  CLOUSURES_OPERATIONS_PATH,
} from "@/lib/routes.paths.lib";

export const closureOfOperationsService = async (body: any) => {
  const response = await axios.post(
    `${CLOUSURES_OPERATIONS_PATH}${CASHIER_SESSION_PATH}`,
    body
  );
  return response;
};
