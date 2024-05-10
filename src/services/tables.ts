import axios from "axios";

const URL_PATH = "https://tomate-server.onrender.com";
export const getTablesService = async () => {
  const response = axios("https://tomate-server.onrender.com/tables");
  return response;
};

export interface UpdateTable {
  _id: any;
  tableNum?: string;
  server?: string;
  status?: string;
  bill?: any[];
  assigned?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const updateTablesService = async (
  tablesArgs: UpdateTable[],
  userId: string
) => {
  try {
    const responses = [];
    for (const updateTable of tablesArgs) {
      console.log(updateTable);
      const res = await axios.patch(
        `https://tomate-server.onrender.com/tables/${updateTable._id}`,
        { assigned: true, user: userId }
      );
      responses.push(res);
    }
    return responses;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const resetTablesService = async () => {
  const response = await axios.put(`${URL_PATH}/tables/reset`);
  return response;
};
