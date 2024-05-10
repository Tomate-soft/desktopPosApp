import { create } from "zustand";
import {
  addComments,
  addName,
  addNameInNote,
  createNotes,
  getBillServices,
  injectNotesInBill,
} from "../services/bill.services";

interface state {
  isLoading: boolean;
  errors: boolean;
  updateName: (id: string, arg: string) => Promise<void>;
  updateComments: (id: string, arg: string) => Promise<void>;
  createNotes: (notesArray: any[], id: string) => Promise<void>;
  updateNameInNote: (id: string, arg: string) => Promise<void>;
  getBills: () => Promise<void>;
  billsArray: [];
}

export const updateBillProps = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,

    updateName: async (id, arg) => {
      set({ isLoading: true });
      const data = { billName: arg };
      try {
        const response = await addName(id, data);
        if (!response.data) {
          set({ isLoading: false, errors: true });
        }
        set({ isLoading: false });
        return response;
      } catch (error) {
        set({ isLoading: false, errors: true });
      }
    },

    updateComments: async (id, arg) => {
      set({ isLoading: true });
      const data = { comments: arg };
      try {
        const response = await addComments(id, data);
        if (!response) {
          set({ isLoading: false, errors: true });
        }
        set({ isLoading: false });
        return response;
      } catch (error) {
        set({ isLoading: false, errors: true });
      }
    },

    createNotes: async (notesArray, id) => {
      console.log("Aca ando en la store");
      console.log(notesArray, id);

      set({ isLoading: true });
      try {
        const noteIds = await createNotes(notesArray);

        if (!noteIds || noteIds.length === 0) {
          set({ isLoading: false, errors: true });
          return;
        }

        if (noteIds.length >= 2) {
          try {
            const res = await injectNotesInBill(id, noteIds);
            if (!res.data) {
              throw new Error("No se pudieron guardar las notas");
            }
          } catch (error) {
            console.error(error);
            throw new Error("Ha ocurrido algo inesperado");
          }
        }

        set({ isLoading: false });
      } catch (error) {
        console.error(error);
        set({ isLoading: false, errors: true });
      }
    },

    updateNameInNote: async (id, arg) => {
      set({ isLoading: true });
      try {
        const data = {
          noteName: arg,
        };
        const res = await addNameInNote(id, data);
        if (!res.data) {
          set({ isLoading: false, errors: true });
          throw new Error("No se ha podido guardar");
        }
        set({ isLoading: false });
      } catch (error) {
        set({ isLoading: false, errors: true });
        throw new Error("Ha ocurrido algo inesperado");
      }
    },
    getBills: async () => {
      set({ isLoading: true });
      try {
        const res = await getBillServices();
        if (!res.data) {
          set({ isLoading: false, errors: true });
        }
        set({ isLoading: false, billsArray: res.data });
      } catch (error) {
        set({ isLoading: false, errors: true });
      }
    },

    billsArray: [],
  };
});
// aca continuamos, tenemo sque meter las claves para el nombre yu comentarios opcionales en el esquema de notas y
// agregar las notas despues ya de haberlas creado filtrando las que ya tienen asignado un ID por que ya estan creadas, para solo crear las agregadas nuevamente.
