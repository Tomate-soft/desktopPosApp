import axios from "../../configs/axios";
import { NOTES_PATH } from "../../lib/routes.paths.lib";

export const updateNoteService = async (id: string, noteData: {}) => {
  console.log("LLegue al service");
  console.log(noteData);
  const noteProducts = noteData.body.products.map((item) => {
    const newProductStatus = { ...item, active: true };
    return newProductStatus;
  });
  const sendData = { ...noteData.body, products: noteProducts };
  const sendDto = { accountId: noteData.accountId, body: sendData };
  const response = await axios.put(`${NOTES_PATH}/${id}`, sendDto);
  return response;
};
