import { create } from "zustand";
import {
  injectPropInUser,
  resetTablesInUsersService,
} from "../services/users.services";

interface state {
  isLoading: boolean;
  errors: boolean;
  updateUser: (args: any, id: string) => Promise<void>;
  resetTables: () => Promise<void>;
}

export const useUsersStore = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,
    updateUser: async (args: any, id: string) => {
      set({ isLoading: true });
      try {
        const res = await injectPropInUser(args, id);
        if (!res) {
          set({ isLoading: false, errors: true });
        }
        set({ isLoading: false, errors: false });
        return res;
      } catch (error) {
        set({ isLoading: false, errors: true });
      }
    },
    resetTables: async () => {
      set({ isLoading: true });
      try {
        const res = await resetTablesInUsersService();
        set({ isLoading: false });
        return res;
      } catch (error) {
        set({ isLoading: false, errors: true });
      }
    },
  };
});
