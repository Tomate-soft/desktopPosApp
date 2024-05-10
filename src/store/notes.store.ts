import { create } from "zustand";
import { getNotesService } from "../services/notes.services";

interface state {
  isLoading: boolean;
  errors: boolean;
  message: string | null;
  notesArray: [];
  getNotes: () => Promise<{}>;
}

export const useNotesStore = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,
    message: null,
    notesArray: [],
    getNotes: async () => {
      set({ isLoading: true });
      try {
        const res = await getNotesService();
        if (!res.data) {
          set({
            isLoading: false,
            errors: true,
            message: "No se pudieron traer las notas",
          });
          throw new Error("No se pudieron traer las notas");
        }
        set({ isLoading: true });
        return res;
      } catch (error) {
        set({
          isLoading: false,
          errors: true,
          message: "Ha ocurrido un error inesperado",
        });
      }
      throw new Error("Ha ocurrido un error inesperado");
    },
  };
});
