import axios from "../../configs/axios";
import { NOTES_PATH } from "../../lib/routes.paths.lib";

export const updateNoteService = async (id: string, noteData: {}) => {
  const response = await axios.put(`${NOTES_PATH}/${id}`, noteData);
  return response;
};
