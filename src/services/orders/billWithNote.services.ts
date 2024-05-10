import axios from "axios";

const URL_PATH = "https://tomate-server.onrender.com/notes/";

export const updateNoteService = async (id: string, noteData: {}) => {
  const response = await axios.put(`${URL_PATH}${id}`, noteData);
  return response;
};
// update
