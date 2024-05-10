import axios from "axios";

const URL_PATH = "https://tomate-server.onrender.com";

export const injectPropInUser = async (args: any, id: string) => {
  const response = await axios.put(`${URL_PATH}/users/${id}`, args);
  return response;
};

export const resetTablesInUsersService = async () => {
  const response = axios.put(
    `https://tomate-server.onrender.com/users/r/tables`
  );
  return response;
};
