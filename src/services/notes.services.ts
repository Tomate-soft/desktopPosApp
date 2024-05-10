import axios from "axios";

const URL_PATH = "https://tomate-server.onrender.com/notes";

export const getNotesService = async () => {
  const response = await axios(URL_PATH);
  return response;
};
