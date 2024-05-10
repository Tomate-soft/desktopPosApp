import axios from "axios";

type NoteName = {
  noteName: string;
};

type BillName = {
  billName: string;
};

type Comments = {
  comments: string;
};

export const addName = async (id: string, billName: BillName) => {
  const res = await axios.put(
    `https://tomate-server.onrender.com/bills/${id}`,
    billName
  );
  return res;
};

export const addComments = async (id: string, comments: Comments) => {
  const res = await axios.put(
    `http://tomate-server.onrender.com/bills/${id}`,
    comments
  );
  return res;
};

export const createNotes = async (notesArray: any) => {
  const updatedNotes = notesArray.map((note: any) => {
    const total = note.products
      .reduce((acc: number, product: any) => {
        return acc + parseFloat(product.priceInSite);
      }, 0)
      .toString();
    return { ...note, checkTotal: total };
  });
  console.log(updatedNotes);
  const noteIds = [];
  try {
    for (const note of updatedNotes) {
      if (!note._id) {
        console.log("Creacion");
        console.log(note);
        try {
          const res = await axios.post(
            "https://tomate-server.onrender.com/notes",
            note
          );

          if (res.data && res.data._id) {
            noteIds.push(res.data._id);
          } else {
            console.error("Error: No se recibió un ID para la nota.");
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          console.log("Actualizacion");
          console.log(note);
          const transferNote = {
            accountId: null,
            body: { products: note.products },
          };
          console.log("Aca el objeto que anda observanmdo");
          console.log(transferNote);
          const res = await axios.put(
            `https://tomate-server.onrender.com/notes/${note._id}`,
            transferNote
          );
          noteIds.push(note._id);
        } catch (error) {
          console.error(error);
        }
      }
    }
    return noteIds;
  } catch (error) {
    console.error(error);
  }
};

export const injectNotesInBill = async (id: string, notesArray: any[]) => {
  const response = axios.put(`https://tomate-server.onrender.com/bills/${id}`, {
    notes: notesArray,
  });
  return response;
};

export const addNameInNote = async (id: string, noteName: NoteName) => {
  const response = axios.put(
    `https://tomate-server.onrender.com/notes/${id}`,
    noteName
  );
  return response;
};

export const getBillServices = async () => {
  const response = axios("https://tomate-server.onrender.com/bills");
  return response;
};
