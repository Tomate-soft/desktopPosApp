import { updateDevice } from "@/services/bussines/bussines.service";
import { create } from "zustand";

interface state {
  isLoading: boolean;
  errors: boolean;
  message: string | null;
  updateDevice: (id: string, data: any) => Promise<void>;
}

export const UseBussines = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,
    message: null,
    updateDevice: async (id: string, body: any) => {
      set({ isLoading: true });
      try {
        const res = await updateDevice(id, body);
        const data = res.data;
        set({ isLoading: false, message: data });
      } catch (error) {
        set({ isLoading: false, errors: true });
      }
    },
  };
});

export default UseBussines;
